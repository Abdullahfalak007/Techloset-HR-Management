// // src/app/layout.tsx
// "use client";

// import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import StoreProvider from "./StoreProvider";
// import { ThemeProvider } from "@/constants/theme/ThemeContext"; // ✅ updated path
// import Head from "next/head";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <Head>
//         {/* Cloudinary Upload Widget */}
//         <script
//           src="https://widget.cloudinary.com/v2.0/global/all.js"
//           type="text/javascript"
//           async
//         ></script>
//       </Head>
//       <body>
//         <SessionProvider>
//           <StoreProvider>
//             <ThemeProvider>{children}</ThemeProvider>
//           </StoreProvider>
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
import { ThemeProvider } from "@/constants/theme/ThemeContext";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Load Cloudinary Upload Widget as early as possible */}
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="beforeInteractive"
      />
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
