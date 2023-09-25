import getCurrentUser from "./actions/getCurrentUser";
import getTasksForCurrentUser from "./actions/getTasksForCurrentUser";
import Calendar from "./components/Calendar";
import Container from "./components/Container";
import LoginView from "./components/LoginView";
import TaskOverview from "./components/task/TaskOverview";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const tasks = currentUser ? await getTasksForCurrentUser() : [];

  if (!currentUser) {
    return <LoginView />;
  }

  const uncompletedTasks = tasks.filter((task) => task.status !== "Complete");

  const getFirstName = (name: String) => {
    let splittedName = name?.split(" ");
    if (!splittedName) return name;
    if (splittedName?.length >= 2) return splittedName[0];
    return name;
  };

  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <h1 className="pb-4 text-2xl lg:text-4xl">
          Welcome {getFirstName(currentUser.name || "")}
        </h1>
        <h2 className="pt-4 text-2xl">Your week</h2>
        <Calendar tasks={tasks} isWeek />
        <h2 className="py-4 text-2xl">Task overview</h2>
        <TaskOverview tasks={uncompletedTasks} />
      </Container>
    </main>
  );
}
