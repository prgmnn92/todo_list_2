import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, status, dueAt } = body;

  let updateData = {};

  if (name) {
    updateData = { ...updateData, name };
  }
  if (status) {
    updateData = { ...updateData, status };
  }
  if (dueAt) {
    updateData = { ...updateData, dueAt };
  }
  if (description) {
    updateData = { ...updateData, description };
  }

  const task = await prisma.task.update({
    where: {
      id: params.id,
    },
    data: updateData,
  });

  return NextResponse.json(task);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const task = await prisma.task.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(task);
}
