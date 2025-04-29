// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { assets } from "@/constants/assets";

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
//     avatar?: File | string;
//   };
//   onChange: (update: Partial<Props["data"]>) => void;
//   onNext: () => void;
// };

// const genders = ["Male", "Female", "Other"];
// const nationalities = ["Pakistan", "Foreign"];
// const maritalStatuses = ["Single", "Married", "Divorced"];
// const cities = [
//   "Karachi",
//   "Lahore",
//   "Islamabad",
//   "Rawalpindi",
//   "Faisalabad",
//   "Peshawar",
//   "Quetta",
//   "Multan",
//   "Sialkot",
//   "Gujranwala",
// ];
// const states = [
//   "Sindh",
//   "Punjab",
//   "Khyber Pakhtunkhwa",
//   "Balochistan",
//   "Islamabad Capital Territory",
//   "Gilgit-Baltistan",
//   "Azad Kashmir",
// ];

// export default function StepPersonalInfo({ data, onChange, onNext }: Props) {
//   const [preview, setPreview] = useState<string>("");

//   // whenever data.avatar changes, generate a preview URL
//   useEffect(() => {
//     if (data.avatar instanceof File) {
//       const url = URL.createObjectURL(data.avatar);
//       setPreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else if (typeof data.avatar === "string") {
//       setPreview(data.avatar);
//     } else {
//       setPreview("");
//     }
//   }, [data.avatar]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onChange({ [name]: value });
//   };

//   const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) onChange({ avatar: file });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Avatar Upload / Preview */}
//       <div className="flex justify-start">
//         <label className="w-24 h-24 bg-[#111] rounded-md flex items-center justify-center cursor-pointer overflow-hidden">
//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleAvatar}
//             className="hidden"
//           />
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
//         </label>
//       </div>

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
//             value={(data as any)[name] || ""}
//             onChange={handleChange}
//             className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//           />
//         ))}

//         <select
//           name="maritalStatus"
//           value={data.maritalStatus}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Marital Status</option>
//           {maritalStatuses.map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>

//         <select
//           name="gender"
//           value={data.gender}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Gender</option>
//           {genders.map((g) => (
//             <option key={g} value={g}>
//               {g}
//             </option>
//           ))}
//         </select>

//         <select
//           name="nationality"
//           value={data.nationality}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">Nationality</option>
//           {nationalities.map((n) => (
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
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">City</option>
//           {cities.map((c) => (
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         <select
//           name="state"
//           value={data.state}
//           onChange={handleChange}
//           className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
//         >
//           <option value="">State</option>
//           {states.map((s) => (
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
import {
  CldUploadButton,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { assets } from "@/constants/assets";

type Props = {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    nationality: string;
    maritalStatus: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    avatar?: string;
  };
  onChange: (update: Partial<Props["data"]>) => void;
  onNext: () => void;
};

const genders = ["Male", "Female", "Other"];
const nationalities = ["Pakistan", "Foreign"];
const maritalStatuses = ["Single", "Married", "Divorced"];
const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Peshawar",
  "Quetta",
  "Multan",
  "Sialkot",
  "Gujranwala",
];
const states = [
  "Sindh",
  "Punjab",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Kashmir",
];

export default function StepPersonalInfo({ data, onChange, onNext }: Props) {
  const [preview, setPreview] = useState<string>("");

  // update preview whenever avatar URL changes
  useEffect(() => {
    setPreview(data.avatar ?? "");
  }, [data.avatar]);

  // handle text/select field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ [name]: value } as any);
  };

  return (
    <div className="space-y-6">
      {/* Avatar upload & preview */}
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 bg-[#111] rounded-md overflow-hidden">
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

        <CldUploadButton
          options={{
            uploadPreset: "unsigned_hr_preset",
            folder: "hr-management/avatars",
            resourceType: "image",
          }}
          onUpload={(result: CloudinaryUploadWidgetResults) => {
            if (
              result.info &&
              typeof result.info !== "string" &&
              result.info.secure_url
            ) {
              onChange({ avatar: result.info.secure_url });
            }
          }}
        >
          <button className="px-4 py-2 bg-orange-500 rounded text-white hover:bg-orange-600">
            Upload Avatar
          </button>
        </CldUploadButton>
      </div>

      {/* Personal details form */}
      <div className="grid grid-cols-2 gap-4">
        {/* First/Last Name, Phone, Email, DOB */}
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
            className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
          />
        ))}

        {/* Marital Status */}
        <select
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
        >
          <option value="">Marital Status</option>
          {maritalStatuses.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        {/* Gender */}
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
        >
          <option value="">Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* Nationality */}
        <select
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
        >
          <option value="">Nationality</option>
          {nationalities.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {/* Address */}
        <input
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          className="col-span-2 w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />

        {/* City */}
        <select
          name="city"
          value={data.city}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
        >
          <option value="">City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* State */}
        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 text-gray-100 focus:border-orange-500 focus:ring-0"
        >
          <option value="">State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* ZIP Code */}
        <input
          name="zipCode"
          placeholder="ZIP Code"
          value={data.zipCode}
          onChange={handleChange}
          className="w-full bg-[#111] border border-gray-700 rounded px-4 py-2 placeholder-gray-500 text-gray-100 focus:border-orange-500 focus:ring-0"
        />
      </div>

      {/* Next button */}
      <div className="flex justify-end">
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
