// File: src/types/types.ts
import { DefaultSession } from "next-auth";

// -----------------------
// Augment NextAuth types
// -----------------------

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  // Optionally, you can augment the User interface if you use it elsewhere:
  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
  }
}
