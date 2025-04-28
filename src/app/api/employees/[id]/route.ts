// src/app/api/employees/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ─── GET a single employee ─────────────────────────────────────────────────────
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
    });
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("[EMPLOYEE_GET_ONE]", error);
    return NextResponse.json(
      { message: "Failed to fetch employee" },
      { status: 500 }
    );
  }
}

// ─── PATCH (update) ────────────────────────────────────────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const {
      employee,
      personalInfo,
      professionalInfo,
      documents,
      accountLinks,
    } = await req.json();

    if (!employee || !personalInfo || !professionalInfo || !accountLinks) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        ...employee,
        personalInfo: { ...personalInfo },
        professional: { ...professionalInfo },
        documents: { ...documents },
        accounts: { ...accountLinks },
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("[EMPLOYEE_PATCH]", error);
    return NextResponse.json(
      { message: "Failed to update employee" },
      { status: 500 }
    );
  }
}

// ─── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    console.error("[EMPLOYEE_DELETE]", error);
    return NextResponse.json(
      { message: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
