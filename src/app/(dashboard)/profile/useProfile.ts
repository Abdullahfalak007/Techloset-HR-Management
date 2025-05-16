import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetchMyProfile, updateMyProfile } from "@/store/slices/userSlice";

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
      (error, result) => {
        if (error) return console.error("Upload error:", error);
        const uploadResult = result as {
          event: string;
          info: { secure_url: string };
        };
        if (uploadResult.event === "success") {
          setAvatarUrl(uploadResult.info.secure_url);
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
