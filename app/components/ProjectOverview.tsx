"use client";
import Button from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { SafeProject, SafeProjectWithUser, SafeUser } from "../types";
import useProjectModal from "../hooks/useProjectModal";

import ProjectListing from "./project/ProjectListing";

interface ProjectsProps {
  projectsWithUser: any[]; //TODO:SafeProjectWithUser error occurs but it works... check later
}

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
        {projectsWithUser.map(
          (item: { project: SafeProject; user: SafeUser }) => {
            return (
              <ProjectListing
                key={item.project.id}
                project={item.project}
                user={item.user}
              />
            );
          }
        )}
      </ul>
    </>
  );
};

export default ProjectOverview;
