import React from 'react';
import Wall from './Wall.jsx';
import Floor from './Floor.jsx';
import Light from './Light.jsx';
import useStore from '../../store/useStore';

export default function Room({ wallClicker, floorClicker }) {
  const scale = useStore((state) => state.scale);
  // const textureUrl =
  //   'https://github.com/Szrinker/rect-learning/blob/main/public/assets/wood.jpg';
  const wallHeight = 2;
  const floorSize = 5;
  const halfX = (scale.x * floorSize) / 2;
  const halfY = wallHeight / 2;
  const halfZ = (scale.y * floorSize) / 2;
  const texRepeatX = scale.x;
  const texRepeatY = scale.y;
  const walls = [
    {
      position: [0, halfY, -halfZ],
      rotation: [0, 0, 0],
      color: 'red',
      width: scale.x * floorSize,
    },
    {
      position: [-halfX, halfY, 0],
      rotation: [0, Math.PI / 2, 0],
      color: 'green',
      width: scale.y * floorSize,
    },
    {
      position: [0, halfY, halfZ],
      rotation: [0, Math.PI, 0],
      color: 'blue',
      width: scale.x * floorSize,
    },
    {
      position: [halfX, halfY, 0],
      rotation: [0, -Math.PI / 2, 0],
      color: 'yellow',
      width: scale.y * floorSize,
    },
  ];

  return (
    <>
      <Light castShadow={true} position={[0, 0.8, 0]} />
      {walls.map((wall, idx) => (
        <Wall
          key={idx}
          rotation={wall.rotation}
          position={wall.position}
          color={wall.color}
          width={wall.width}
          height={wallHeight}
          onClick={wallClicker}
        />
      ))}
      <Floor
        rotation={[-Math.PI / 2, 0, 0]}
        color="orange"
        width={scale.x * floorSize}
        height={scale.y * floorSize}
        position={[0, 0, 0]}
        castShadow={true}
        // textureUrl={textureUrl}
        textureRepeatX={texRepeatX}
        textureRepeatY={texRepeatY}
        onClick={floorClicker}
      />
    </>
  );
}
