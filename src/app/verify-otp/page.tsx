// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function VerifyOtpPage() {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const params = useSearchParams();
//   const email = params.get("email") || "";

//   useEffect(() => {
//     if (!email) {
//       router.replace("/forgot-password");
//     }
//   }, [email, router]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp }),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message || "OTP verification failed");
//     } else {
//       router.push(`/reset-password?email=${encodeURIComponent(email)}`);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4 text-white">
//       <div className="max-w-sm w-full p-6 space-y-6">
//         <h2 className="text-xl font-bold text-center">Enter OTP</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             placeholder="6‑digit code"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full bg-[#333] text-white p-2 rounded outline-none focus:ring-2 focus:ring-orange-400"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
//           >
//             Verify OTP
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "OTP verification failed");
    } else {
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Enter OTP</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* OTP Input */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">One‑Time Code</label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
        >
          Verify OTP
        </button>

        {/* Back to Forgot Password */}
        <p className="mt-4 text-sm text-center text-gray-400">
          Didn’t receive a code?{" "}
          <a
            href={`/forgot-password`}
            className="text-orange-500 hover:underline"
          >
            Send again
          </a>
        </p>
      </form>
    </div>
  );
}
