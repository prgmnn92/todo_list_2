import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";
import getProject from "./getProject";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUsersForProject(projectId: string) {
  try {
    const session = await getSession();
    const currentProject = await getProject(projectId);

    if (!session?.user?.email) {
      return null;
    }

    const userList = await prisma.user.findMany({
      where: {
        id: {
          in: [...(currentProject.userIds || [])],
        },
      },
    });

    if (!userList) {
      return null;
    }

    return userList;
  } catch (error: any) {
    return null;
  }
}
