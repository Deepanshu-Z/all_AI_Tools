import { db } from "@/config/db";
import { messagesTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { frameId, msgs } = await req.json();

  try {
    await db
      .insert(messagesTable)
      .values({
        frameId,
        message: msgs,
      })
      .onConflictDoUpdate({
        target: messagesTable.frameId, // unique constraint required
        set: { message: msgs },
      });

    return NextResponse.json({
      message: "msgs has been successfully updated.",
    });
  } catch (error) {
    return NextResponse.json({ message: "error on route.ts (Chats)", error });
  }
}
