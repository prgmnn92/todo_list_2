"use client";

import React from "react";

import axios from "axios";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUserModal from "@/app/hooks/useUserModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

interface UserModalProps {
  currentUser?: SafeUser | null;
}

const UserModal: React.FC<UserModalProps> = ({ currentUser }) => {
  const userModal = useUserModal();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put("/api/user/update", {
        id: currentUser?.id,
        ...data,
      })
      .then(() => {
        userModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    signOut();
    userModal.onClose();
    router.push("/");
  }, [userModal, router]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="User Settings" subtitle="Update your user informations" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button label="Sign Out" onClick={toggle} />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={userModal.isOpen}
      title="User Settings"
      actionLabel="Save"
      onClose={userModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default UserModal;
