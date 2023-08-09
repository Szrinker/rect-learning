import { Box3 } from "three";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { computed } from "zustand-computed";

function shallowObjCompare(objA, objB) {
  for (let key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

const computedState = (state) => ({
  bbox: () => {
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
  // scaleFurniture: (id, value) => {
  //   const {objects} = state;
  //
  //   objects.map(i => {
  //     if(i.id === id) {
  //       return {...i, width: Number(value)};
  //     }
  //
  //     return i;
  //   });
  //
  //   return objects;
  // },
  roomSize: (function () {
    let prevRoomSize = { width: 0, height: 0, depth: 0 };

    return () => {
      const { defaultSize, scale } = state;
      const roomSize = {
        width: scale.x * defaultSize,
        height: scale.y * (defaultSize / 2),
        depth: scale.z * defaultSize,
      };

      if (shallowObjCompare(prevRoomSize, roomSize)) {
        return prevRoomSize;
      } else {
        prevRoomSize = roomSize;
        return roomSize;
      }
    };
  })()
})

const useStore = create(
  devtools(
    computed(
      (set, get) => ({
        scale: { x: 1, y: 1, z: 1 },
        defaultSize: 5,
        model: 'chair',
        wallThickness: 0.5,
        objects: [],
        activeId: null,
        isDragged: false,
        setScale: (value) => set((state) => ({ scale: value })),
        setWallThickness: (value) => set((state) => ({wallThickness: value})),
        addObject: (value) =>
          set((state) => ({ objects: [...state.objects, value] })),
        setActiveId: (value) => set((state) => ({ activeId: value })),
        setIsDragged: (value) => set((state) => ({ isDragged: value })),
        setModel: (value) => set((state) => ({model: value})),
        scaleFurniture: (id, value) => set((state) => ({
          objects: state.objects.map((o) => o.id === id ? { ...o, width: Number(value) } : o),
        })),
      }),
      computedState,
    ),
    {
      name: "FurnitureFactory",
      serialize: true,
    }
  )
);

export default useStore;
