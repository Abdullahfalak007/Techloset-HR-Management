// "use client";
// import React from "react";
// import Image from "next/image";
// import { assets } from "@/constants/assets";

// type Props = {
//   data: any;
//   onChange: (data: Partial<any>) => void;
//   onNext: () => void;
//   onBack: () => void;
// };

// const FIELDS = [
//   { name: "appointmentLetter", label: "Upload Appointment Letter" },
//   { name: "salarySlip", label: "Upload Salary Slips" },
//   { name: "relievingLetter", label: "Upload Relieving Letter" },
//   { name: "experienceLetter", label: "Upload Experience Letter" },
// ];

// export default function StepDocuments({
//   data,
//   onChange,
//   onNext,
//   onBack,
// }: Props) {
//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files[0]) onChange({ [name]: files[0] });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-2 gap-6">
//         {FIELDS.map(({ name, label }) => (
//           <div key={name} className="space-y-2">
//             <p className="text-gray-100 font-medium">{label}</p>
//             <label
//               htmlFor={name}
//               className="block h-36 border-2 border-dashed border-orange-500 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-[#111] transition"
//             >
//               <div className="bg-[#111] p-3 rounded mb-2">
//                 <Image
//                   src={assets.icons.upload}
//                   alt="upload"
//                   width={24}
//                   height={24}
//                 />
//               </div>
//               <p className="text-gray-400">
//                 Drag &amp; Drop or{" "}
//                 <span className="text-orange-500 underline">choose file</span>{" "}
//                 to upload
//               </p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Supported formats : Jpeg, pdf
//               </p>
//               <input
//                 id={name}
//                 type="file"
//                 name={name}
//                 accept=".jpeg,.jpg,.pdf"
//                 onChange={handleFile}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between pt-4 border-t border-gray-700">
//         <button
//           onClick={onBack}
//           className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// src/components/employees/StepDocuments.tsx
"use client";

import React from "react";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {FIELDS.map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <p className="text-gray-100 font-medium">{label}</p>

            <CldUploadButton
              options={{
                uploadPreset: "unsigned_hr_preset",
                folder: "hr-management/docs",
                resourceType: "auto",
              }}
              onUpload={(result: CloudinaryUploadWidgetResults) => {
                // ensure info is the object-case, not a string
                if (
                  result.info &&
                  typeof result.info !== "string" &&
                  result.info.secure_url
                ) {
                  onChange({ [name]: result.info.secure_url });
                }
              }}
            >
              <div className="h-36 border-2 border-dashed border-orange-500 rounded-lg flex items-center justify-center hover:bg-[#111] transition">
                {data[name] ? (
                  <p className="text-green-400">Uploaded ✓</p>
                ) : (
                  <p className="text-orange-500 underline">Upload {label}</p>
                )}
              </div>
            </CldUploadButton>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded border border-gray-600 text-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
