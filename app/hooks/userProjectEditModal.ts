import { create } from "zustand";

interface ProjectEditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProjectEditModal = create<ProjectEditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProjectEditModal;
