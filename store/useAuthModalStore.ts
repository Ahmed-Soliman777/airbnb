import { create } from "zustand";

// interface for useModalStore
interface useModalStore {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;

  openLogin: () => void;
  openRegister: () => void;

  closeLogin: () => void;
  closeRegister: () => void;

  closeAll: () => void;
}

// creating new store for useAuthModal
export const useAuthModal = create<useModalStore>((set) => ({
  //intial state
  isLoginOpen: false,
  isRegisterOpen: false,

  openLogin: () =>
    set({
      isLoginOpen: true,
      isRegisterOpen: false,
    }),

  closeLogin: () =>
    set({
      isLoginOpen: false,
    }),

  openRegister: () =>
    set({
      isLoginOpen: false,
      isRegisterOpen: true,
    }),

  closeRegister: () =>
    set({
      isRegisterOpen: false,
    }),

  closeAll: () =>
    set({
      isLoginOpen: false,
      isRegisterOpen: false,
    }),
}));
    