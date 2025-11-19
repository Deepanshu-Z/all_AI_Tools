import { db } from "@/config/db";
import { framesTable, messagesTable, projectsTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, msgs, frameId } = await req.json();

  try {
    const findProject = await db.insert(projectsTable).values({
      id: projectId,
      userId: 0,
      title: "Okk projects table",
    });

    const frame = await db.insert(framesTable).values({
      id: frameId,
      projectId,
      title: "HI TESTING!!",
    });

    const message = await db.insert(messagesTable).values({
      frameId: frameId,
      message: msgs,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Frame details returned." });
}
