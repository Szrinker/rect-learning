import {Line, Text} from '@react-three/drei';

import useStore from 'store/useStore';

export default function Lines() {
  const roomSize = useStore((state) => state.roomSize());
  const wallThickness = useStore((state) => state.wallThickness);
  const halfX = roomSize.width / 2;
  const halfY = roomSize.height / 2;
  const halfZ = roomSize.depth / 2;

  return (
    <>
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
    </>
  );
}
