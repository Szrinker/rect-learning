import {useCallback, useEffect} from 'react';
import useStore from "../../store/useStore";
import Room from "./Room.jsx";
import FurnitureFactory from "./FurnitureFactory.jsx";
import { Text, Line } from "@react-three/drei";

export default function Scene() {
  const roomSize = useStore((state) => state.roomSize());
  const { objects, addObject, wallThickness, model, setActiveId } = useStore();

  const halfX = roomSize.width / 2;
  const halfY = roomSize.height / 2;
  const halfZ = roomSize.depth / 2;

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') {
        setActiveId(null);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  }, []);

  const addChair = useCallback((e) => {
    if (useStore.getState().isDragged) return;

    const { point, normal, object } = e.intersections[0];
    const id = crypto.randomUUID();

    if (object.parent.type === "Scene") {
      addObject({
        id: id,
        model: `/assets/${model}.glb`,
        position: point,
        name: id.split("-").pop().slice(-5),
        width: 1,
      });
    }
  }, [model]);

  return (
    <>
      <axesHelper />

      <Room floorClicker={addChair} key="room"/>

      <group key="line1">
        <Line
          points={[
            [-halfX, -0.4, halfZ + wallThickness + 0.4],
            [halfX, -0.4, halfZ + wallThickness + 0.4],
          ]}
          color="white"
          dashed={false}
          lineWidth={3}
        />
        <Text
          position={[0, -0.4, halfZ + wallThickness + 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="top"
        >
          {roomSize.width} m
        </Text>
      </group>

      <group key="line2">
        <Line
          points={[
            [-halfX - wallThickness - 0.4, 0, halfZ + wallThickness + 0.4],
            [-halfX - wallThickness - 0.4, roomSize.height, halfZ + wallThickness + 0.4],
          ]}
          color="white"
          dashed={false}
          lineWidth={3}
        />
        <Text
          position={[-halfX - wallThickness - 0.4, halfY, halfZ + wallThickness + 0.4]}
          rotation={[0, 0, Math.PI / 2]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {roomSize.height} m
        </Text>
      </group>

      <group key="line3">
        <Line
          points={[
            [-halfX - wallThickness - 0.4, -0.4, -halfZ],
            [-halfX - wallThickness - 0.4, -0.4, halfZ],
          ]}
          color="white"
          dashed={false}
          lineWidth={3}
        />
        <Text
          position={[-halfX - wallThickness - 0.5, -0.4, halfZ - wallThickness - 0.4]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          fontSize={0.25}
          color="red"
          anchorX="center"
          anchorY="top"
        >
          {roomSize.depth} m
        </Text>
      </group>

      {objects.map((furniture) => (
        <FurnitureFactory furnitureObj={furniture} key={`cf-${furniture?.id}`} />
      ))}
    </>
  );
}
