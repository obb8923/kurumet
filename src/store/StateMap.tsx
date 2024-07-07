import { create } from "zustand";
type storeState = {
  mapState: string;
};
type action = {
  actions: {
    changeState: (v: string) => void;
  };
};
const useStore = create<storeState & action>((set, get) => ({
  mapState: "지도",
  actions: {
    changeState: (v) => {
      set(() => {
        return { mapState: v };
      });
    },
  },
}));

export const useMapState = () => useStore((state) => state.mapState);
export const useActions = () => useStore((state) => state.actions);
