import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, projectId, description, dueAt } = body;

  const task = await prisma.task.create({
    data: {
      name,
      description,
      projectId,
      dueAt: new Date(dueAt.endDate) || null,
      userIds: [currentUser.id],
    },
  });

  return NextResponse.json(task);
}
