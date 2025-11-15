import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { hash } from "bcryptjs";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, username, dob } = await req.json();
  try {
    const hashedPassword = await hash(password, 12);
    const findUsers = await db
      .select({ email: usersTable.email })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (findUsers[0]) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
    const newUser = await db.insert(usersTable).values({
      email,
      password: hashedPassword,
      username,
      dob,
      provider: "simple",
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
