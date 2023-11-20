import {useCallback, useEffect} from 'react';
import useStore from "../../store/useStore";
import Room from "./Room.jsx";
import FurnitureFactory from "./FurnitureFactory.jsx";
import Lines from './Lines.jsx';

export default function Scene() {
  const factory = useStore((state) => state.factory);
  const objects = useStore((state) => state.objects);
  const addObject = useStore((state) => state.addObject);
  const model = useStore((state) => state.model);
  const setActiveId = useStore((state) => state.setActiveId);
  const setActiveWall = useStore((state) => state.setActiveWall);
  const activeId = useStore((state) => state.activeId);
  const activeWall = useStore((state) => state.activeWall);

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

    if (object.parent.type === "Scene") {
      addObject({
        id: id,
        model: `/assets/${model}.glb`,
        position: point,
        name: id.split("-").pop().slice(-5),
        width: 1,
        height: 1,
        depth: 1,
      });
    }
  }, [model, factory, activeId]);

  return (
    <>
      <axesHelper />
      {/*<Lines />*/}
      <Room
        floorClicker={addChair}
        key="room"
      />

      {objects.map((furniture) => (
          <FurnitureFactory furnitureObj={furniture} key={`cf-${furniture?.id}`} />
      ))}
    </>
  );
}
