// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/forgot-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message || "Something went wrong");
//       return;
//     }

//     // Navigate to OTP entry page
//     router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4 text-white">
//       <div className="max-w-sm w-full p-6 space-y-6">
//         <a
//           href="/signin"
//           className="text-sm text-gray-300 hover:text-orange-400"
//         >
//           &larr; Back
//         </a>

//         <div className="space-y-3">
//           <h2 className="text-xl font-bold">Forgot Password</h2>
//           <p className="text-gray-300 text-sm">
//             Enter your registered email address; we’ll send you a code to reset
//             your password.
//           </p>

//           {error && <p className="text-red-500 text-center">{error}</p>}

//           <form onSubmit={handleSubmit} className="space-y-3 mt-4">
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-[#333] text-white border-none outline-none p-2 rounded focus:ring-2 focus:ring-orange-400"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
//             >
//               Send OTP
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    // Navigate to OTP entry page
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        <p className="text-center text-gray-400">
          Enter your registered email address; we’ll send you a code to reset
          your password.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Send OTP Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
        >
          Send OTP
        </button>

        {/* Back to Sign In */}
        <p className="mt-4 text-sm text-center text-gray-400">
          Remembered your password?{" "}
          <a href="/signin" className="text-orange-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
