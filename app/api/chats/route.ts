import { db } from "@/config/db";
import { messagesTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm"; // Import sql helper

export async function POST(req: NextRequest) {
  const { frameId, msgs } = await req.json();
  try {
    await db
      .update(messagesTable)
      .set({ message: msgs })
      .where(eq(messagesTable.frameId, frameId));

    return NextResponse.json({
      message: "msgs has been successfully updated.",
    });
  } catch (error) {
    return NextResponse.json({ message: "error on route.ts (Chats)", error });
  }
}
