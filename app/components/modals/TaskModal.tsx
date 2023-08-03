"use client";

import React from "react";

import axios from "axios";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useTaskModal from "@/app/hooks/useTaskModal";
import { useRouter } from "next/navigation";
import Datepicker from "react-tailwindcss-datepicker";

interface TaskModalProps {
  projectId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ projectId }) => {
  const taskModal = useTaskModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      dueAt: "",
    },
  });

  const dueAt = watch("dueAt");

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
        toast.success("You've added a task");
        reset();
        setTimeout(() => {
          setIsLoading(false);
          router.refresh();
        }, 300);
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
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Datepicker
        primaryColor={"indigo"}
        useRange={false}
        inputClassName={
          "py-4 px-4 w-full border-[1px] border-solid border-black/20 rounded"
        }
        placeholder={"Pick a due date"}
        asSingle={true}
        onChange={(value) => setCustomValue("dueAt", value)}
        value={dueAt}
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
      title="Create a new Task"
      actionLabel="Create"
      onClose={taskModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default TaskModal;
