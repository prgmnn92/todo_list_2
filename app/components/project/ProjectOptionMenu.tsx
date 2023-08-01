"use client";
import React from "react";
import OptionMenu from "../OptionMenu";
import useProjectEditModal from "@/app/hooks/userProjectEditModal";

const ProjectOptionMenu = () => {
  const projectEditModal = useProjectEditModal();
  return (
    <OptionMenu firstAction={projectEditModal.onOpen} firstActionLabel="Edit" />
  );
};

export default ProjectOptionMenu;
