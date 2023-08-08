"use client";

import React from "react";

import axios from "axios";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeTask, SafeUser } from "@/app/types";
import Datepicker from "react-tailwindcss-datepicker";
import UserSelectTask from "../task/UserSelect";

interface TaskEditModalProps {
  task: SafeTask;
  isOpen: boolean;
  onClose: () => void;
  users: SafeUser[];
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  isOpen,
  onClose,
  users,
}) => {
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
      name: task.name || "",
      description: task.description || "",
      dueAt: {
        startDate: task.dueAt?.split("T")[0] || "",
        endDate: task.dueAt?.split("T")[0] || "",
      },
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
      .put(`/api/task/${task.id}`, data)
      .then(() => {
        onClose();
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
      <UserSelectTask users={users} taskId={task.id} />
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
      isOpen={isOpen}
      title="Update your Task"
      actionLabel="Update"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default TaskEditModal;
