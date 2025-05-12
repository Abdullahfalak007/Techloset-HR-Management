// // // // src/components/employees/StepDocuments.tsx
// // // "use client";

// // // import React from "react";

// // // declare global {
// // //   interface Window {
// // //     cloudinary: any;
// // //   }
// // // }

// // // type Props = {
// // //   data: Record<string, string | null>;
// // //   onChange: (data: Partial<Props["data"]>) => void;
// // //   onNext: () => void;
// // //   onBack: () => void;
// // // };

// // // const FIELDS = [
// // //   { name: "appointmentLetter", label: "Appointment Letter" },
// // //   { name: "salarySlip", label: "Salary Slip" },
// // //   { name: "relievingLetter", label: "Relieving Letter" },
// // //   { name: "experienceLetter", label: "Experience Letter" },
// // // ];

// // // export default function StepDocuments({
// // //   data,
// // //   onChange,
// // //   onNext,
// // //   onBack,
// // // }: Props) {
// // //   // Opens the Cloudinary upload widget for a given field
// // //   function openUploadWidget(fieldName: string) {
// // //     if (!window.cloudinary) {
// // //       console.error("Cloudinary widget not loaded");
// // //       return;
// // //     }

// // //     const widget = window.cloudinary.createUploadWidget(
// // //       {
// // //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// // //         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// // //         folder: "hr-management/docs",
// // //         resourceType: "auto",
// // //       },
// // //       (error: any, result: any) => {
// // //         if (error) {
// // //           console.error("Upload Widget Error:", error);
// // //           return;
// // //         }
// // //         if (result.event === "success") {
// // //           console.log(
// // //             `🔥 ${fieldName} upload success:`,
// // //             result.info.secure_url
// // //           );
// // //           onChange({ [fieldName]: result.info.secure_url });
// // //         }
// // //       }
// // //     );

// // //     widget.open();
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="grid grid-cols-2 gap-6">
// // //         {FIELDS.map(({ name, label }) => (
// // //           <div key={name} className="space-y-2">
// // //             <p className="text-gray-100 font-medium">{label}</p>

// // //             <div
// // //               onClick={() => openUploadWidget(name)}
// // //               className="h-36 border-2 border-dashed border-orange-500 rounded-lg flex items-center justify-center hover:bg-[#111] transition cursor-pointer"
// // //             >
// // //               {data[name] ? (
// // //                 <p className="text-green-400">Uploaded ✓</p>
// // //               ) : (
// // //                 <p className="text-orange-500 underline">Upload {label}</p>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="flex justify-between pt-4 border-t border-gray-700">
// // //         <button
// // //           onClick={onBack}
// // //           className="px-6 py-2 rounded border border-gray-600 text-gray-300 hover:border-gray-500"
// // //         >
// // //           Back
// // //         </button>
// // //         <button
// // //           onClick={onNext}
// // //           className="bg-orange-500 px-6 py-2 rounded text-white hover:bg-orange-600 transition"
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/components/employees/StepDocuments.tsx
// // "use client";

// // declare global {
// //   interface Window {
// //     cloudinary: any;
// //   }
// // }

// // type Props = {
// //   data: Record<string, string | null>;
// //   onChange: (data: Partial<Props["data"]>) => void;
// //   onNext: () => void;
// //   onBack: () => void;
// // };

// // const FIELDS = [
// //   { name: "appointmentLetter", label: "Appointment Letter" },
// //   { name: "salarySlip", label: "Salary Slip" },
// //   { name: "relievingLetter", label: "Relieving Letter" },
// //   { name: "experienceLetter", label: "Experience Letter" },
// // ];

// // export default function StepDocuments({
// //   data,
// //   onChange,
// //   onNext,
// //   onBack,
// // }: Props) {
// //   function openUploadWidget(fieldName: string) {
// //     if (!window.cloudinary) return;
// //     const widget = window.cloudinary.createUploadWidget(
// //       {
// //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// //         folder: "hr-management/docs",
// //         resourceType: "auto",
// //       },
// //       (error: any, result: any) => {
// //         if (error) return;
// //         if (result.event === "success") {
// //           onChange({ [fieldName]: result.info.secure_url });
// //         }
// //       }
// //     );
// //     widget.open();
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="grid grid-cols-2 gap-6">
// //         {FIELDS.map(({ name, label }) => (
// //           <div key={name} className="space-y-2">
// //             <p className="text-[var(--text-primary)] font-medium">{label}</p>
// //             <div
// //               onClick={() => openUploadWidget(name)}
// //               className="h-36 border-2 border-[var(--accent)] border-dashed rounded-lg flex items-center justify-center hover:bg-[var(--surface)] transition cursor-pointer"
// //             >
// //               {data[name] ? (
// //                 <p className="text-[var(--success)]">Uploaded ✓</p>
// //               ) : (
// //                 <p className="text-[var(--accent)] underline">Upload {label}</p>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="flex justify-between pt-4 border-t border-[var(--border)]">
// //         <button
// //           onClick={onBack}
// //           className="px-6 py-2 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
// //         >
// //           Back
// //         </button>
// //         <button
// //           onClick={onNext}
// //           className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { assets } from "@/constants/assets";
// import React from "react";

// declare global {
//   interface Window {
//     cloudinary: any;
//   }
// }

// type Props = {
//   data: Record<string, string | null>;
//   onChange: (update: Partial<Props["data"]>) => void;
//   onBack: () => void;
//   onNext: () => void;
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
//   onBack,
//   onNext,
// }: Props) {
//   function openUploadWidget(fieldName: string) {
//     if (!window.cloudinary) return;
//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//         folder: "hr-management/docs",
//         resourceType: "auto",
//       },
//       (error: any, result: any) => {
//         if (error) {
//           console.error("Upload error:", error);
//           return;
//         }
//         if (result.event === "success") {
//           onChange({ [fieldName]: result.info.secure_url });
//         }
//       }
//     );
//     widget.open();
//   }

//   return (
//     <div className="space-y-6">
//       {/* 2×2 grid of upload cards */}
//       <div className="grid grid-cols-2 gap-6">
//         {FIELDS.map(({ name, label }) => (
//           <div key={name} className="space-y-2">
//             <p className="text-[var(--text-primary)] font-medium">{label}</p>
//             <div
//               onClick={() => openUploadWidget(name)}
//               className="h-40 border-2 border-dashed border-[var(--accent)] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--surface-hover)] transition"
//             >
//               {/* Orange circle around the icon */}
//               <div className="w-10 h-10 mb-2 rounded-full bg-[var(--accent)] flex items-center justify-center">
//                 <img
//                   src={assets.icons.upload}
//                   alt="Upload"
//                   className="w-6 h-6"
//                 />
//               </div>
//               <p className="text-[var(--text-secondary)]">
//                 Drag &amp; Drop or{" "}
//                 <span className="text-[var(--accent)] underline">
//                   choose file
//                 </span>{" "}
//                 to upload
//               </p>
//               <p className="text-xs text-[var(--text-secondary)] mt-1">
//                 Supported formats: <strong>.pdf</strong>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Previous / Next buttons */}
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={onBack}
//           className="
//             px-4 py-2 rounded
//             bg-[var(--surface)]
//             border border-[var(--border)]
//             text-[var(--text-primary)]
//             hover:bg-[var(--surface-hover)]
//             transition
//           "
//         >
//           Previous
//         </button>
//         <button
//           onClick={onNext}
//           className="
//             px-4 py-2 rounded
//             bg-[var(--accent)] hover:bg-[var(--accent-hover)]
//             text-[var(--button-text)]
//             transition
//           "
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { assets } from "@/constants/assets";
import React from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  data: Record<string, string | null>;
  onChange: (update: Partial<Props["data"]>) => void;
  onBack: () => void;
  onNext: () => void;
};

const FIELDS = [
  { name: "appointmentLetter", label: "Upload Appointment Letter" },
  { name: "salarySlip", label: "Upload Salary Slips" },
  { name: "relievingLetter", label: "Upload Relieving Letter" },
  { name: "experienceLetter", label: "Upload Experience Letter" },
];

export default function StepDocuments({
  data,
  onChange,
  onBack,
  onNext,
}: Props) {
  function openUploadWidget(fieldName: string) {
    if (!window.cloudinary) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/docs",
        resourceType: "auto",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Upload error:", error);
          return;
        }
        if (result.event === "success") {
          onChange({ [fieldName]: result.info.secure_url });
        }
      }
    );
    widget.open();
  }

  return (
    <div className="space-y-6">
      {/* 2×2 grid of upload cards */}
      <div className="grid grid-cols-2 gap-6">
        {FIELDS.map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <p className="text-[var(--text-primary)] font-medium">{label}</p>
            <div
              onClick={() => openUploadWidget(name)}
              className="h-40 border-2 border-dashed border-[var(--accent)] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--surface-hover)] transition"
            >
              {/* Orange circle around the icon */}
              <div className="w-10 h-10 mb-2 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <img
                  src={assets.icons.upload}
                  alt="Upload"
                  className="w-6 h-6"
                />
              </div>
              <p className="text-[var(--text-secondary)]">
                Drag &amp; Drop or{" "}
                <span className="text-[var(--accent)] underline">
                  choose file
                </span>{" "}
                to upload
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Supported formats: <strong>.pdf</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Previous / Next buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onBack}
          className="
            px-4 py-2 rounded
            bg-[var(--surface)]
            border border-[var(--border)]
            text-[var(--text-primary)]
            hover:bg-[var(--surface-hover)]
            transition
          "
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="
            px-4 py-2 rounded
            bg-[var(--accent)] hover:bg-[var(--accent-hover)]
            text-[var(--button-text)]
            transition
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
