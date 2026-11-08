import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModal = create<ModalStore>((set) => ({
  isOpen: true,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModal
