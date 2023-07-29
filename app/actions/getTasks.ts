import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getTasks(projectId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw Error("You need to be logged in to fetch tasks");
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeTasks = tasks.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      dueAt: task.dueAt?.toISOString() || null,
    }));

    return safeTasks;
  } catch (error: any) {
    throw new Error(error);
  }
}
