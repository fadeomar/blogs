import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password, name, image } = await req.json();

    // 🔍 Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // 🔒 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📝 Create the new user in the database
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name, image },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
