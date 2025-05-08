// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function ChangePasswordPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // local form state
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // if not signed in, bounce to signin
//   if (status === "loading") return null;
//   if (!session) {
//     router.replace("/signin");
//     return null;
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (newPassword !== confirmPassword) {
//       setError("New passwords don’t match.");
//       return;
//     }

//     const res = await fetch("/api/auth/change-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ currentPassword, newPassword }),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message || "Something went wrong.");
//     } else {
//       setSuccess("Password changed!");
//       // optionally clear form
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//     }
//   }

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Change Password</h1>

//       {error && <p className="mb-4 text-red-500">{error}</p>}
//       {success && <p className="mb-4 text-green-500">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Current Password</label>
//           <input
//             type="password"
//             required
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">New Password</label>
//           <input
//             type="password"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Confirm New Password</label>
//           <input
//             type="password"
//             required
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }

// src/app/(dashboard)/change-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ChangePasswordPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (status === "loading") return null;
  if (!session) {
    router.replace("/signin");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don’t match.");
      return;
    }

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong.");
    } else {
      setSuccess("Password changed!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>

      {error && <p className="mb-4 text-[var(--error)]">{error}</p>}
      {success && <p className="mb-4 text-[var(--success)]">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--button-text)] py-2 rounded transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
