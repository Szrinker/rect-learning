import {useEffect, useRef, useState, useLayoutEffect} from 'react';
// import Wall from 'components/3d/Wall';
import ThickWall from 'components/3d/ThickWall';
import Floor from 'components/3d/Floor';
import Light from 'components/3d/Light';
import useStore from 'store/useStore';
// import {useFrame, useThree} from "@react-three/fiber";
// import {useThreeStateContext} from 'utils/threeStateContext';
// import {useBox, usePlane, Debug} from '@react-three/cannon';

export default function Room({ wallClicker, floorClicker, children }) {
  const {scale, wallThickness} = useStore();
  const textureUrl = '/assets/wood.jpg';
  const roomSize = useStore((state) => state.roomSize());
  // const camera = useThree(state => state.camera);

  const wallHeight = roomSize.height;
  const halfX = roomSize.width / 2;
  const halfY = wallHeight / 2;
  const halfZ = roomSize.depth / 2;
  const texRepeatX = scale.x;
  const texRepeatY = scale.z;
  const wallRed = useRef();
  const wallGreen = useRef();
  const wallBlue = useRef();
  const wallYellow = useRef();

  // const { camera } = useThree();
  // const [wallRed, apiRed] = useBox(() => ({
  //   type: 'Static',
  //   position: [0, halfY, -halfZ - wallThickness / 2],
  //   rotation: [0, 0, 0]
  // }), useRef(), [roomSize, wallThickness]);
  // const [wallGreen, apiGreen] = useBox(() => ({
  //   type: 'Static',
  //   position: [-halfX - wallThickness / 2, halfY, 0],
  //   rotation: [0, Math.PI/2, 0]
  // }), useRef(), [roomSize, wallThickness]);
  // const [wallBlue, apiBlue] = useBox(() => ({
  //   type: 'Static',
  //   position: [0, halfY, halfZ + wallThickness / 2],
  //   rotation: [0, -Math.PI, 0]
  // }), useRef(), [roomSize, wallThickness]);
  // const [wallYellow, apiYellow] = useBox(() => ({
  //   type: 'Static',
  //   position: [halfX + wallThickness / 2, halfY, 0],
  //   rotation: [0, -Math.PI/2, 0]
  // }), useRef(), [roomSize, wallThickness]);
  // const [floorRef] = usePlane(() => ({
  //   type: 'Static',
  //   position: [0, 0, 0],
  //   rotation: [-Math.PI / 2, 0, 0]
  // }), useRef(), [roomSize, wallThickness]);

  // useFrame(() => {
  //   wallRed.current.visible = camera.position.z > -(roomSize.depth / 2 + wallThickness/2);
  //   wallGreen.current.visible = camera.position.x > -(roomSize.width / 2 + wallThickness/2);
  //   wallBlue.current.visible = camera.position.z < (roomSize.depth / 2 + wallThickness/2);
  //   wallYellow.current.visible = camera.position.x < (roomSize.width / 2 + wallThickness/2);
  // });

  return (
    <group name={'room'}>
      <Light />
      <ThickWall
        key={'redWall'}
        name={'redWall'}
        geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}
        position={[0, halfY, -halfZ - wallThickness / 2]}
        rotation={[0, 0, 0]}
        color={0xeeeeee}
        width={roomSize.width}
        ref={wallRed}
        thickness={wallThickness}
        height={wallHeight}
        receiveShadow
        castShadow
        // onClick={wallClicker}
      />
      <ThickWall
        key={'greenWall'}
        name={'greenWall'}
        geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}
        position={[-halfX - wallThickness / 2, halfY, 0]}
        rotation={[0, Math.PI/2, 0]}
        color={0xeeeeee}
        width={roomSize.depth}
        ref={wallGreen}
        thickness={wallThickness}
        height={wallHeight}
        receiveShadow
        castShadow
        // onClick={wallClicker}
      />
      <ThickWall
        key={'blueWall'}
        name={'blueWall'}
        geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}
        position={[0, halfY, halfZ + wallThickness / 2]}
        rotation={[0, -Math.PI, 0]}
        color={0xeeeeee}
        width={roomSize.width}
        ref={wallBlue}
        thickness={wallThickness}
        height={wallHeight}
        receiveShadow
        castShadow
        // onClick={wallClicker}
      />
      <ThickWall
        key={'yellowWall'}
        name={'yellowWall'}
        geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}
        position={[halfX + wallThickness / 2, halfY, 0]}
        rotation={[0, -Math.PI/2, 0]}
        color={0xeeeeee}
        width={roomSize.depth}
        ref={wallYellow}
        thickness={wallThickness}
        height={wallHeight}
        receiveShadow
        castShadow
        // onClick={wallClicker}
      />
      <Floor
        rotation={[-Math.PI / 2, 0, 0]}
        color="orange"
        width={roomSize.width}
        depth={roomSize.depth}
        position={[0, 0, 0]}
        receiveShadow
        textureUrl={textureUrl}
        textureRepeatX={texRepeatX}
        textureRepeatY={texRepeatY}
        onClick={(e) => {floorClicker(e)}}
      />

      {children}

      {/*<Debug color="magenta" scale={1.1}>*/}
      {/*  <Light />*/}
      {/*  <ThickWall*/}
      {/*    key={'redWall'}*/}
      {/*    name={'redWall'}*/}
      {/*    geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}*/}
      {/*    color={0xeeeeee}*/}
      {/*    width={roomSize.width}*/}
      {/*    ref={wallRed}*/}
      {/*    thickness={wallThickness}*/}
      {/*    height={wallHeight}*/}
      {/*    receiveShadow*/}
      {/*    castShadow*/}
      {/*    // onClick={wallClicker}*/}
      {/*  />*/}
      {/*  <ThickWall*/}
      {/*    key={'greenWall'}*/}
      {/*    name={'greenWall'}*/}
      {/*    geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}*/}
      {/*    color={0xeeeeee}*/}
      {/*    width={roomSize.depth}*/}
      {/*    ref={wallGreen}*/}
      {/*    thickness={wallThickness}*/}
      {/*    height={wallHeight}*/}
      {/*    receiveShadow*/}
      {/*    castShadow*/}
      {/*    // onClick={wallClicker}*/}
      {/*  />*/}
      {/*  <ThickWall*/}
      {/*    key={'blueWall'}*/}
      {/*    name={'blueWall'}*/}
      {/*    geometry={[roomSize.width + wallThickness * 2, wallHeight, wallThickness]}*/}
      {/*    color={0xeeeeee}*/}
      {/*    width={roomSize.width}*/}
      {/*    ref={wallBlue}*/}
      {/*    thickness={wallThickness}*/}
      {/*    height={wallHeight}*/}
      {/*    receiveShadow*/}
      {/*    castShadow*/}
      {/*    // onClick={wallClicker}*/}
      {/*  />*/}
      {/*  <ThickWall*/}
      {/*    key={'yellowWall'}*/}
      {/*    name={'yellowWall'}*/}
      {/*    geometry={[roomSize.depth + wallThickness * 2, wallHeight, wallThickness]}*/}
      {/*    color={0xeeeeee}*/}
      {/*    width={roomSize.depth}*/}
      {/*    ref={wallYellow}*/}
      {/*    thickness={wallThickness}*/}
      {/*    height={wallHeight}*/}
      {/*    receiveShadow*/}
      {/*    castShadow*/}
      {/*    // onClick={wallClicker}*/}
      {/*  />*/}
      {/*  <Floor*/}
      {/*    color="orange"*/}
      {/*    width={roomSize.width}*/}
      {/*    depth={roomSize.depth}*/}
      {/*    receiveShadow*/}
      {/*    textureUrl={textureUrl}*/}
      {/*    textureRepeatX={texRepeatX}*/}
      {/*    textureRepeatY={texRepeatY}*/}
      {/*    onClick={(e) => {floorClicker(e)}}*/}
      {/*    ref={floorRef}*/}
      {/*  />*/}
      {/*</Debug>*/}
    </group>
  );
}
