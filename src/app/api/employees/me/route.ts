// src/app/api/employees/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ id: null });
  }

  const emp = await prisma.employee.findFirst({
    where: { accounts: { email: session.user.email } },
    select: { id: true },
  });
  return NextResponse.json({ id: emp?.id ?? null });
}
