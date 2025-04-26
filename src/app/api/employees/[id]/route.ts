// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = params.id;
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

//     const updatedEmployee = await prisma.employee.update({
//       where: { id },
//       data: {
//         ...employee,
//         personalInfo: { ...personalInfo },
//         professional: { ...professionalInfo },
//         documents: { ...documents },
//         accounts: { ...accountLinks },
//       },
//     });

//     return NextResponse.json(updatedEmployee, { status: 200 });
//   } catch (error) {
//     console.error("[EMPLOYEE_PATCH]", error);
//     return NextResponse.json(
//       { message: "Failed to update employee" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/employees/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.employee.delete({
      where: { id: params.id },
    });
    return NextResponse.json(
      { message: "Employee deleted", deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("[EMPLOYEE_DELETE]", error);
    return NextResponse.json(
      { message: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
