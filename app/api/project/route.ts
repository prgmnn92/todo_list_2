import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { image, name, description } = body;

  const project = await prisma.project.create({
    data: {
      image,
      name,
      description,
      creatorId: currentUser.id,
      userIds: [currentUser.id],
    },
  });

  return NextResponse.json(project);
}
