// src/components/attendance/MarkAttendanceModal.tsx
"use client";

import { useState } from "react";

type Props = {
  employee: {
    id: string;
    name: string;
  };
  onClose: () => void;
  onSubmit: (payload: any) => Promise<void>;
};

export default function MarkAttendanceModal({
  employee,
  onClose,
  onSubmit,
}: Props) {
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const statusOptions = [
    { label: "On Time", value: "ON_TIME" },
    { label: "Late", value: "LATE" },
    { label: "Absent", value: "ABSENT" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await onSubmit({
      employeeId: employee.id,
      date,
      checkIn,
      checkOut,
      breakTime,
      workHours,
      status,
    });

    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#111] p-6 rounded-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Mark Attendance for {employee.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-400">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">Check In</label>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">Check Out</label>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">Break Time (HH:MM)</label>
            <input
              type="text"
              placeholder="e.g., 01:30"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">
              Working Hours (HH:MM)
            </label>
            <input
              type="text"
              placeholder="e.g., 07:30"
              value={workHours}
              onChange={(e) => setWorkHours(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full bg-transparent border border-gray-700 rounded px-3 py-2 focus:border-orange-500 focus:ring-0"
            >
              <option value="">Select an option</option>
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
