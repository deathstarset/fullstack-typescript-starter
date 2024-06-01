import { create } from "zustand";

type NavState = {
  sideOpen: boolean;
};
type NavActions = {
  closeSide: () => void;
  openSide: () => void;
};
export const useNavStore = create<NavState & NavActions>((set) => ({
  sideOpen: false,
  closeSide: () => {
    set(() => ({ sideOpen: false }));
  },
  openSide: () => {
    set(() => ({ sideOpen: true }));
  },
}));
