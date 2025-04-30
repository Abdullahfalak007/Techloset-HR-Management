// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  // 1) make sure the user is signed in
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // 2) pull name, email, avatarUrl out of the request body
  const { name, email, avatarUrl } = await req.json();

  // 3) basic validation
  if (typeof name !== "string" || typeof email !== "string") {
    return NextResponse.json(
      { message: "Missing name or email" },
      { status: 400 }
    );
  }

  // 4) write to the database
  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      email,
      image: avatarUrl, // ← this is where avatarUrl goes
    },
  });

  // 5) return the updated user
  return NextResponse.json({ ok: true, user: updated });
}
