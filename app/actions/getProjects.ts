import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";

export default async function getProjects() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      redirect("/");
      // throw Error("You need to be logged in to fetch projects");
    }

    const projects = await prisma.project.findMany({
      where: {
        creatorId: currentUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser?.id,
      },
    });

    const safeProjects = projects.map((project) => {
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
    throw new Error(error);
  }
}
