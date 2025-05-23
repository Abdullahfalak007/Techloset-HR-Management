// "use client";

// import Sidebar from "@/components/layout/Sidebar";
// import Navbar from "@/components/layout/Navbar";
// import { useDashboardLayout } from "./useDashboardLayout";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { loading, session, title, subtitle } = useDashboardLayout();

//   if (loading) return null;
//   // at this point, `useDashboardLayout` has already redirected
//   if (!session) return null;

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Navbar title={title} subtitle={subtitle} />
//         <main className="flex-1 p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useDashboardLayout } from "./useDashboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, session, title, subtitle } = useDashboardLayout();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading || !session) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* off-canvas sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen((o) => !o)}
        />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
