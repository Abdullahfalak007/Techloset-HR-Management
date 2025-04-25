// File: src/app/api/employees/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/employees
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
