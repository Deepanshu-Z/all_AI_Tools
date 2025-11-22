import { db } from "@/config/db";
import { framesTable, messagesTable, projectsTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { projectId, frameId } = await req.json();
  const realProjectId = projectId.projectid;
  try {
    const findProject = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, realProjectId));

    if (findProject.length === 0) {
      const newProject = await db.insert(projectsTable).values({
        id: realProjectId,
        userId: 0,
      });

      const newFrame = await db.insert(framesTable).values({
        id: frameId,
        projectId: realProjectId,
      });

      const newMessage = await db.insert(messagesTable).values({
        frameId: frameId,
      });
      return NextResponse.json({ message: "Frame details updated" });
    } else {
      const frames = await db
        .select()
        .from(framesTable)
        .where(eq(framesTable.projectId, realProjectId));
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
