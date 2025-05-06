// src/components/employees/StepDocuments.tsx
"use client";

import React from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  data: Record<string, string | null>;
  onChange: (data: Partial<Props["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

const FIELDS = [
  { name: "appointmentLetter", label: "Appointment Letter" },
  { name: "salarySlip", label: "Salary Slip" },
  { name: "relievingLetter", label: "Relieving Letter" },
  { name: "experienceLetter", label: "Experience Letter" },
];

export default function StepDocuments({
  data,
  onChange,
  onNext,
  onBack,
}: Props) {
  // Opens the Cloudinary upload widget for a given field
  function openUploadWidget(fieldName: string) {
    if (!window.cloudinary) {
      console.error("Cloudinary widget not loaded");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/docs",
        resourceType: "auto",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Upload Widget Error:", error);
          return;
        }
        if (result.event === "success") {
          console.log(
            `🔥 ${fieldName} upload success:`,
            result.info.secure_url
          );
          onChange({ [fieldName]: result.info.secure_url });
        }
      }
    );

    widget.open();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {FIELDS.map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <p className="text-gray-100 font-medium">{label}</p>

            <div
              onClick={() => openUploadWidget(name)}
              className="h-36 border-2 border-dashed border-orange-500 rounded-lg flex items-center justify-center hover:bg-[#111] transition cursor-pointer"
            >
              {data[name] ? (
                <p className="text-green-400">Uploaded ✓</p>
              ) : (
                <p className="text-orange-500 underline">Upload {label}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
