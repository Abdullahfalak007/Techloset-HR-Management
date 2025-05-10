"use client";

import Image from "next/image";
import { useProfile } from "./useProfile";

export default function ProfilePage() {
  const {
    session,
    loading,
    name,
    setName,
    email,
    setEmail,
    avatarUrl,
    openUploadWidget,
    handleUpdate,
  } = useProfile();

  if (!session?.user || loading) return null;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
        Profile
      </h1>
      <p className="text-[var(--text-secondary)] mb-8">
        You are now on the Profile page.
      </p>

      <div className="max-w-md mx-auto bg-[var(--container-bg)] p-6 rounded-xl ring-2 ring-[var(--accent)]">
        <h2 className="text-xl text-[var(--text-primary)] mb-4">
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
                border: "4px solid var(--accent)",
              }}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <Image
              src="/assets/icons/default-avatar.png"
              alt="default"
              width={128}
              height={128}
              className="w-8 h-8 rounded-full border-4 border-[var(--accent)] object-cover"
            />
          )}
          <button
            onClick={openUploadWidget}
            className="absolute bottom-0 right-0 bg-[var(--accent)] p-2 rounded-full shadow-lg hover:bg-[var(--accent-hover)] cursor-pointer"
            title="Upload new avatar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[var(--button-text)]"
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

        <label className="block text-[var(--text-secondary)] mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 bg-[var(--surface)] border border-[var(--accent)] rounded text-[var(--text-primary)] focus:outline-none"
        />

        <label className="block text-[var(--text-secondary)] mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-6 px-3 py-2 bg-[var(--surface)] border border-[var(--accent)] rounded text-[var(--text-primary)] focus:outline-none"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-[var(--accent)] py-3 rounded text-[var(--button-text)] font-medium hover:bg-[var(--accent-hover)] transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
