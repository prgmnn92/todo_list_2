import { create } from "zustand";
import { SafeTask } from "../types";

interface TaskEditModalStore {
  isOpen: boolean;
  task: SafeTask | undefined;
  onOpen: (task: SafeTask) => void;
  onClose: () => void;
}

const useTaskEditModal = create<TaskEditModalStore>((set) => ({
  isOpen: false,
  task: undefined,
  onOpen: (task) => set({ isOpen: true, task }),
  onClose: () => set({ isOpen: false, task: undefined }),
}));

export default useTaskEditModal;
