"use client";
import { useState } from "react";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserSelect from "../UserSelect";

interface UserSelectProps {
  users: SafeUser[];
  projectId: string;
  addedUserList: string[];
}

const ProjectUserSelect: React.FC<UserSelectProps> = ({
  users,
  projectId,
  addedUserList,
}) => {
  //@ts-ignore TODO: users can be null
  const [selected, setSelected] = useState(users[0]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addUser = () => {
    try {
      setIsLoading(true);
      axios
        .put(`/api/project/${projectId}`, { userId: selected.id })
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

  const removeUser = () => {
    try {
      setIsLoading(true);
      axios
        .put(`/api/project/${projectId}`, {
          userId: selected.id,
          isRemoveUser: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            router.refresh();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          toast.success(`Succesfully removed ${selected.name} from project`);
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
      addedUserList={addedUserList}
      removeUserAction={removeUser}
    />
  );
};

export default ProjectUserSelect;
