import getProject from "@/app/actions/getProject";
import getTasks from "@/app/actions/getTasks";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import TaskModal from "@/app/components/modals/TaskModal";
import AddTask from "@/app/components/task/AddTask";

export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  const tasks = await getTasks(params.id);

  return (
    <>
      <TaskModal projectId={params.id} />
      <main className="py-10 lg:pl-72">
        <Container>
          <div className="flex flex-row justify-between">
            <Heading title={project.name} subtitle="Manage your tasks!" />
            <AddTask />
          </div>
        </Container>
      </main>
    </>
  );
}
