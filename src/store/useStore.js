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
        wallThickness: 0.1,
        objects: [],
        activeId: null,
        isDragged: false,
        factory: false,
        furnitureResizer: false,
        activeWall: null,
        holedWalls: [],
        projectId: null,
        setProjectId: (value) => set((state) => ({projectId: value})),
        setProject: (value) => set((state) => {
          if (value) {
            const {scale, objects, holedWalls, wallThickness} = value;

            state.scale.x = scale.x;
            state.scale.y = scale.y;
            state.scale.z = scale.z;
            state.wallThickness = wallThickness;
            state.objects = objects;
            state.holedWalls = holedWalls;
          }
        }),
        setFactory: (value) => set((state) => ({factory: value})),
        setFurnitureResizer: (value) => set((state) => ({furnitureResizer: value})),
        setScale: (value) => set((state) => ({ scale: value })),
        setWallThickness: (value) => set((state) => ({wallThickness: value})),
        addObject: (value) =>
          set((state) => ({ objects: [...state.objects, value] })),
        removeObject: (value) => set((state) => ({
          objects: state.objects.filter(obj => obj.id !== value)
        })),
        setActiveId: (value) => set((state) => ({ activeId: value })),
        setIsDragged: (value) => set((state) => ({ isDragged: value })),
        setModel: (value) => set((state) => ({model: value})),
        resizeFurniture: (id, dimension, value) => set((state) => ({
          objects: state.objects.map((o) => o.id === id ? { ...o, [dimension]: Number(value) } : o),
        })),
        setActiveWall: (value) => set((state) => ({ activeWall: value })),
        addHoledWalls: (value) => set((state) => ({ holedWalls: [...state.holedWalls, value] })),
        removeHole: (value) => set((state) => ({
          holedWalls: state.holedWalls.filter(w => w.id !== value)
        })),
        updateHole: (value) => set((state) => {
          let currentHoles = state.holedWalls.map((hd) =>
            hd.id === value.id ?
              value :
              hd
          );

          return {
            holedWalls: currentHoles
          }
        }),
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
