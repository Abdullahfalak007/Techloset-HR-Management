"use client";
import React from "react";

type Props = {
  data: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
  onChange: (d: Partial<Props["data"]>) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function StepAccountAccess({
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <input
          name="email"
          type="email"
          placeholder="Enter Email Address"
          value={data.email}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />

        <input
          name="slackId"
          placeholder="Enter Slack ID"
          value={data.slackId}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />

        <input
          name="skypeId"
          placeholder="Enter Skype ID"
          value={data.skypeId}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />

        <input
          name="githubId"
          placeholder="Enter Github ID"
          value={data.githubId}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 disabled:opacity-50 transition"
        >
          {submitting ? "Submitting..." : "Add"}
        </button>
      </div>
    </div>
  );
}
