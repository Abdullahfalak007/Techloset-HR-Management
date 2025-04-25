import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error("[EMPLOYEES_GET]", error);
    return NextResponse.json(
      { message: "Error fetching employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, employeeId, department, designation, type, status, avatar } =
      body;

    if (
      !name ||
      !employeeId ||
      !department ||
      !designation ||
      !type ||
      !status
    ) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        employeeId,
        department,
        designation,
        type,
        status,
        avatar,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEE_POST]", error);
    return NextResponse.json(
      { message: "Failed to create employee" },
      { status: 500 }
    );
  }
}
