"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";

type Project = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "IN_PROGRESS" | "COMPLETED";
  employeeId: string;
};

export default function EmployeeProjectsPage() {
  const { id } = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const all: Project[] = await fetch("/api/projects").then((r) => r.json());
    setProjects(all.filter((p) => p.employeeId === id));
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const changeStatus = async (
    projectId: string,
    newStatus: Project["status"]
  ) => {
    await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchProjects();
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="overflow-auto border border-gray-700 rounded-lg bg-[#1A1A1A] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
      <table className="min-w-full text-white text-sm">
        <thead className="border-b border-gray-700">
          <tr>
            {["Title", "Start Date", "End Date", "Status", "Action"].map(
              (h) => (
                <th key={h} className="px-4 py-2 text-left">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-gray-900">
              <td className="px-4 py-2">{p.title}</td>
              <td className="px-4 py-2">
                {format(new Date(p.startDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">
                {format(new Date(p.endDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">{p.status.replace("_", " ")}</td>
              <td className="px-4 py-2 space-x-2">
                {p.status !== "COMPLETED" && (
                  <button
                    onClick={() => changeStatus(p.id, "COMPLETED")}
                    className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                  >
                    Mark Complete
                  </button>
                )}
                {p.status !== "IN_PROGRESS" && (
                  <button
                    onClick={() => changeStatus(p.id, "IN_PROGRESS")}
                    className="px-3 py-1 rounded bg-yellow-600 text-white text-xs"
                  >
                    Mark In Progress
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
