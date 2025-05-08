// // src/components/dashboard/StatsCard.tsx
// "use client";

// import React from "react";
// import { format } from "date-fns";

// type StatsCardProps = {
//   /** e.g. "Total Employees" */
//   title: string;
//   /** e.g. 15 or "0666" */
//   value: number | string;
//   /** the URL of your little icon */
//   icon: string;
//   /** percent change, e.g. 12 or -8 */
//   change: number;
//   /** true = up (green), false = down (red) */
//   positive?: boolean;
//   /** optional override for “last updated” date (defaults to today) */
//   updatedAt?: Date;
// };

// export default function StatsCard({
//   title,
//   value,
//   icon,
//   change,
//   positive = true,
//   updatedAt = new Date(),
// }: StatsCardProps) {
//   // choose colors & arrow
//   const bgChange = positive ? "bg-green-900" : "bg-red-900";
//   const textChange = positive ? "text-green-400" : "text-red-400";

//   const Arrow = positive ? (
//     <svg
//       className="w-3 h-3"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path fillRule="evenodd" d="M10 4l5 6H5l5-6z" clipRule="evenodd" />
//     </svg>
//   ) : (
//     <svg
//       className="w-3 h-3"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path fillRule="evenodd" d="M10 16l-5-6h10l-5 6z" clipRule="evenodd" />
//     </svg>
//   );

//   return (
//     <div className="bg-[#1A1A1A] border border-gray-700 rounded-lg p-6 flex flex-col justify-between">
//       {/* top section */}
//       <div>
//         <div className="flex items-center justify-between">
//           {/* icon + title */}
//           <div className="flex items-center space-x-3">
//             <div className="bg-[#2A2A2A] p-2 rounded">
//               <img src={icon} alt="" className="w-6 h-6" />
//             </div>
//             <h3 className="text-white text-sm font-medium">{title}</h3>
//           </div>
//           {/* change pill */}
//           <div className={`${bgChange} flex items-center rounded px-2 py-1`}>
//             <span className={textChange}>{Arrow}</span>
//             <span className={`ml-1 text-xs font-semibold ${textChange}`}>
//               {Math.abs(change)}%
//             </span>
//           </div>
//         </div>

//         {/* big number */}
//         <p className="mt-4 text-white text-3xl font-bold">{value}</p>
//       </div>

//       {/* footer divider + date */}
//       <div className="mt-6 border-t border-gray-700 pt-2">
//         <p className="text-xs text-gray-400">
//           Update: {format(updatedAt, "LLLL d, yyyy")}
//         </p>
//       </div>
//     </div>
//   );
// }

// src/components/dashboard/StatsCard.tsx
"use client";

import React from "react";
import { format } from "date-fns";

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: string;
  change: number;
  positive?: boolean;
  updatedAt?: Date;
};

export default function StatsCard({
  title,
  value,
  icon,
  change,
  positive = true,
  updatedAt = new Date(),
}: StatsCardProps) {
  const bgChange = positive ? "bg-[var(--success-dark)]" : "bg-[var(--danger)]";
  const textChange = positive
    ? "text-[var(--success)]"
    : "text-[var(--danger)]";

  const Arrow = positive ? (
    <svg
      className="w-3 h-3"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M10 4l5 6H5l5-6z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg
      className="w-3 h-3"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M10 16l-5-6h10l-5 6z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-[var(--container-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-[var(--surface)] p-2 rounded">
              <img src={icon} alt="" className="w-6 h-6" />
            </div>
            <h3 className="text-[var(--text-primary)] text-sm font-medium">
              {title}
            </h3>
          </div>
          <div className={`${bgChange} flex items-center rounded px-2 py-1`}>
            <span className={textChange}>{Arrow}</span>
            <span className={`ml-1 text-xs font-semibold ${textChange}`}>
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <p className="mt-4 text-[var(--text-primary)] text-3xl font-bold">
          {value}
        </p>
      </div>
      <div className="mt-6 border-t border-[var(--border)] pt-2">
        <p className="text-xs text-[var(--text-secondary)]">
          Update: {format(updatedAt, "LLLL d, yyyy")}
        </p>
      </div>
    </div>
  );
}
