"use client";
import React from "react";
import Button from "../Button";
import { AiOutlinePlus } from "react-icons/ai";
import useTaskModal from "@/app/hooks/useTaskModal";

const AddTask = () => {
  const taskModal = useTaskModal();

  return (
    <div>
      <Button
        label={"Add task"}
        icon={AiOutlinePlus}
        onClick={() => taskModal.onOpen()}
        small
      />
    </div>
  );
};

export default AddTask;
