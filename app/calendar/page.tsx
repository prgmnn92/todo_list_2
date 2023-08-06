import getTasksForCurrentUser from "../actions/getTasksForCurrentUser";
import Calendar from "../components/Calendar";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";

export default async function Page() {
  const tasks = await getTasksForCurrentUser();

  if (!tasks) {
    return (
      <main className="py-10 lg:pl-72">
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      </main>
    );
  }

  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <Calendar tasks={tasks} />
      </Container>
    </main>
  );
}

export const dynamic = "force-dynamic"; //TODO: doesnt work static generated?
