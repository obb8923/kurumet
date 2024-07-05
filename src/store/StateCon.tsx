import { create } from "zustand";
type storeState = {
  list: Set<string>;
};
type action = {
  actions: {
    pushList: (item: string) => void;
    findList: (item: string) => boolean;
    popList: (item: string) => void;
  };
};
const useStore = create<storeState & action>((set, get) => ({
  list: new Set(),
  actions: {
    pushList: (item) =>
      set((state) => {
        const tmpSet = new Set(state.list);
        tmpSet.add(item);
        return { list: tmpSet };
      }),
    findList: (item) => {
      return get().list.has(item);
    },
    popList: (item) =>
      set((state) => {
        const tmpSet = new Set(state.list);
        tmpSet.delete(item);
        return { list: tmpSet };
      }),
  },
}));

export const useList = () => useStore((state) => state.list);
export const useActions = () => useStore((state) => state.actions);
