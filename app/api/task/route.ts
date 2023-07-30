import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, projectId, description } = body;

  const task = await prisma.task.create({
    data: {
      name,
      description,
      projectId,
    },
  });

  return NextResponse.json(task);
}
