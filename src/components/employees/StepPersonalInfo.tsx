// // // // // src/components/employees/StepPersonalInfo.tsx
// // // // "use client";

// // // // import React, { useEffect, useState } from "react";
// // // // import Image from "next/image";
// // // // import { assets } from "@/constants/assets";

// // // // declare global {
// // // //   interface Window {
// // // //     cloudinary: any;
// // // //   }
// // // // }

// // // // type Props = {
// // // //   data: any;
// // // //   avatarUrl: string;
// // // //   onChange: (update: any) => void;
// // // //   onAvatarChange: (url: string) => void;
// // // //   onNext: () => void;
// // // // };

// // // // export default function StepPersonalInfo({
// // // //   data,
// // // //   avatarUrl,
// // // //   onChange,
// // // //   onAvatarChange,
// // // //   onNext,
// // // // }: Props) {
// // // //   const [preview, setPreview] = useState(avatarUrl);

// // // //   useEffect(() => {
// // // //     setPreview(avatarUrl);
// // // //   }, [avatarUrl]);

// // // //   function openUploadWidget() {
// // // //     if (!window.cloudinary) return;
// // // //     const w = window.cloudinary.createUploadWidget(
// // // //       {
// // // //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// // // //         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// // // //         folder: "hr-management/avatars",
// // // //         resourceType: "image",

// // // //         // ← NEW: force a 1:1 crop
// // // //         cropping: true,
// // // //         croppingAspectRatio: 1,
// // // //         showAdvancedOptions: false,
// // // //         multiple: false,
// // // //         // you can also apply an automatic face‐centered crop:
// // // //         croppingShowDimensions: true,
// // // //         croppingDefaultSelectionRatio: 1,
// // // //       },
// // // //       (error: any, result: any) => {
// // // //         if (error) return;
// // // //         if (result.event === "success") {
// // // //           onAvatarChange(result.info.secure_url);
// // // //         }
// // // //       }
// // // //     );
// // // //     w.open();
// // // //   }

// // // //   const handleChange = (
// // // //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// // // //   ) => {
// // // //     const { name, value } = e.target;
// // // //     onChange({ [name]: value });
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6">
// // // //       <div className="flex items-center space-x-4">
// // // //         <div className="w-24 h-24 bg-[var(--surface)] rounded-md overflow-hidden">
// // // //           {preview ? (
// // // //             <Image
// // // //               src={preview}
// // // //               alt="Avatar preview"
// // // //               width={96}
// // // //               height={96}
// // // //               className="object-cover"
// // // //             />
// // // //           ) : (
// // // //             <Image
// // // //               src={assets.icons.camera}
// // // //               alt="Upload avatar"
// // // //               width={32}
// // // //               height={32}
// // // //             />
// // // //           )}
// // // //         </div>
// // // //         <button
// // // //           onClick={openUploadWidget}
// // // //           className="px-4 py-2 bg-[var(--accent)] rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
// // // //         >
// // // //           Upload Avatar
// // // //         </button>
// // // //       </div>

// // // //       <div className="grid grid-cols-2 gap-4">
// // // //         {[
// // // //           { name: "firstName", placeholder: "First Name", type: "text" },
// // // //           { name: "lastName", placeholder: "Last Name", type: "text" },
// // // //           { name: "phone", placeholder: "Mobile Number", type: "tel" },
// // // //           { name: "email", placeholder: "Email Address", type: "email" },
// // // //           { name: "dob", placeholder: "Date of Birth", type: "date" },
// // // //         ].map(({ name, placeholder, type }) => (
// // // //           <input
// // // //             key={name}
// // // //             name={name}
// // // //             type={type}
// // // //             placeholder={placeholder}
// // // //             value={(data as any)[name] ?? ""}
// // // //             onChange={handleChange}
// // // //             /* make personal‐email readOnly when it already has a value */
// // // //             readOnly={name === "email" && Boolean((data as any).email)}
// // // //             className={`
// // // //                       w-full bg-[var(--surface)] border border-[var(--border)]
// // // //                       rounded px-4 py-2 placeholder-[var(--text-secondary)]
// // // //                       text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0
// // // //                       ${
// // // //                         name === "email" && (data as any).email
// // // //                           ? "cursor-not-allowed bg-opacity-50"
// // // //                           : ""
// // // //                       }
// // // //                     `}
// // // //           />
// // // //         ))}

// // // //         <select
// // // //           name="maritalStatus"
// // // //           value={data.maritalStatus}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         >
// // // //           <option value="">Marital Status</option>
// // // //           {["Single", "Married", "Divorced"].map((m) => (
// // // //             <option key={m} value={m}>
// // // //               {m}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <select
// // // //           name="gender"
// // // //           value={data.gender}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         >
// // // //           <option value="">Gender</option>
// // // //           {["Male", "Female", "Other"].map((g) => (
// // // //             <option key={g} value={g}>
// // // //               {g}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <select
// // // //           name="nationality"
// // // //           value={data.nationality}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         >
// // // //           <option value="">Nationality</option>
// // // //           {["Pakistan", "Foreign"].map((n) => (
// // // //             <option key={n} value={n}>
// // // //               {n}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <input
// // // //           name="address"
// // // //           placeholder="Address"
// // // //           value={data.address}
// // // //           onChange={handleChange}
// // // //           className="col-span-2 w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         />

// // // //         <select
// // // //           name="city"
// // // //           value={data.city}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         >
// // // //           <option value="">City</option>
// // // //           {[
// // // //             "Karachi",
// // // //             "Lahore",
// // // //             "Islamabad",
// // // //             "Rawalpindi",
// // // //             "Faisalabad",
// // // //             "Peshawar",
// // // //           ].map((c) => (
// // // //             <option key={c} value={c}>
// // // //               {c}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <select
// // // //           name="state"
// // // //           value={data.state}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         >
// // // //           <option value="">State</option>
// // // //           {[
// // // //             "Sindh",
// // // //             "Punjab",
// // // //             "Khyber Pakhtunkhwa",
// // // //             "Balochistan",
// // // //             "Islamabad Capital Territory",
// // // //           ].map((s) => (
// // // //             <option key={s} value={s}>
// // // //               {s}
// // // //             </option>
// // // //           ))}
// // // //         </select>

// // // //         <input
// // // //           name="zipCode"
// // // //           placeholder="ZIP Code"
// // // //           value={data.zipCode}
// // // //           onChange={handleChange}
// // // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // // //         />
// // // //       </div>

// // // //       <div className="flex justify-end">
// // // //         <button
// // // //           onClick={onNext}
// // // //           className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
// // // //         >
// // // //           Next
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // src/components/employees/StepPersonalInfo.tsx
// // // "use client";

// // // import React, { useEffect, useState } from "react";
// // // import Image from "next/image";
// // // import { assets } from "@/constants/assets";

// // // declare global {
// // //   interface Window {
// // //     cloudinary: any;
// // //   }
// // // }

// // // type Props = {
// // //   isEditing: boolean;
// // //   data: {
// // //     firstName: string;
// // //     lastName: string;
// // //     email: string;
// // //     phone: string;
// // //     dob: string;
// // //     gender: string;
// // //     nationality: string;
// // //     maritalStatus: string;
// // //     address: string;
// // //     city: string;
// // //     state: string;
// // //     zipCode: string;
// // //   };
// // //   avatarUrl: string;
// // //   onChange: (update: Partial<Props["data"]>) => void;
// // //   onAvatarChange: (url: string) => void;
// // //   onNext: () => void;
// // // };

// // // export default function StepPersonalInfo({
// // //   isEditing,
// // //   data,
// // //   avatarUrl,
// // //   onChange,
// // //   onAvatarChange,
// // //   onNext,
// // // }: Props) {
// // //   const [preview, setPreview] = useState(avatarUrl);

// // //   useEffect(() => {
// // //     setPreview(avatarUrl);
// // //   }, [avatarUrl]);

// // //   function openUploadWidget() {
// // //     if (!window.cloudinary) return;
// // //     const w = window.cloudinary.createUploadWidget(
// // //       {
// // //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// // //         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// // //         folder: "hr-management/avatars",
// // //         resourceType: "image",
// // //         cropping: true,
// // //         croppingAspectRatio: 1,
// // //         showAdvancedOptions: false,
// // //         multiple: false,
// // //         croppingShowDimensions: true,
// // //         croppingDefaultSelectionRatio: 1,
// // //       },
// // //       (error: any, result: any) => {
// // //         if (error) return;
// // //         if (result.event === "success") {
// // //           onAvatarChange(result.info.secure_url);
// // //         }
// // //       }
// // //     );
// // //     w.open();
// // //   }

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// // //   ) => {
// // //     const { name, value } = e.target;
// // //     onChange({ [name]: value } as any);
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center space-x-4">
// // //         <div className="w-24 h-24 bg-[var(--surface)] rounded-md overflow-hidden">
// // //           {preview ? (
// // //             <Image
// // //               src={preview}
// // //               alt="Avatar preview"
// // //               width={96}
// // //               height={96}
// // //               className="object-cover"
// // //             />
// // //           ) : (
// // //             <Image
// // //               src={assets.icons.camera}
// // //               alt="Upload avatar"
// // //               width={32}
// // //               height={32}
// // //             />
// // //           )}
// // //         </div>
// // //         <button
// // //           onClick={openUploadWidget}
// // //           className="px-4 py-2 bg-[var(--accent)] rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
// // //         >
// // //           Upload Avatar
// // //         </button>
// // //       </div>

// // //       <div className="grid grid-cols-2 gap-4">
// // //         {[
// // //           { name: "firstName", placeholder: "First Name", type: "text" },
// // //           { name: "lastName", placeholder: "Last Name", type: "text" },
// // //           { name: "phone", placeholder: "Mobile Number", type: "tel" },
// // //           { name: "email", placeholder: "Email Address", type: "email" },
// // //           { name: "dob", placeholder: "Date of Birth", type: "date" },
// // //         ].map(({ name, placeholder, type }) => (
// // //           <input
// // //             key={name}
// // //             name={name}
// // //             type={type}
// // //             placeholder={placeholder}
// // //             value={(data as any)[name] ?? ""}
// // //             onChange={handleChange}
// // //             readOnly={
// // //               isEditing && name === "email" && Boolean((data as any).email)
// // //             }
// // //             className={`
// // //               w-full bg-[var(--surface)] border border-[var(--border)]
// // //               rounded px-4 py-2 placeholder-[var(--text-secondary)]
// // //               text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0
// // //               ${
// // //                 isEditing && name === "email" && (data as any).email
// // //                   ? "cursor-not-allowed bg-opacity-50"
// // //                   : ""
// // //               }
// // //             `}
// // //           />
// // //         ))}

// // //         <select
// // //           name="maritalStatus"
// // //           value={data.maritalStatus}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         >
// // //           <option value="">Marital Status</option>
// // //           {["Single", "Married", "Divorced"].map((m) => (
// // //             <option key={m} value={m}>
// // //               {m}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <select
// // //           name="gender"
// // //           value={data.gender}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         >
// // //           <option value="">Gender</option>
// // //           {["Male", "Female", "Other"].map((g) => (
// // //             <option key={g} value={g}>
// // //               {g}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <select
// // //           name="nationality"
// // //           value={data.nationality}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         >
// // //           <option value="">Nationality</option>
// // //           {["Pakistan", "Foreign"].map((n) => (
// // //             <option key={n} value={n}>
// // //               {n}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <input
// // //           name="address"
// // //           placeholder="Address"
// // //           value={data.address}
// // //           onChange={handleChange}
// // //           className="col-span-2 w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var(--text-secondary)] text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         />

// // //         <select
// // //           name="city"
// // //           value={data.city}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         >
// // //           <option value="">City</option>
// // //           {[
// // //             "Karachi",
// // //             "Lahore",
// // //             "Islamabad",
// // //             "Rawalpindi",
// // //             "Faisalabad",
// // //             "Peshawar",
// // //           ].map((c) => (
// // //             <option key={c} value={c}>
// // //               {c}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <select
// // //           name="state"
// // //           value={data.state}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent)] focus:ring-0"
// // //         >
// // //           <option value="">State</option>
// // //           {[
// // //             "Sindh",
// // //             "Punjab",
// // //             "Khyber Pakhtunkhwa",
// // //             "Balochistan",
// // //             "Islamabad Capital Territory",
// // //           ].map((s) => (
// // //             <option key={s} value={s}>
// // //               {s}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <input
// // //           name="zipCode"
// // //           placeholder="ZIP Code"
// // //           value={data.zipCode}
// // //           onChange={handleChange}
// // //           className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-4 py-2 placeholder-[var──ígenue truncated"
// // //         />
// // //       </div>

// // //       <div className="flex justify-end">
// // //         <button
// // //           onClick={onNext}
// // //           className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] transition"
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/components/employees/StepPersonalInfo.tsx
// // "use client";

// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { assets } from "@/constants/assets";

// // declare global {
// //   interface Window {
// //     cloudinary: any;
// //   }
// // }

// // type Props = {
// //   isEditing: boolean;
// //   data: {
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     phone: string;
// //     dob: string;
// //     maritalStatus: string;
// //     gender: string;
// //     nationality: string;
// //     address: string;
// //     city: string;
// //     state: string;
// //     zipCode: string;
// //   };
// //   avatarUrl: string;
// //   onChange: (update: Partial<Props["data"]>) => void;
// //   onAvatarChange: (url: string) => void;
// //   onNext: () => void;
// // };

// // export default function StepPersonalInfo({
// //   isEditing,
// //   data,
// //   avatarUrl,
// //   onChange,
// //   onAvatarChange,
// //   onNext,
// // }: Props) {
// //   const [preview, setPreview] = useState<string>(avatarUrl);

// //   useEffect(() => {
// //     setPreview(avatarUrl);
// //   }, [avatarUrl]);

// //   function openUploadWidget() {
// //     if (!window.cloudinary) return;
// //     const widget = window.cloudinary.createUploadWidget(
// //       {
// //         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// //         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
// //         folder: "hr-management/avatars",
// //         resourceType: "image",
// //         cropping: true,
// //         croppingAspectRatio: 1,
// //         showAdvancedOptions: false,
// //         multiple: false,
// //         croppingShowDimensions: true,
// //         croppingDefaultSelectionRatio: 1,
// //       },
// //       (error: any, result: any) => {
// //         if (error) return;
// //         if (result.event === "success") {
// //           onAvatarChange(result.info.secure_url);
// //         }
// //       }
// //     );
// //     widget.open();
// //   }

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     onChange({ [e.target.name]: e.target.value } as any);
// //   };

// //   const inputCls =
// //     "h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]";

// //   return (
// //     <div className="space-y-6">
// //       {/* — Avatar Upload Row — */}
// //       <div className="flex items-center space-x-4">
// //         <div
// //           onClick={openUploadWidget}
// //           title="Upload Avatar"
// //           role="button"
// //           aria-label="Upload Avatar"
// //           className=" flex items-center justify-center
// //             w-24 h-24
// //             bg-[var(--surface)]
// //             rounded-md
// //             overflow-hidden
// //             cursor-pointer
// //             border border-transparent
// //             hover:bg-[var(--surface-hover)]
// //            hover:border-[var(--accent)]
// //             transition
// //           "
// //         >
// //           {preview ? (
// //             <Image
// //               src={preview}
// //               alt="Avatar preview"
// //               width={96}
// //               height={96}
// //               className="object-cover w-full h-full"
// //             />
// //           ) : (
// //             <Image
// //               src={assets.icons.camera}
// //               alt="Upload avatar"
// //               width={32}
// //               height={32}
// //               className="m-auto"
// //             />
// //           )}
// //         </div>
// //       </div>

// //       {/* — Main Fields (2-column grid) — */}
// //       <div className="grid grid-cols-2 gap-6">
// //         <input
// //           name="firstName"
// //           placeholder="First Name"
// //           value={data.firstName}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />
// //         <input
// //           name="lastName"
// //           placeholder="Last Name"
// //           value={data.lastName}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />

// //         <input
// //           name="phone"
// //           placeholder="Mobile Number"
// //           value={data.phone}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />
// //         <input
// //           name="email"
// //           type="email"
// //           placeholder="Email Address"
// //           value={data.email}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />

// //         <input
// //           name="dob"
// //           type="date"
// //           value={data.dob}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />
// //         <select
// //           name="maritalStatus"
// //           value={data.maritalStatus}
// //           onChange={handleChange}
// //           className={inputCls}
// //         >
// //           <option value="">Marital Status</option>
// //           <option>Single</option>
// //           <option>Married</option>
// //           <option>Divorced</option>
// //         </select>

// //         <select
// //           name="gender"
// //           value={data.gender}
// //           onChange={handleChange}
// //           className={inputCls}
// //         >
// //           <option value="">Gender</option>
// //           <option>Male</option>
// //           <option>Female</option>
// //           <option>Other</option>
// //         </select>
// //         <select
// //           name="nationality"
// //           value={data.nationality}
// //           onChange={handleChange}
// //           className={inputCls}
// //         >
// //           <option value="">Nationality</option>
// //           <option>Pakistan</option>
// //           <option>Foreign</option>
// //         </select>

// //         {/* address spans two columns */}
// //         <input
// //           name="address"
// //           placeholder="Address"
// //           value={data.address}
// //           onChange={handleChange}
// //           className={`${inputCls} col-span-2`}
// //         />
// //       </div>

// //       {/* — Last three fields, single row — */}
// //       <div className="grid grid-cols-3 gap-6">
// //         <select
// //           name="city"
// //           value={data.city}
// //           onChange={handleChange}
// //           className={inputCls}
// //         >
// //           <option value="">City</option>
// //           <option>Karachi</option>
// //           <option>Lahore</option>
// //           <option>Islamabad</option>
// //           {/* … */}
// //         </select>

// //         <select
// //           name="state"
// //           value={data.state}
// //           onChange={handleChange}
// //           className={inputCls}
// //         >
// //           <option value="">State</option>
// //           <option>Sindh</option>
// //           <option>Punjab</option>
// //           <option>Khyber Pakhtunkhwa</option>
// //           {/* … */}
// //         </select>

// //         <input
// //           name="zipCode"
// //           placeholder="ZIP Code"
// //           value={data.zipCode}
// //           onChange={handleChange}
// //           className={inputCls}
// //         />
// //       </div>

// //       {/* — Next button — */}
// //       <div className="flex justify-end">
// //         <button
// //           onClick={onNext}
// //           className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] rounded-lg transition"
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

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
//   isEditing: boolean;
//   data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     dob: string;
//     maritalStatus: string;
//     gender: string;
//     nationality: string;
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
//   isEditing,
//   data,
//   avatarUrl,
//   onChange,
//   onAvatarChange,
//   onNext,
// }: Props) {
//   const [preview, setPreview] = useState<string>(avatarUrl);

//   useEffect(() => {
//     setPreview(avatarUrl);
//   }, [avatarUrl]);

//   function openUploadWidget() {
//     if (!window.cloudinary) return;
//     const widget = window.cloudinary.createUploadWidget(
//       {
//         cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//         uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//         folder: "hr-management/avatars",
//         resourceType: "image",
//         cropping: true,
//         croppingAspectRatio: 1,
//         showAdvancedOptions: false,
//         multiple: false,
//         croppingShowDimensions: true,
//         croppingDefaultSelectionRatio: 1,
//       },
//       (error: any, result: any) => {
//         if (error) return console.error("Upload error:", error);
//         if (result.event === "success") {
//           onAvatarChange(result.info.secure_url);
//         }
//       }
//     );
//     widget.open();
//   }

//   // LISTEN for the little overlay‐click from the layout
//   useEffect(() => {
//     window.addEventListener("avatar-edit", openUploadWidget);
//     return () => window.removeEventListener("avatar-edit", openUploadWidget);
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     onChange({ [e.target.name]: e.target.value } as any);
//   };

//   const inputCls =
//     "h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]";

//   return (
//     <div className="space-y-6">
//       {/* Avatar preview + upload */}
//       <div className="flex items-center space-x-4">
//         <div
//           onClick={openUploadWidget}
//           title={isEditing ? "Change avatar" : "Upload Avatar"}
//           role="button"
//           aria-label="Upload Avatar"
//           className=" flex items-center justify-center
//             w-24 h-24
//             bg-[var(--surface)]
//             rounded-md
//             overflow-hidden
//             cursor-pointer
//             border border-transparent
//             hover:bg-[var(--surface-hover)]
//             hover:border-[var(--accent)]
//             transition
//           "
//         >
//           {preview ? (
//             <Image
//               src={preview}
//               alt="Avatar preview"
//               width={96}
//               height={96}
//               className="object-cover w-full h-full"
//             />
//           ) : (
//             <Image
//               src={assets.icons.camera}
//               alt="Upload avatar"
//               width={32}
//               height={32}
//               className="m-auto"
//             />
//           )}
//         </div>
//       </div>

//       {/* — Main Fields (2-column grid) — */}
//       <div className="grid grid-cols-2 gap-6">
//         <input
//           name="firstName"
//           placeholder="First Name"
//           value={data.firstName}
//           onChange={handleChange}
//           className={inputCls}
//         />
//         <input
//           name="lastName"
//           placeholder="Last Name"
//           value={data.lastName}
//           onChange={handleChange}
//           className={inputCls}
//         />

//         <input
//           name="phone"
//           placeholder="Mobile Number"
//           value={data.phone}
//           onChange={handleChange}
//           className={inputCls}
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email Address"
//           value={data.email}
//           onChange={handleChange}
//           className={inputCls}
//         />

//         <input
//           name="dob"
//           type="date"
//           value={data.dob}
//           onChange={handleChange}
//           className={inputCls}
//         />
//         <select
//           name="maritalStatus"
//           value={data.maritalStatus}
//           onChange={handleChange}
//           className={inputCls}
//         >
//           <option value="">Marital Status</option>
//           <option>Single</option>
//           <option>Married</option>
//           <option>Divorced</option>
//         </select>

//         <select
//           name="gender"
//           value={data.gender}
//           onChange={handleChange}
//           className={inputCls}
//         >
//           <option value="">Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//           <option>Other</option>
//         </select>
//         <select
//           name="nationality"
//           value={data.nationality}
//           onChange={handleChange}
//           className={inputCls}
//         >
//           <option value="">Nationality</option>
//           <option>Pakistan</option>
//           <option>Foreign</option>
//         </select>

//         {/* address spans two columns */}
//         <input
//           name="address"
//           placeholder="Address"
//           value={data.address}
//           onChange={handleChange}
//           className={`${inputCls} col-span-2`}
//         />
//       </div>

//       {/* — Last three fields — */}
//       <div className="grid grid-cols-3 gap-6">
//         <select
//           name="city"
//           value={data.city}
//           onChange={handleChange}
//           className={inputCls}
//         >
//           <option value="">City</option>
//           <option>Karachi</option>
//           <option>Lahore</option>
//           <option>Islamabad</option>
//           {/* … */}
//         </select>

//         <select
//           name="state"
//           value={data.state}
//           onChange={handleChange}
//           className={inputCls}
//         >
//           <option value="">State</option>
//           <option>Sindh</option>
//           <option>Punjab</option>
//           <option>Khyber Pakhtunkhwa</option>
//           {/* … */}
//         </select>

//         <input
//           name="zipCode"
//           placeholder="ZIP Code"
//           value={data.zipCode}
//           onChange={handleChange}
//           className={inputCls}
//         />
//       </div>

//       {/* — Next button — */}
//       <div className="flex justify-end">
//         <button
//           onClick={onNext}
//           className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] rounded-lg transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";

type Props = {
  isEditing: boolean;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    maritalStatus: string;
    gender: string;
    nationality: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  avatarUrl: string;
  onChange: (update: Partial<Props["data"]>) => void;
  onAvatarChange: (url: string) => void;
  onNext: () => void;
};

export default function StepPersonalInfo({
  isEditing,
  data,
  avatarUrl,
  onChange,
  onAvatarChange,
  onNext,
}: Props) {
  const [preview, setPreview] = useState<string>(avatarUrl);

  useEffect(() => {
    setPreview(avatarUrl);
  }, [avatarUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ [e.target.name]: e.target.value } as any);
  };

  const inputCls =
    "h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]";

  return (
    <div className="space-y-6">
      {/* Avatar Upload only when Adding */}
      {!isEditing && (
        <div className="flex items-center space-x-4">
          <div
            onClick={() => {
              if (!window.cloudinary) return;
              const widget = window.cloudinary.createUploadWidget(
                {
                  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                  uploadPreset:
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                  folder: "hr-management/avatars",
                  resourceType: "image",
                  cropping: true,
                  croppingAspectRatio: 1,
                  showAdvancedOptions: false,
                  multiple: false,
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
              widget.open();
            }}
            title="Upload Avatar"
            role="button"
            className="
              flex items-center justify-center
              w-24 h-24
              bg-[var(--surface)]
              rounded-md
              overflow-hidden
              cursor-pointer
              border border-transparent
              hover:bg-[var(--surface-hover)]
              hover:border-[var(--accent)]
              transition
            "
          >
            {preview ? (
              <Image
                src={preview}
                alt="Avatar preview"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={assets.icons.camera}
                alt="Upload avatar"
                width={32}
                height={32}
                className="m-auto"
              />
            )}
          </div>
        </div>
      )}

      {/* Main Fields */}
      <div className="grid grid-cols-2 gap-6">
        <input
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="phone"
          placeholder="Mobile Number"
          value={data.phone}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          name="dob"
          type="date"
          value={data.dob}
          onChange={handleChange}
          className={inputCls}
        />
        <select
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Marital Status</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
        </select>
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select
          name="nationality"
          value={data.nationality}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">Nationality</option>
          <option>Pakistan</option>
          <option>Foreign</option>
        </select>
        <input
          name="address"
          placeholder="Address"
          value={data.address}
          onChange={handleChange}
          className={`${inputCls} col-span-2`}
        />
      </div>

      {/* Last row */}
      <div className="grid grid-cols-3 gap-6">
        <select
          name="city"
          value={data.city}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">City</option>
          <option>Karachi</option>
          <option>Lahore</option>
          <option>Islamabad</option>
          <option>Faisalabad</option>
          <option>Peshawar</option>
          <option>Multan</option>
          <option>Quetta</option>
        </select>
        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className={inputCls}
        >
          <option value="">State</option>
          <option>Sindh</option>
          <option>Punjab</option>
          <option>Khyber Pakhtunkhwa</option>
          <option>Balochistan</option>
        </select>
        <input
          name="zipCode"
          placeholder="ZIP Code"
          value={data.zipCode}
          onChange={handleChange}
          className={inputCls}
        />
      </div>

      {/* Next */}
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] rounded-lg transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
