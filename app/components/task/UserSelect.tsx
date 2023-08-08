"use client";
import { useState } from "react";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserSelect from "../UserSelect";

interface UserSelectProps {
  users: SafeUser[];
  taskId: string;
}

const UserSelectTask: React.FC<UserSelectProps> = ({ users, taskId }) => {
  //@ts-ignore TODO: users can be null
  const [selected, setSelected] = useState(users[0]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addUser = () => {
    try {
      setIsLoading(true);
      axios
        .put(`/api/task/${taskId}`, { userId: selected.id })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            router.refresh();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          toast.success(`Succesfully added ${selected.name} to project`);
          setIsLoading(false);
          // router.refresh();
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!users) {
    return <></>;
  }
  return (
    <UserSelect
      users={users}
      addUserAction={addUser}
      selectUser={setSelected}
      selectedUser={selected}
    />
  );
};

export default UserSelectTask;
