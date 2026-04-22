import { create } from "zustand";

interface CreateModalListingModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateListingModal = create<CreateModalListingModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
