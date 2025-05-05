// GET all leaves (admin) + POST new leave (user)
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const leaves = await prisma.leave.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      employee: {
        select: {
          id: true,
          name: true,
          personalInfo: { select: { email: true } },
          accounts: { select: { email: true } },
          avatar: true,
        },
      },
    },
  });
  return NextResponse.json(leaves);
}

export async function POST(req: Request) {
  const { employeeId, reason, startDate, endDate } = await req.json();
  if (!employeeId || !reason || !startDate || !endDate) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const leave = await prisma.leave.create({
    data: {
      employeeId,
      reason,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: "PENDING",
    },
  });
  return NextResponse.json(leave, { status: 201 });
}
