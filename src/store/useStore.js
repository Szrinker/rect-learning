import { Box3 } from "three";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(
    (set, get) => ({
      scale: { x: 1, y: 1, z: 1 },
      defaultSize: 5,
      objects: [],
      activeId: null,
      isDragged: false,
      setScale: (value) => set((state) => ({ scale: value })),
      addObject: (value) =>
        set((state) => ({ objects: [...state.objects, value] })),
      setActiveId: (value) => set((state) => ({ activeId: value })),
      setIsDragged: (value) => set((state) => ({ isDragged: value })),
      computed: {
        bbox: () => {
          const state = get();
          const { defaultSize, scale } = state;

          const roomSize = {
            width: scale.x * defaultSize,
            height: scale.y * defaultSize,
            depth: scale.z * defaultSize,
          };
          const bbox = new Box3();

          bbox.min.set(-roomSize.width / 2, 0, -roomSize.depth / 2);
          bbox.max.set(
            roomSize.width / 2,
            roomSize.height / 2,
            roomSize.depth / 2
          );

          return bbox;
        },
        roomSize: () => {
          const state = get();
          const { defaultSize, scale } = state;
          const roomSize = {
            width: scale.x * defaultSize,
            height: scale.y * (defaultSize / 2),
            depth: scale.z * defaultSize,
          };

          return roomSize;
        },
      },
    }),
    {
      name: "ChairFactory",
      serialize: true,
    }
  )
);

export default useStore;
