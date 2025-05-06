// src/app/(dashboard)/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // 1️⃣ Initialize from session
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      const initial = (session.user as any).image ?? "";
      console.log("🔄 initializing avatarUrl from session:", initial);
      setAvatarUrl(initial);
    }
  }, [session]);

  // 2️⃣ Open the Cloudinary widget
  function openUploadWidget() {
    if (!window.cloudinary) {
      console.error("Cloudinary widget not loaded");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: "hr-management/avatars",
        resourceType: "image",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Upload Widget Error:", error);
          return;
        }
        // only handle the final successful event
        if (result.event === "success") {
          console.log("🔥 Cloudinary upload success:", result.info);
          setAvatarUrl(result.info.secure_url);
        }
      }
    );

    widget.open();
  }

  // 3️⃣ Submit to your API
  async function handleUpdate() {
    const payload = { name, email, avatarUrl };
    console.log("✏️ PATCH /api/profile payload:", payload);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log("✅ Profile updated, refreshing...");
      router.refresh();
    } else {
      const text = await res.text();
      console.error("❌ Update failed:", text);
      alert("Update failed: " + text);
    }
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
      <p className="text-gray-400 mb-8">You are now on the Profile page.</p>

      <div className="max-w-md mx-auto bg-[#1A1A1A] p-6 rounded-xl ring-2 ring-orange-500">
        <h2 className="text-xl text-white mb-4">
          Welcome:
          <br />
          <span className="font-semibold">{session.user.name}</span>
        </h2>

        {/* Avatar Preview + Manual Widget Trigger */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              style={{
                width: 128,
                height: 128,
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid #f97316",
              }}
            />
          ) : (
            <Image
              src="/assets/icons/default-avatar.png"
              alt="default"
              width={128}
              height={128}
              className="rounded-full border-4 border-orange-500 object-cover"
            />
          )}

          <button
            onClick={openUploadWidget}
            className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full shadow-lg hover:bg-orange-600 cursor-pointer"
            title="Upload new avatar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l6 6H3v-6z"
              />
            </svg>
          </button>
        </div>

        {/* Name & Email */}
        <label className="block text-gray-400 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-[#111] border border-orange-500 rounded text-white focus:outline-none"
        />

        <label className="block text-gray-400 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-6 px-3 py-2 bg-[#111] border border-orange-500 rounded text-white focus:outline-none"
        />

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-orange-500 py-3 rounded text-white font-medium hover:bg-orange-600 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
