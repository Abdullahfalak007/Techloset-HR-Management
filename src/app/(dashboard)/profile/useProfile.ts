import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchMyProfile, updateMyProfile } from "@/store/slices/userSlice";

declare global {
  interface Window {
    cloudinary: any;
  }
}

export function useProfile() {
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
  }, [me, session, dispatch]);

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
      },
      (error: any, result: any) => {
        if (error) return console.error("Upload error:", error);
        if (result.event === "success") {
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  }

  const handleUpdate = async () => {
    await dispatch(updateMyProfile({ name, email, avatarUrl }));
    router.refresh();
  };

  return {
    session,
    loading,
    name,
    setName,
    email,
    setEmail,
    avatarUrl,
    openUploadWidget,
    handleUpdate,
  };
}
