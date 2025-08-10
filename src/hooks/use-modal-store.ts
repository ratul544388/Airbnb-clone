import { create } from "zustand";

type ModalType =
  | "deleteProperty"
  | null;

type ModalData = {
  id?: string;
};

type UseModalStore = {
  type: ModalType;
  open: boolean;
  data?: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<UseModalStore>((set) => ({
  type: null,
  open: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, open: true, data }),
  onClose: () => set({ type: null, open: false, data: {} }),
}));
