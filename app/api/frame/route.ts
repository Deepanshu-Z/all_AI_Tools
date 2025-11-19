import { db } from "@/config/db";
import { framesTable, messagesTable, projectsTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, frameId } = await req.json();
  try {
    const findProject = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId));
    if (!findProject) {
      const newProject = await db.insert(projectsTable).values({
        id: projectId,
        userId: 0,
      });

      const newFrame = await db.insert(framesTable).values({
        id: frameId,
        projectId,
      });
    } else {
      const frames = await db
        .select()
        .from(framesTable)
        .where(eq(framesTable.projectId, projectId));
      const msgs = await db
        .select()
        .from(messagesTable)
        .where(eq(messagesTable.frameId, frames[0].id));

      return NextResponse.json({ message: "Frame details returned.", msgs });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error in the route.ts (FRAMES) " });
  }
}
