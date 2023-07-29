import getProjects from "../actions/getProjects";
import Container from "../components/Container";
import Projects from "../projects";

export default async function Page() {
  const projectsWithUser = await getProjects();

  return (
    <main className="py-10 lg:pl-72">
      <Container>
        <Projects projectsWithUser={projectsWithUser} />
      </Container>
    </main>
  );
}
