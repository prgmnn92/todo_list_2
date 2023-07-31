import Image from "next/image";

import getProject from "@/app/actions/getProject";
import getTasks from "@/app/actions/getTasks";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import TaskModal from "@/app/components/modals/TaskModal";
import ProjectStatusMenu from "@/app/components/project/ProjectStatusMenu";
import AddTask from "@/app/components/task/AddTask";
import TaskListing from "@/app/components/task/TaskListing";

const statusOrder = {
  "In Progress": 1,
  "Not Started": 2,
  Complete: 3,
};

const statuses = {
  Complete: "text-green-400 bg-green-400/10 ring-green-500/10",
  "In Progress": "text-orange-600 bg-orange-50 ring-orange-500/10",
  "Not Started": "text-zinc-600 bg-zinc-50 ring-zinc-500/10",
  Error: "text-rose-400 bg-rose-400/10 ring-rose-500/10",
};

export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  const tasks = await getTasks(params.id);

  if (!project && !tasks) {
    return (
      <main className="py-10 lg:pl-72">
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      </main>
    );
  }

  return (
    <>
      <TaskModal projectId={params.id} />
      <main className="py-10 lg:pl-72">
        <Container>
          <Image
            height={200}
            width={200}
            className="inline-block object-cover w-12 h-12 mb-2 rounded-full"
            src={project.image || "/images/placeholder-image.jpg"}
            alt=""
          />

          <div className="flex flex-row justify-between">
            <Heading title={project.name} subtitle="Manage your tasks!" />
            <AddTask />
          </div>
          <div className="flex items-center justify-start pt-4">
            <p
              className={`
                ${
                  //@ts-ignore
                  statuses[project.status]
                } 
          rounded-md whitespace-nowrap mt-0.5 px-2.5 py-1 text-sm font-medium ring-1 ring-inset mr-2
        `}
            >
              {project.status}
            </p>
            <ProjectStatusMenu project={project} />
          </div>
          <div className="flex flex-row"></div>
          <ul role="list" className="pt-4 divide-y divide-gray-100">
            {tasks
              //@ts-ignore
              .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
              .map((task) => {
                return <TaskListing key={task.id} task={task} />;
              })}
          </ul>
        </Container>
      </main>
    </>
  );
}

export const dynamicParams = true;
