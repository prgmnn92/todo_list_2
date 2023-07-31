import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";
import getUsers from "./getUsers";

export default async function getProjects() {
  try {
    const currentUser = await getCurrentUser();
    const users = await getUsers();

    if (!currentUser) {
      redirect("/");
      // throw Error("You need to be logged in to fetch projects");
    }

    const projects = await prisma.project.findMany({
      where: {
        userIds: { has: currentUser?.id },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProjects = projects.map((project) => {
      // const user = await prisma.user.findUnique({
      //   where: {
      //     id: project.creatorId,
      //   },
      // });

      const user = users?.find((user) => user.id === project.creatorId);

      return {
        project: {
          ...project,
          createdAt: project.createdAt.toISOString(),
          updatedAt: project.updatedAt.toISOString(),
          dueAt: project.dueAt?.toISOString() || null,
        },
        user: {
          ...user,
          createdAt: user?.createdAt.toISOString(),
          updatedAt: user?.updatedAt.toISOString(),
          emailVerified: user?.emailVerified?.toISOString() || null,
        },
      };
    });

    return safeProjects;
  } catch (error: any) {
    redirect("/");
  }
}
