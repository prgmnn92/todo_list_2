import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getProject(projectId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw Error("You need to be logged in to fetch a project");
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw Error("Could not find project");
    }

    const safeProject = {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      dueAt: project.dueAt?.toISOString() || null,
    };

    return safeProject;
  } catch (error: any) {
    throw new Error(error);
  }
}
