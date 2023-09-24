import getCurrentUser from "./actions/getCurrentUser";
import getTasksForCurrentUser from "./actions/getTasksForCurrentUser";
import Container from "./components/Container";
import LoginView from "./components/LoginView";
import TaskOverview from "./components/task/TaskOverview";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const tasks = await getTasksForCurrentUser();

  if (!currentUser) {
    return <LoginView />;
  }
  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <TaskOverview
          tasks={tasks.filter((task) => task.status !== "Complete")}
        />
        <ul>
          <li>show assigned tasks</li>
          <li>show 7 day calendar </li>
        </ul>
      </Container>
    </main>
  );
}
