// // // src/app/api/employees/me/route.ts
// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "../../auth/[...nextauth]/route";
// // import prisma from "@/lib/prisma";

// // export async function GET() {
// //   const session = await getServerSession(authOptions);
// //   if (!session?.user?.email) {
// //     return NextResponse.json({ id: null });
// //   }

// //   const emp = await prisma.employee.findFirst({
// //     where: { accounts: { email: session.user.email } },
// //     select: { id: true },
// //   });
// //   return NextResponse.json({ id: emp?.id ?? null });
// // }

// // src/app/api/employees/me/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import prisma from "@/lib/prisma";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET() {
//   // 1) Ensure user is signed in
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return NextResponse.json({ id: null });
//   }

//   // 2) Find the Employee record whose accounts.email matches
//   const employee = await prisma.employee.findFirst({
//     where: { accounts: { email: session.user.email } },
//     select: { id: true },
//   });

//   // 3) Return { id } or { id: null } if not found
//   return NextResponse.json({ id: employee?.id ?? null });
// }

// src/app/api/employees/me/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  // 1) Get NextAuth session
  const session = await getServerSession(authOptions);
  const yourEmail = session?.user?.email;
  if (!yourEmail) {
    return NextResponse.json({ id: null });
  }

  try {
    // 2) Fetch id + both embedded emails for all employees
    const list = await prisma.employee.findMany({
      select: {
        id: true,
        accounts: { select: { email: true } },
        personalInfo: { select: { email: true } },
      },
    });

    // 3) Find the record with either matching email
    const me = list.find(
      (e: {
        id: string;
        accounts: { email: string };
        personalInfo: { email: string };
      }) => e.accounts.email === yourEmail || e.personalInfo.email === yourEmail
    );

    return NextResponse.json({ id: me?.id ?? null });
  } catch (err) {
    console.error("[me] error:", err);
    return NextResponse.json({ id: null });
  }
}
