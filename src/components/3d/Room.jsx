import React, { useRef } from 'react';
import Wall from './Wall.jsx';
import ThickWall from './ThickWall.jsx';
import Floor from './Floor.jsx';
import Light from './Light.jsx';
import useStore from '../../store/useStore';
import {useFrame, useThree} from "@react-three/fiber";

export default function Room({ wallClicker, floorClicker }) {
  const scale = useStore((state) => state.scale);
  const textureUrl = 'assets/wood.jpg?url';
  const roomSize = useStore((state) => state.roomSize());
  const wallThickness = useStore((state) => state.wallThickness);

  const wallHeight = roomSize.height;
  const halfX = roomSize.width / 2;
  const halfY = wallHeight / 2;
  const halfZ = roomSize.depth / 2;

  const texRepeatX = scale.x;
  const texRepeatY = scale.z;

  const { camera } = useThree();
  const wallRed = useRef();
  const wallGreen = useRef();
  const wallBlue = useRef();
  const wallYellow = useRef();

  useFrame(() => {
    wallRed.current.visible = camera.position.z > -(roomSize.depth / 2 + wallThickness/2);
    wallGreen.current.visible = camera.position.x > -(roomSize.width / 2 + wallThickness/2);
    wallBlue.current.visible = camera.position.z < (roomSize.depth / 2 + wallThickness/2);
    wallYellow.current.visible = camera.position.x < (roomSize.width / 2 + wallThickness/2);
  });

  return (
    <>
      <Light castShadow={true} position={[0, 0.8, 0]} />

      <ThickWall
        key={'redWall'}
        geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}
        position={[0, halfY, -halfZ - wallThickness / 2]}
        rotation={[0, 0, 0]}
        color={0xff0000}
        width={roomSize.width}
        ref={wallRed}
        thickness={wallThickness}
        height={wallHeight}
        // onClick={wallClicker}
      />

      <ThickWall
        key={'greenWall'}
        geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}
        position={[-halfX - wallThickness / 2, halfY, 0]}
        rotation={[0, Math.PI/2, 0]}
        color={0x08000}
        width={roomSize.depth}
        ref={wallGreen}
        thickness={wallThickness}
        height={wallHeight}
        // onClick={wallClicker}
      />

      <ThickWall
        key={'blueWall'}
        geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}
        position={[0, halfY, halfZ + wallThickness / 2]}
        rotation={[0, -Math.PI, 0]}
        color={0x0000ff}
        width={roomSize.width}
        ref={wallBlue}
        thickness={wallThickness}
        height={wallHeight}
        // onClick={wallClicker}
      />

      <ThickWall
        key={'yellowWall'}
        geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}
        position={[halfX + wallThickness / 2, halfY, 0]}
        rotation={[0, -Math.PI/2, 0]}
        color={0xffff00}
        width={roomSize.depth}
        ref={wallYellow}
        thickness={wallThickness}
        height={wallHeight}
        // onClick={wallClicker}
      />



      <Floor
        rotation={[-Math.PI / 2, 0, 0]}
        color="orange"
        width={roomSize.width}
        depth={roomSize.depth}
        position={[0, 0, 0]}
        castShadow={true}
        textureUrl={textureUrl}
        textureRepeatX={texRepeatX}
        textureRepeatY={texRepeatY}
        onClick={floorClicker}
      />
    </>
  );
}
