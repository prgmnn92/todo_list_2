"use client";
import Image from "next/image";
import Button from "./components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { SafeProject } from "./types";
import useProjectModal from "./hooks/useProjectModal";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  "Not started": "text-zinc-400 bg-zinc-400/10",
};

interface ProjectsProps {
  projects: SafeProject[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const getStatusValue = (status: keyof typeof statuses) => {
    return statuses[status];
  };

  const projectModal = useProjectModal();
  const router = useRouter();

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <h2 className="px-4 text-base font-semibold leading-7 text-black sm:px-6 lg:px-8">
          Projects Overview
        </h2>
        <div>
          <Button
            label={"Add project"}
            icon={AiOutlinePlus}
            onClick={() => projectModal.onOpen()}
            small
          />
        </div>
      </div>

      <table className="w-full mt-6 text-left whitespace-nowrap">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="text-sm leading-6 text-black border-b border-white/10">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              Project
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 font-semibold text-right sm:pr-8 sm:text-left lg:pr-20"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
            >
              Completion
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-4 font-semibold text-right sm:table-cell sm:pr-6 lg:pr-8"
            >
              Created at
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((project) => {
            const distance = formatDistance(
              new Date(project.createdAt),
              new Date(),
              {
                addSuffix: true,
              }
            );

            return (
              <tr
                key={project.name}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="cursor-pointer"
              >
                <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                  <div className="flex items-center gap-x-4">
                    <Image
                      src={project.image || ""}
                      alt=""
                      width={200}
                      height={200}
                      className="object-cover w-8 h-8 bg-gray-800 rounded-full"
                    />
                    <div className="text-sm font-medium leading-6 text-black truncate">
                      {project.name}
                    </div>
                  </div>
                </td>
                <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                  <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                    <time
                      className="text-gray-400 sm:hidden"
                      dateTime={project.createdAt}
                    >
                      {distance}
                    </time>
                    <div
                      className={`${
                        //@ts-ignore
                        getStatusValue(project.status)
                      } flex-none rounded-full p-1`}
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </div>
                    <div className="hidden text-black sm:block">
                      {project.status}
                    </div>
                  </div>
                </td>
                <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                  {project.status === "Not started" ? "0%" : "..."}
                </td>
                <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-right text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                  <time dateTime={project.createdAt}>{distance}</time>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
