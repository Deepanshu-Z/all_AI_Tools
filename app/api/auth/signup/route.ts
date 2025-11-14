import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, username, dob } = await req.json();
  try {
    const hashedPassword = await hash(password, 12);
    const newUser = await db.insert(usersTable).values({
      email,
      password: hashedPassword,
      username,
      dob,
    });
    return NextResponse.json({
      message: "User Successfully Registered",
      status: 200,
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    return NextResponse.json({
      message: "Error creating user ",
      error,
      status: 500,
    });
  }
}
