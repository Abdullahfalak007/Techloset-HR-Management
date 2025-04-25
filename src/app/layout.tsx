// "use client";

// import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import StoreProvider from "@/app/StoreProvider";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           <StoreProvider>{children}</StoreProvider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx
"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "@/constants/theme/ThemeContext"; // ✅ updated path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StoreProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
