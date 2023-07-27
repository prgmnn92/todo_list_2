import getProjects from "../actions/getProjects";
import Projects from "../projects";

export default async function Page() {
  const projects = await getProjects();
  return (
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">
        <Projects projects={projects} />
      </div>
    </main>
  );
}
