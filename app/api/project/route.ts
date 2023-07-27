import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { image, name } = body;

  const user = await prisma.project.create({
    data: {
      image,
      name,
      creatorId: currentUser.id,
    },
  });

  return NextResponse.json(user);
}
