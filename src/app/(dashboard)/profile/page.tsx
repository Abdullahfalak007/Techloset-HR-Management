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
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchMyProfile, updateMyProfile } from "@/store/slices/userSlice";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((s) => s.users.me);
  const loading = useAppSelector((s) => s.users.loading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!me && session?.user) {
      dispatch(fetchMyProfile());
    } else if (me) {
      setName(me.name || "");
      setEmail(me.email || "");
      setAvatarUrl(me.image || "");
    }
  }, [me, session]);

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
        if (result.event === "success") {
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  }

  async function handleUpdate() {
    await dispatch(updateMyProfile({ name, email, avatarUrl }));
    router.refresh();
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
