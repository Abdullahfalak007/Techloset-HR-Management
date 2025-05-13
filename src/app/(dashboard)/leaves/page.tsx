"use client";

import { format } from "date-fns";
import SearchBar from "@/components/common/SearchBar";
import { useAdminLeaves } from "./useAdminLeaves";
import Loader from "@/components/common/Loader";

export default function AdminLeavePage() {
  const {
    loading,
    pageItems,
    pageSizeOptions,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    updateStatus,
  } = useAdminLeaves();

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="Search leave requests…" basePath="/leaves" />
      </div>

      <div className="overflow-auto border border-[var(--border)] rounded-lg">
        <table className="min-w-full text-[var(--text-primary)] text-sm">
          <thead className="border-b border-[var(--border)]">
            <tr>
              {[
                "Employee",
                "Email",
                "Reason",
                "Start Date",
                "End Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((l) => (
              <tr key={l.id} className="border-b border-[var(--border)]">
                <td className="px-4 py-3 flex items-center space-x-2">
                  <img
                    src={
                      (l as any).employee?.avatar ||
                      "/assets/icons/default-avatar.png"
                    }
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{(l as any).employee?.name || "—"}</span>
                </td>
                <td className="px-4 py-3">
                  {(l as any).employee?.personalInfo?.email || "—"}
                </td>
                <td className="px-4 py-3">{l.reason}</td>
                <td className="px-4 py-3">
                  {format(new Date(l.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(l.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`
                      text-xs px-2 py-1 rounded
                      ${
                        l.status === "APPROVED"
                          ? "bg-[var(--success)]"
                          : l.status === "PENDING"
                          ? "bg-[var(--warning)]"
                          : "bg-[var(--error)]"
                      }
                      text-[var(--button-text)]
                    `}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {l.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(l.id, "APPROVED")}
                        className="px-3 py-1 rounded bg-[var(--success)] text-[var(--button-text)] text-xs hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(l.id, "REJECTED")}
                        className="px-3 py-1 rounded bg-[var(--error)] text-[var(--button-text)] text-xs hover:opacity-90 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <label className="text-sm">
          Show{" "}
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-[var(--border)] rounded px-2 py-1 bg-[var(--surface)] hover:bg-[var(--surface-hover)]"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>{" "}
          / page
        </label>

        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`
                px-3 py-1 rounded
                ${
                  p === currentPage
                    ? "bg-[var(--accent)] text-[var(--button-text)]"
                    : "hover:bg-[var(--surface-hover)]"
                }
              `}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
