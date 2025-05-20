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
//       <head>
//         {/* Load Cloudinary Upload Widget as early as possible */}
//         <Script
//           src="https://widget.cloudinary.com/v2.0/global/all.js"
//           strategy="beforeInteractive"
//         />
//       </head>
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
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        {/* Load Cloudinary Upload Widget early */}
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <SessionProvider>
          <StoreProvider>
            <ThemeProvider>
              {children}
              <ToastContainer position="top-right" autoClose={3000} />
            </ThemeProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
