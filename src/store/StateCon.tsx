import { create } from "zustand";
type storeState = {
  list: Set<string>;
  pushList: (item: string) => void;
  findList: (item: string) => boolean;
  popList: (item: string) => void;
};
const useStore = create<storeState>((set) => ({
  list: new Set(),
  pushList: (item) =>
    set((state) => {
      const tmpSet = new Set(state.list);
      tmpSet.add(item);
      return { list: tmpSet };
    }),
  findList: (item) => {
    const tmpState: storeState = useStore.getState();
    return tmpState.list.has(item);
  },
  popList: (item) =>
    set((state) => {
      const tmpSet = new Set(state.list);
      tmpSet.delete(item);
      return { list: tmpSet };
    }),
}));
