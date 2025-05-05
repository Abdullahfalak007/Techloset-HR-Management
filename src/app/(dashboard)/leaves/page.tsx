"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

type LeaveRequest = {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: string;
  employee: {
    id: string;
    name: string;
    avatar?: string;
    personalInfo: { email: string };
    accounts: { email: string };
  };
};

export default function AdminLeavePage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    setLoading(true);
    const data = await fetch("/api/leaves").then((r) => r.json());
    setLeaves(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    await fetch(`/api/leaves/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchLeaves();
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Leave Panel</h1>
      <div className="overflow-auto border border-gray-700 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className=" border-b">
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
            {leaves.map((l) => (
              <tr key={l.id} className="border-b last:border-none">
                <td className="px-4 py-3 flex items-center space-x-2">
                  <img
                    src={
                      l.employee.avatar || "/assets/icons/default-avatar.png"
                    }
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{l.employee.name}</span>
                </td>
                <td className="px-4 py-3">{l.employee.personalInfo.email}</td>
                <td className="px-4 py-3">{l.reason}</td>
                <td className="px-4 py-3">
                  {format(new Date(l.startDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(l.endDate), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      l.status === "APPROVED"
                        ? "bg-green-600"
                        : l.status === "PENDING"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    } text-white`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {l.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(l.id, "APPROVED")}
                        className="px-3 py-1 rounded bg-green-600 text-white text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(l.id, "REJECTED")}
                        className="px-3 py-1 rounded bg-red-600 text-white text-xs"
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
    </div>
  );
}
