"use client";

import React from "react";

import axios from "axios";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useProjectModal from "@/app/hooks/useProjectModal";
import ImageUpload from "../inputs/ImageUpload";
import { useRouter } from "next/navigation";

const ProjectModal = () => {
  const projectModal = useProjectModal();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/project", data)
      .then(() => {
        projectModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        toast.success("You've added a project");
        reset();
        setTimeout(() => {
          setIsLoading(false);
          router.refresh();
        }, 300);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create a project" subtitle="Start a new project" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <ImageUpload
        onChange={(value) => setCustomValue("image", value)}
        value={image}
      />
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
      isOpen={projectModal.isOpen}
      title="Create Project"
      actionLabel="Create"
      onClose={projectModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ProjectModal;
