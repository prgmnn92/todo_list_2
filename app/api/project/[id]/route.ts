import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const task = await prisma.project.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const { status } = body;

  const project = await prisma.project.update({
    where: {
      id: params.id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(project);
}
