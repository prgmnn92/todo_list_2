import getCurrentUser from "./actions/getCurrentUser";
import getTasksForCurrentUser from "./actions/getTasksForCurrentUser";
import Calendar from "./components/Calendar";
import Container from "./components/Container";
import LoginView from "./components/LoginView";
import TaskOverview from "./components/task/TaskOverview";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const tasks = await getTasksForCurrentUser();

  if (!currentUser) {
    return <LoginView />;
  }

  const uncompletedTasks = tasks.filter((task) => task.status !== "Complete");

  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <h2 className="pt-4 text-2xl">Your week</h2>
        <Calendar tasks={tasks} isWeek />
        <h2 className="py-4 text-2xl">Task overview</h2>
        <TaskOverview tasks={uncompletedTasks} />
      </Container>
    </main>
  );
}
