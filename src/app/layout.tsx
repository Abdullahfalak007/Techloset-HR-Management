// // src/app/layout.tsx
// "use client";

// import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import StoreProvider from "./StoreProvider";
// import { ThemeProvider } from "@/constants/theme/ThemeContext";
// import Script from "next/script";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       {/* Load Cloudinary Upload Widget as early as possible */}
//       <Script
//         src="https://widget.cloudinary.com/v2.0/global/all.js"
//         strategy="beforeInteractive"
//       />
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
      <head>
        {/* Load Cloudinary Upload Widget as early as possible */}
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
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
