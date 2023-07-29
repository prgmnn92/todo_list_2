import { Project, Task, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeProject = Omit<Project, "createdAt" | "updatedAt" | "dueAt"> & {
  createdAt: string;
  updatedAt: string;
  dueAt: string | null;
};

export type SafeProjectWithUser = {
  project: SafeProject;
  user: SafeUser;
};

export type SafeTask = Omit<Task, "createdAt" | "updatedAt" | "dueAt"> & {
  createdAt: string;
  updatedAt: string;
  dueAt: string | null;
};
