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
  const [modalOpen, setModalOpen] = useState(false);

  // form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  // fetch this user's leaves
  const fetchMyLeaves = async () => {
    setLoading(true);
    const all = await fetch("/api/leaves").then((r) => r.json());
    setLeaves(all.filter((l: LeaveRequest) => l.employeeId === id));
    setLoading(false);
  };

  useEffect(() => {
    fetchMyLeaves();
  }, [id]);

  const submitLeave = async () => {
    await fetch("/api/leaves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId: id, reason, startDate, endDate }),
    });
    setModalOpen(false);
    setReason("");
    setStartDate("");
    setEndDate("");
    fetchMyLeaves();
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600"
        >
          Request Leave
        </button>
      </div>

      <div className="overflow-auto border border-gray-700 rounded-lg p-6">
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
              <tr key={l.id}>
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80 space-y-4">
            <h3 className="text-xl font-semibold">Request Leave</h3>

            <label className="block">
              <span className="text-gray-700">Start Date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">End Date</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Reason</span>
              <input
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitLeave}
                className="px-4 py-2 rounded bg-orange-500 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
