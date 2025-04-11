// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     const res = await fetch("/api/auth/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp, newPassword }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.message || "Password reset failed");
//     } else {
//       setMessage(data.message);
//       setTimeout(() => router.push("/signin"), 2000);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4 text-white">
//       <div className="max-w-sm w-full bg-white p-6 rounded shadow-md text-black">
//         <h1 className="text-xl font-bold mb-4 text-center">Reset Password</h1>
//         {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
//         {message && (
//           <p className="text-green-600 mb-2 text-center">{message}</p>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="email"
//             placeholder="Registered Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="New Password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="w-full p-2 border rounded"
//           />
//           <button
//             type="submit"
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
//           >
//             Reset Password
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm">
//           Go back to{" "}
//           <a href="/signin" className="text-blue-600 underline">
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Populate email from querystring
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email");
    if (!e) {
      router.replace("/forgot-password");
    } else {
      setEmail(e);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Password reset failed");
    } else {
      setMessage(data.message);
      setTimeout(() => router.push("/signin"), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4 text-white">
      <div className="max-w-sm w-full bg-white p-6 rounded shadow-md text-black">
        <h1 className="text-xl font-bold mb-4 text-center">Reset Password</h1>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {message && (
          <p className="text-green-600 mb-2 text-center">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Go back to{" "}
          <a href="/signin" className="text-blue-600 underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
