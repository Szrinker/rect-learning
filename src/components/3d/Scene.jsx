import { useCallback } from "react";
import useStore from "../../store/useStore";
import Room from "./Room.jsx";
import ChairFactory from "./ChairFactory.jsx";

export default function Scene() {
  const objects = useStore((state) => state.objects);
  const addObject = useStore((state) => state.addObject);

  const addChair = useCallback((e) => {
    if (useStore.getState().isDragged) return;

    const { point, normal, object } = e.intersections[0];

    if (object.parent.type === "Scene") {
      addObject({
        id: crypto.randomUUID(),
        model: "../../assets/chair.glb",
        position: point,
      });
    }
  }, []);

  return (
    <>
      <axesHelper />

      <Room floorClicker={addChair} />

      {objects.map((chair) => (
        <ChairFactory chairObj={chair} />
      ))}
    </>
  );
}
