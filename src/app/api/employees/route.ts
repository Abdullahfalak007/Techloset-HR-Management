// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const employees = await prisma.employee.findMany({
//       include: {
//         personalInfo: true,
//         professional: true,
//         documents: true,
//         accounts: true,
//       },
//     });
//     return NextResponse.json(employees);
//   } catch (error) {
//     console.error("[EMPLOYEES_GET]", error);
//     return NextResponse.json(
//       { message: "Failed to fetch employees" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const {
//       employee,
//       personalInfo,
//       professionalInfo,
//       documents,
//       accountLinks,
//     } = await req.json();

//     if (!employee || !personalInfo || !professionalInfo || !accountLinks) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const created = await prisma.$transaction(async (tx: typeof prisma) => {
//       const newEmployee = await tx.employee.create({
//         data: { ...employee },
//       });

//       await tx.personalInfo.create({
//         data: { ...personalInfo, employeeId: newEmployee.id },
//       });

//       await tx.professionalInfo.create({
//         data: { ...professionalInfo, employeeId: newEmployee.id },
//       });

//       await tx.documentSet.create({
//         data: { ...documents, employeeId: newEmployee.id },
//       });

//       await tx.accountLinks.create({
//         data: { ...accountLinks, employeeId: newEmployee.id },
//       });

//       return newEmployee;
//     });

//     return NextResponse.json(created, { status: 201 });
//   } catch (error) {
//     console.error("[EMPLOYEE_POST]", JSON.stringify(error, null, 2));
//     console.error(
//       "[EMPLOYEE_POST]",
//       error instanceof Error ? error.message : error
//     );

//     return NextResponse.json(
//       { message: "Failed to create employee" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    console.error("[EMPLOYEE_GET]", error);
    return NextResponse.json(
      { message: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const createdEmployee = await prisma.employee.create({
      data: {
        ...employee,
        personalInfo: { ...personalInfo },
        professional: { ...professionalInfo },
        documents: { ...documents },
        accounts: { ...accountLinks },
      },
    });

    return NextResponse.json(createdEmployee, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEE_POST]", error);
    return NextResponse.json(
      { message: "Failed to create employee" },
      { status: 500 }
    );
  }
}
