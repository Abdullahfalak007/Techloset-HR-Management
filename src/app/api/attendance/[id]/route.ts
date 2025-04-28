// src/app/api/attendance/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const updated = await prisma.leave.update({
    where: { id: params.id },
    data: { status },
  });
  return NextResponse.json(updated);
}
