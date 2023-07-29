"use client";

import React from "react";

import axios from "axios";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import ImageUpload from "../inputs/ImageUpload";
import useTaskModal from "@/app/hooks/useTaskModal";
import { useRouter } from "next/navigation";

interface TaskModalProps {
  projectId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ projectId }) => {
  const taskModal = useTaskModal();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      .post("/api/task", { projectId, ...data })
      .then(() => {
        taskModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create a task" subtitle="Add a new task to you project" />
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
      isOpen={taskModal.isOpen}
      title="Create Project"
      actionLabel="Create"
      onClose={taskModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default TaskModal;
