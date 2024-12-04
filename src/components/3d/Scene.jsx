import React, { useCallback, useEffect } from 'react';
import useStore from "store/useStore";
import Room from "components/3d/Room";
import FurnitureFactory from "components/3d/FurnitureFactory";
// import FurnitureFactoryPhysics from "components/3d/FurnitureFactoryPhysics";
import Desk from "components/3d/Desk";

export default function Scene() {
  const factory = useStore((state) => state.factory);
  const desk = useStore((state) => state.desk);
  const deskHeight = useStore((state) => state.deskHeight);
  const deskMaxHeight = useStore((state) => state.deskMaxHeight);
  const objects = useStore((state) => state.objects);
  const addObject = useStore((state) => state.addObject);
  const model = useStore((state) => state.model);
  const setActiveId = useStore((state) => state.setActiveId);
  const setActiveWall = useStore((state) => state.setActiveWall);
  const activeId = useStore((state) => state.activeId);
  const activeWall = useStore((state) => state.activeWall);
  // const roomSize = useStore((state) => state.roomSize());
  // const directionalLightRef = useRef();
  // const directionalLightShadowCameraRef = useRef();
  // const roomRef = useRef();

  // useHelper(directionalLightRef, DirectionalLightHelper, 3, 'magenta');
  // useHelper(directionalLightShadowCameraRef, CameraHelper);
  // useHelper(roomRef, BoxHelper, 'cyan');

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') {
        setActiveId(null);
        setActiveWall(null);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  }, []);

  const addChair = useCallback((e) => {
    if (useStore.getState().isDragged) return;

    if (activeId) {
      setActiveId(null);
      return;
    }

    setActiveWall(null);

    if (!factory) return;


    const { point, normal, object } = e.intersections[0];
    const id = crypto.randomUUID();

    addObject({
      id: id,
      model: `/assets/${model}.glb`,
      position: point.toArray(),
      name: id.split("-").pop().slice(-5),
      width: 1,
      height: 1,
      depth: 1,
    });
  }, [model, factory, activeId]);

  // useEffect(() => {
  //   console.log(
  //     roomRef.current,
  //   );
  // }, [roomRef]);

  return (
    <>
      <axesHelper/>
      {/*<Lines />*/}

      <Room
        // ref={roomRef}
        floorClicker={addChair}
        key="room"
      >
        {objects.map((furniture) => (
          <FurnitureFactory
            furnitureObj={furniture}
            key={`cf-${furniture?.id}`}
          />
          // <FurnitureFactoryPhysics
          //   furnitureObj={furniture}
          //   key={`cf-${furniture?.id}`}
          // />
        ))}
        {desk && (
          <Desk
            position={[0, 0, 0]}
            width={1.6}
            depth={0.8}
            maxHeight={deskMaxHeight}
            height={deskHeight}
            legWidth={0.4}
            legDepth={0.4}
            extrudeSettingsTop={{
              steps: 1,
              depth: 0.04, //thickness
              bevelThickness: 0.009,
              bevelSize: 0.04,
              bevelOffset: 0,
              bevelSegments: 10
            }}
            extrudeSettingsLeg={{
              steps: 1,
              depth: deskHeight -0.02, //thickness
              bevelThickness: 0,
              bevelSize: 0.04,
              bevelOffset: 0,
              bevelSegments: 10
            }}
          />
        )}
      </Room>
    </>
  );
}
