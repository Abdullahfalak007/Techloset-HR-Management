"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";

type LeaveRequest = {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: string;
  employeeId: string;
};

export default function EmployeeLeavePage() {
  const { id } = useParams();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaves")
      .then((r) => r.json())
      .then((all: LeaveRequest[]) => {
        setLeaves(all.filter((l) => l.employeeId === id));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="overflow-auto border border-gray-700 rounded-lg bg-[#1A1A1A] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Leave Management
      </h2>
      <button className="bg-orange-500 px-4 py-2 rounded mb-4 text-white">
        Request Leave
      </button>
      <table className="min-w-full text-white text-sm">
        <thead className="border-b border-gray-700">
          <tr>
            {["Reason", "Start Date", "End Date", "Status"].map((h) => (
              <th key={h} className="px-4 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {leaves.map((l) => (
            <tr key={l.id} className="hover:bg-gray-900">
              <td className="px-4 py-2">{l.reason}</td>
              <td className="px-4 py-2">
                {format(new Date(l.startDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">
                {format(new Date(l.endDate), "MMM d, yyyy")}
              </td>
              <td className="px-4 py-2">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
