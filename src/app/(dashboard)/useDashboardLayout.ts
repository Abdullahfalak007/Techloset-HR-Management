import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useEffect } from "react";

export function useDashboardLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  const loading = status === "loading";

  const { title, subtitle } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return {
        title: "Dashboard",
        subtitle: "You are now on the Dashboard page.",
      };
    }
    const human = segments
      .map((seg) =>
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      )
      .join(" / ");
    return {
      title: human,
      subtitle: `You are now on the ${human} page.`,
    };
  }, [pathname]);

  return { loading, session, title, subtitle };
}
