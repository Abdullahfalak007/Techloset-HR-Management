"use client";

import { useState, useEffect } from "react";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

type Emp = { id: string; name: string };

export default function AddProjectModal({ onClose, onSuccess }: Props) {
  const [employees, setEmployees] = useState<Emp[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetch("/api/employees")
      .then((r) => r.json())
      .then((list: any[]) => {
        setEmployees(list.map((e) => ({ id: e.id, name: e.name })));
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        startDate,
        endDate,
        employeeId,
      }),
    });
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h3 className="text-xl font-semibold">New Project</h3>

        <label className="block">
          <span className="text-gray-700">Project Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="Enter project title"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Project Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="Project description"
          />
        </label>

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
          <span className="text-gray-700">Select Employee</span>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            disabled={loading}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="">Select an Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!title || !startDate || !endDate || !employeeId}
            className="px-4 py-2 rounded bg-orange-500 text-white disabled:opacity-50"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}
