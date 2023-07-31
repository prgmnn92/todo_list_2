import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUsers() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const userList = await prisma.user.findMany();

    if (!userList) {
      return null;
    }

    return userList;
  } catch (error: any) {
    return null;
  }
}
