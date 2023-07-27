import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProjects() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw Error("You need to be logged in to fetch projects");
    }

    const projects = await prisma.project.findMany({
      where: {
        creatorId: currentUser?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeProjects = projects.map((project) => ({
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      dueAt: project.dueAt?.toISOString() || null,
    }));

    return safeProjects;
  } catch (error: any) {
    throw new Error(error);
  }
}
