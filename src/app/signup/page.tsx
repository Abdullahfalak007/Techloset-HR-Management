// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });
//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message || "Signup failed");
//       return;
//     }

//     // Redirect to sign‑in
//     router.push("/signin");
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-[#1A1A1A] text-white space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center">Create Account</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {/* Full Name */}
//         <div className="space-y-1">
//           <label className="text-sm text-gray-400">Full Name</label>
//           <input
//             type="text"
//             placeholder="Your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Email */}
//         <div className="space-y-1">
//           <label className="text-sm text-gray-400">Email Address</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full bg-transparent border border-orange-500 rounded-lg p-3 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         {/* Password */}
//         <div className="space-y-1">
//           <label className="text-sm text-gray-400">Password</label>
//           <div className="relative">
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full bg-transparent border border-orange-500 rounded-lg p-3 pr-10 outline-none placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
//             />
//             {/* eye icon if you want toggle later */}
//             <img
//               src="/assets/icons/eyeIcon.svg"
//               alt="Show password"
//               className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
//             />
//           </div>
//         </div>

//         {/* Remember Me (optional) */}
//         <div className="flex items-center space-x-2 text-sm">
//           <input
//             type="checkbox"
//             checked={remember}
//             onChange={() => setRemember(!remember)}
//             className="h-5 w-5 rounded border-orange-500 bg-transparent text-orange-500 focus:ring-orange-500"
//           />
//           <span>Remember Me</span>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-orange-500 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
//         >
//           Sign Up
//         </button>

//         {/* Already have account */}
//         <p className="mt-4 text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <a href="/signin" className="text-orange-500 hover:underline">
//             Sign In
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    router.push("/signin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--container-bg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[var(--container-bg)] text-[var(--text-primary)] space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        {error && <p className="text-[var(--error)] text-center">{error}</p>}

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-[var(--text-secondary)]">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border border-[var(--accent)] rounded-lg p-3 pr-10 outline-none placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--accent)]"
            />
            <img
              src="/assets/icons/eyeIcon.svg"
              alt="Show password"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="h-5 w-5 rounded border-[var(--accent)] bg-transparent text-[var(--accent)] focus:ring-[var(--accent)]"
          />
          <span>Remember Me</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] py-3 rounded-lg text-lg font-medium text-[var(--button-text)] hover:bg-[var(--accent-hover)] transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center text-[var(--text-secondary)]">
          Already have an account?{" "}
          <a href="/signin" className="text-[var(--accent)] hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
