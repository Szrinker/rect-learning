import { create } from 'zustand';

const useStore = create((set) => ({
  scale: { x: 1, y: 1, z: 1 },
  objects: [],
  activeId: null,
  setScale: (value) => set((state) => ({ scale: value })),
  addObject: (value) =>
    set((state) => ({ objects: [...state.objects, value] })),
  setActiveId: (value) => set((state) => ({ activeId: value })),
}));

export default useStore;
