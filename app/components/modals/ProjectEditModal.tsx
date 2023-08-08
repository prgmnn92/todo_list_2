"use client";

import React from "react";

import axios from "axios";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeProject, SafeUser } from "@/app/types";
import UserSelectProject from "../project/UserSelect";
import useProjectEditModal from "@/app/hooks/userProjectEditModal";

interface ProjectEditModalProps {
  project: SafeProject;
  users: SafeUser[];
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  users,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const projectEditModal = useProjectEditModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: project.name || "",
      description: project.description || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/project/${project.id}`, data)
      .then(() => {
        projectEditModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          router.refresh();
        }, 300);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* TODO: filter users that are already added */}
      <UserSelectProject users={users} projectId={project.id} />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={projectEditModal.isOpen}
      title="Update your project"
      actionLabel="Update"
      onClose={projectEditModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ProjectEditModal;
