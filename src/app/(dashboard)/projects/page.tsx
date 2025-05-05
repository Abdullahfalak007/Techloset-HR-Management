// src/app/(dashboard)/projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import AddProjectModal from "@/components/projects/AddProjectModal";

type Project = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await fetch("/api/projects").then((r) => r.json());
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const markComplete = async (id: string) => {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "COMPLETED" }),
    });
    fetchProjects();
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Projects</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
        >
          Add Project
        </button>
      </div>

      <div className="overflow-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b">
            <tr>
              {[
                "Project Title",
                "Employee Name",
                "Start Date",
                "End Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-900 transition">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <Image
                    src={
                      p.assignee.avatar || "/assets/icons/default-avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span>{p.assignee.name}</span>
                </td>
                <td className="px-4 py-3">
                  {format(new Date(p.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(p.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      p.status === "COMPLETED"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    } text-white`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {p.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => markComplete(p.id)}
                      className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <AddProjectModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchProjects();
          }}
        />
      )}
    </div>
  );
}
