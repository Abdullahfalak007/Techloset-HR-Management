// // File: src/app/api/auth/forgot-password/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { message: "Email is required" },
//         { status: 400 }
//       );
//     }

//     // Try to find the user with the provided email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     // For security reasons, always return a success message whether or not
//     // a user with the provided email exists.
//     if (!user) {
//       return NextResponse.json({
//         message:
//           "If a matching account was found, an OTP has been sent to your email.",
//       });
//     }

//     // Generate a random 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // In production:
//     //   - Save the OTP along with a timestamp (for expiration) in the database (or a dedicated table)
//     //   - Send the OTP to the user's email using an email service (e.g., SendGrid, Nodemailer, etc.)
//     // For demonstration, we log the OTP to the console.
//     console.log(`OTP for ${email}: ${otp}`);

//     // Optionally, update user data to store OTP info (make sure your schema supports it)
//     // For example, if you had additional fields in your User model like otp and otpExpiresAt:
//     // await prisma.user.update({
//     //   where: { email },
//     //   data: {
//     //     otp: otp,
//     //     otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // valid for 10 minutes
//     //   },
//     // });

//     return NextResponse.json({
//       message: "OTP has been sent to your email.",
//       // Remove or comment out the next line in production.
//       otp, // For testing only.
//     });
//   } catch (error) {
//     console.error("Forgot Password Error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transporter } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({
        message:
          "If a matching account was found, an OTP has been sent to your email.",
      });
    }

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Update user record with OTP info
    await prisma.user.update({
      where: { email },
      data: {
        otp: otp,
        otpExpiresAt: otpExpiresAt,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "OTP has been sent to your email.",
      // Do not return the OTP in production:
      otp, // For testing only.
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
