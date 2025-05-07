// File: src/types/types.ts
import { DefaultSession } from "next-auth";

// -----------------------
// Augment NextAuth types
// -----------------------

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      id: string;
    };
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
    id?: string;
  }
}

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  type: string;
  status: string;
  gender?: string;
  maritalStatus?: string;
  avatar?: string;
  createdAt: string;
}
