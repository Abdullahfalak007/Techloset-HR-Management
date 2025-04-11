// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SigninPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) {
//       setError("Invalid email or password");
//     } else {
//       router.push("/dashboard"); // redirect to protected dashboard
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//       >
//         <h1 className="text-xl text-black font-bold mb-4">Sign In</h1>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full mb-4 p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Sign In
//         </button>
//         <p className="mt-4 text-center text-sm">
//           Don't have an account?{" "}
//           <a href="/signup" className="text-blue-600 underline">
//             Sign Up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/"); // redirect to protected dashboard
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#1A1A1A]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Sign In</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
        <div className="mt-4 flex justify-between text-sm">
          <a href="/forgot-password" className="text-blue-600 underline">
            Forgot Password?
          </a>
          <span>
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 underline">
              Sign Up
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
