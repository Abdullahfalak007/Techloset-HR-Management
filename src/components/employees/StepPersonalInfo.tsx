// // src/components/employees/StepPersonalInfo.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { assets } from "@/constants/assets";

// declare global {
//   interface Window {
//     cloudinary: any;
//   }
// }

// type Props = {
//   data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     dob: string;
//     gender: string;
//     nationality: string;
//     maritalStatus: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   avatarUrl: string;
//   onChange: (update: Partial<Props["data"]>) => void;
//   onAvatarChange: (url: string) => void;
//   onNext: () => void;
// };

// export default function StepPersonalInfo({
//   data,
//   avatarUrl,
//   onChange,
//   onAvatarChange,
//   onNext,
// }: Props) {
//   const [preview, setPreview] = useState(avatarUrl);

//   useEffect(() => {
//     setPreview(avatarUrl);
//   }, [avatarUrl]);

//   // 1️⃣ Open the Cloudinary upload widget
//   function openUploadWidget() {
//     if (!window.cloudinary) {
//       console.error("Cloudinary widget not loaded");
//       return;
//     }
//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//         folder: "hr-management/avatars",
//         resourceType: "image",
//       },
//       (error: any, result: any) => {
//         if (error) {
//           console.error("Upload Widget Error:", error);
//           return;
//         }
//         if (result.event === "success") {
//           console.log("🔥 Upload success:", result.info.secure_url);
//           onAvatarChange(result.info.secure_url);
//         }
//       }
//     );
//     widget.open();
//   }

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onChange({ [name]: value } as any);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Avatar preview + upload button */}
//       <div className="flex items-center space-x-4">
//         <div className="w-24 h-24 bg-[#111] rounded-md overflow-hidden">
//           {preview ? (
//             <Image
//               src={preview}
//               alt="Avatar preview"
//               width={96}
//               height={96}
//               className="object-cover"
//             />
//           ) : (
//             <Image
//               src={assets.icons.camera}
//               alt="Upload avatar"
//               width={32}
//               height={32}
//             />
//           )}
//         </div>
//         <button
//           onClick={openUploadWidget}
//           className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600"
//         >
//           Upload Avatar
//         </button>
//       </div>

//       {/* Personal details form */}
//       <div className="grid grid-cols-2 gap-4">
//         {[
//           { name: "firstName", placeholder: "First Name", type: "text" },
//           { name: "lastName", placeholder: "Last Name", type: "text" },
//           { name: "phone", placeholder: "Mobile Number", type: "tel" },
//           { name: "email", placeholder: "Email Address", type: "email" },
//           { name: "dob", placeholder: "Date of Birth", type: "date" },
//         ].map(({ name, placeholder, type }) => (
//           <input
//             key={name}
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             value={(data as any)[name] ?? ""}
//             onChange={handleChange}
//             className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//           />
//         ))}

//         <select
//           name="maritalStatus"
//           value={data.maritalStatus}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Marital Status</option>
//           {["Single", "Married", "Divorced"].map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         <select
//           name="gender"
//           value={data.gender}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Gender</option>
//           {["Male", "Female", "Other"].map((g) => (
//             <option key={g} value={g}>
//               {g}
//             </option>
//           ))}
//         </select>

//         <select
//           name="nationality"
//           value={data.nationality}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Nationality</option>
//           {["Pakistan", "Foreign"].map((n) => (
//             <option key={n} value={n}>
//               {n}
//             </option>
//           ))}
//         </select>

//         <input
//           name="address"
//           placeholder="Address"
//           value={data.address}
//           onChange={handleChange}
//           className="col-span-2 w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         />

//         <select
//           name="city"
//           value={data.city}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">City</option>
//           {[
//             "Karachi",
//             "Lahore",
//             "Islamabad",
//             "Rawalpindi",
//             "Faisalabad",
//             "Peshawar",
//           ].map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <select
//           name="state"
//           value={data.state}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">State</option>
//           {[
//             "Sindh",
//             "Punjab",
//             "Khyber Pakhtunkhwa",
//             "Balochistan",
//             "Islamabad Capital Territory",
//           ].map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>

//         <input
//           name="zipCode"
//           placeholder="ZIP Code"
//           value={data.zipCode}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         />
//       </div>

//       {/* Next button */}
//       <div className="flex justify-end">
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

// src/components/employees/StepPersonalInfo.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  data: any;
  avatarUrl: string;
  onChange: (update: any) => void;
  onAvatarChange: (url: string) => void;
  onNext: () => void;
};

export default function StepPersonalInfo({
  data,
  avatarUrl,
  onChange,
  onAvatarChange,
  onNext,
}: Props) {
  const [preview, setPreview] = useState(avatarUrl);

  useEffect(() => {
    setPreview(avatarUrl);
  }, [avatarUrl]);

  function openUploadWidget() {
    if (!window.cloudinary) return;
    const w = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/avatars",
        resourceType: "image",

        // ← NEW: force a 1:1 crop
        cropping: true,
        croppingAspectRatio: 1,
        showAdvancedOptions: false,
        multiple: false,
        // you can also apply an automatic face‐centered crop:
        croppingShowDimensions: true,
        croppingDefaultSelectionRatio: 1,
      },
      (error: any, result: any) => {
        if (error) return;
        if (result.event === "success") {
          onAvatarChange(result.info.secure_url);
        }
      }
    );
    w.open();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-[var(--surface)] rounded-md overflow-hidden">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar preview"
              width={96}
              height={96}
              className="object-cover"
            />
          ) : (
            <Image
              src={assets.icons.camera}
              alt="Upload avatar"
              width={32}
              height={32}
            />
          )}
        </div>
        <button
          onClick={openUploadWidget}
          className="px-4 py-2 bg-[var(--accent)] rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
        >
          Upload Avatar
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "firstName", placeholder: "First Name", type: "text" },
          { name: "lastName", placeholder: "Last Name", type: "text" },
          { name: "phone", placeholder: "Mobile Number", type: "tel" },
          { name: "email", placeholder: "Email Address", type: "email" },
          { name: "dob", placeholder: "Date of Birth", type: "date" },
        ].map(({ name, placeholder, type }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={(data as any)[name] ?? ""}
            onChange={handleChange}
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
          />
        ))}

        <select
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        >
          <option value="">Marital Status</option>
          {["Single", "Married", "Divorced"].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        >
          <option value="">Gender</option>
          {["Male", "Female", "Other"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        >
          <option value="">Nationality</option>
          {["Pakistan", "Foreign"].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <input
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          className="col-span-2 w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        />

        <select
          name="city"
          value={data.city}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        >
          <option value="">City</option>
          {[
            "Karachi",
            "Lahore",
            "Islamabad",
            "Rawalpindi",
            "Faisalabad",
            "Peshawar",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        >
          <option value="">State</option>
          {[
            "Sindh",
            "Punjab",
            "Khyber Pakhtunkhwa",
            "Balochistan",
            "Islamabad Capital Territory",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          name="zipCode"
          placeholder="ZIP Code"
          value={data.zipCode}
          onChange={handleChange}
          className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
