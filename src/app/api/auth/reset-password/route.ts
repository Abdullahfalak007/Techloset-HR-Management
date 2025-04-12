// src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Email and new password are required" },
        { status: 400 }
      );
    }

    // Look up the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user’s password and clear OTP fields (optional)
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiresAt: null,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
