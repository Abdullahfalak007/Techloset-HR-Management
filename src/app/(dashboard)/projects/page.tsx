"use client";

import { format } from "date-fns";
import Image from "next/image";
import AddProjectModal from "@/components/projects/AddProjectModal";
import { assets } from "@/constants/assets";
import { useAdminProjects } from "./useAdminProjects";

export default function AdminProjectsPage() {
  const { filtered, loading, modalOpen, open, close, markComplete, refresh } =
    useAdminProjects();

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Admin Projects
        </h1>
        <button
          onClick={open}
          className="bg-[var(--accent)] px-4 py-2 rounded text-[var(--button-text)] hover:bg-[var(--accent-hover)]"
        >
          Add Project
        </button>
      </div>

      <div className="overflow-auto border border-[var(--border)] rounded-lg">
        <table className="min-w-full text-left text-sm text-[var(--text-primary)]">
          <thead className="border-b border-[var(--border)]">
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
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-[var(--surface-hover)] transition"
              >
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <Image
                    src={
                      p.assignee.avatar || "/assets/icons/default-avatar.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                    className="w-8 h-8 rounded-full"
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
                        ? "bg-[var(--success)]"
                        : "bg-[var(--warning)]"
                    } text-[var(--button-text)]`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {p.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => markComplete(p.id)}
                      className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs"
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
          onClose={close}
          onSuccess={() => {
            close();
            refresh();
          }}
        />
      )}
    </div>
  );
}
