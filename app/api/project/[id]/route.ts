import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProject from "@/app/actions/getProject";

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
  const { status, userId, description, isRemoveUser } = body;

  const currentProject = await getProject(params.id || "");

  let updateData = {};

  let userIds = [...(currentProject.userIds || [])];

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

  if (description) {
    updateData = {
      ...updateData,
      description,
    };
  }

  if (status) {
    updateData = {
      ...updateData,
      status,
    };
  }
  if (userId) {
    updateData = {
      ...updateData,
      userIds,
    };
  }

  const project = await prisma.project.update({
    where: {
      id: params.id,
    },
    data: {
      ...updateData, //TODO: only update if id is not already included
    },
  });

  return NextResponse.json(project);
}
