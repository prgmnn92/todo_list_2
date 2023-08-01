"use client";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { SafeProject, SafeUser } from "../types";
import useProjectModal from "../hooks/useProjectModal";

import ProjectListing from "./project/ProjectListing";

interface ProjectsProps {
  projectsWithUser: any[]; //TODO:SafeProjectWithUser error occurs but it works... check later
}

const statusOrder = {
  "In Progress": 1,
  "Not Started": 2,
  Complete: 3,
};

const ProjectOverview: React.FC<ProjectsProps> = ({ projectsWithUser }) => {
  const projectModal = useProjectModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold leading-7 text-black ">
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
      <ul role="list" className="pt-4 divide-y divide-gray-100">
        {projectsWithUser
          .sort(
            (a, b) =>
              //@ts-ignore
              statusOrder[a["project"].status] -
              //@ts-ignore
              statusOrder[b["project"].status]
          )
          .map((item: { project: SafeProject; user: SafeUser }) => {
            return (
              <ProjectListing
                key={item.project.id}
                project={item.project}
                user={item.user}
              />
            );
          })}
      </ul>
    </>
  );
};

export default ProjectOverview;
