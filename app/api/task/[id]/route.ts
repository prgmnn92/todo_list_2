import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getTask from "@/app/actions/getTask";

interface IParams {
  id?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const currentTask = await getTask(params.id || "");

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, status, dueAt, userId, isRemoveUser } = body;

  let userIds = [...(currentTask.userIds || [])];

  if (isRemoveUser) {
    userIds = userIds.filter((listId) => listId !== userId);
  } else {
    if (userIds.includes(userId)) {
      return NextResponse.json({
        message: "User ID is already included",
      });
    }
    userIds.push(userId);
  }

  let updateData = {};

  if (name) {
    updateData = { ...updateData, name };
  }
  if (status) {
    updateData = { ...updateData, status };
  }
  if (dueAt) {
    updateData = { ...updateData, dueAt: new Date(dueAt.endDate) }; //TODO: find better way to set due date
  }
  if (description) {
    updateData = { ...updateData, description };
  }
  if (userId) {
    updateData = {
      ...updateData,
      userIds,
    };
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
