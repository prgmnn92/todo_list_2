import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";

export default async function getTask(taskId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      redirect("/"); //TODO: error messages
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw Error("Could not find task");
    }

    const safeTask = {
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      dueAt: task.dueAt?.toISOString() || null,
    };

    return safeTask;
  } catch (error: any) {
    redirect("/");
  }
}
