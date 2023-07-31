import getProjects from "../actions/getProjects";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ProjectOverview from "../components/ProjectOverview";

export default async function Page() {
  const projectsWithUser = await getProjects();

  if (!projectsWithUser) {
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
        <ProjectOverview projectsWithUser={projectsWithUser} />
      </Container>
    </main>
  );
}

export const dynamic = "force-dynamic"; //TODO: doesnt work static generated?
