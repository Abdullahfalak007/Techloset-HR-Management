import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
  });
  if (!employee)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await prisma.employee.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.employee.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
