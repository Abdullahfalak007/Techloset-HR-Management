"use client";

import { SessionProvider } from "next-auth/react";
import StoreProvider from "../StoreProvider";
import { ThemeProvider } from "@/constants/theme/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <ThemeProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
