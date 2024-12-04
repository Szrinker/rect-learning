import { Box3 } from "three";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createComputed } from "zustand-computed";

function shallowObjCompare(objA, objB) {
  for (let key in objA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

const computedState = createComputed((state) => ({
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
}));

// createComputed(computedState, '')

const useStore = create(
  devtools(
    computedState(
      (set, get, api) => ({
        scale: { x: 2.5, y: 1.4, z: 2.8 },
        defaultSize: 5,
        model: 'chair',
        wallThickness: 0.1,
        objects: [],
        activeId: null,
        isDragged: false,
        factory: false,
        desk: false,
        deskHeight: 0.72,
        deskMaxHeight: 1.8,
        furnitureResizer: false,
        activeWall: null,
        holedWalls: [],
        pdfScreens: [],
        projectId: null,
        setProjectId: (value) => set(() => ({projectId: value})),
        setProject: (value) => set(() => {
          // if (value) {
          //   const {scale, objects, holedWalls, wallThickness} = value;
          //
          //   state.scale.x = scale.x;
          //   state.scale.y = scale.y;
          //   state.scale.z = scale.z;
          //   state.wallThickness = wallThickness;
          //   state.objects = objects;
          //   state.holedWalls = holedWalls;
          // }
          return value;
        }),
        setFactory: (value) => set(() => ({factory: value})),
        setDesk: (value) => set(() => ({desk: value})),
        setDeskHeight: (value) => set(() => ({deskHeight: value})),
        setFurnitureResizer: (value) => set(() => ({furnitureResizer: value})),
        setScale: (value) => set(() => ({ scale: value })),
        setWallThickness: (value) => set(() => ({wallThickness: value})),
        addObject: (value) =>
          set((state) => ({ objects: [...state.objects, value] })),
        removeObject: (value) => set((state) => ({
          objects: state.objects.filter(obj => obj.id !== value)
        })),
        setActiveId: (value) => set(() => ({ activeId: value })),
        setIsDragged: (value) => set(() => ({ isDragged: value })),
        setModel: (value) => set(() => ({model: value})),
        resizeFurniture: (id, dimension, value) => set((state) => ({
          objects: state.objects.map((o) => o.id === id ? { ...o, [dimension]: Number(value) } : o),
        })),
        setActiveWall: (value) => set(() => ({ activeWall: value })),
        addHoledWalls: (value) => set((state) => ({ holedWalls: [...state.holedWalls, value] })),
        removeHole: (value) => set((state) => ({
          holedWalls: state.holedWalls.filter(w => w.name !== value)
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
        addPdfScreen: (value) => set((state) => {
          state.pdfScreens.push(value);
        }),
        emptyPdfScreen: (value) => set((state) => {
          state.pdfScreens.splice(value, 1);
        }),
      }),
    ),
    {
      name: "FurnitureFactory",
      serialize: true,
    }
  )
);

export default useStore;
