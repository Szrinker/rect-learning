import {
  Vector3,
  Plane,
  BackSide,
  BoxGeometry
} from "three";
import React, {useRef, useLayoutEffect, useState, useCallback} from 'react';
import { Html } from "@react-three/drei";
import { Geometry, Base, Subtraction } from '@react-three/csg';
import useStore from 'store/useStore.js';
import GlassDoor from './GlassDoor.jsx';
import { useSpring, animated, config } from '@react-spring/three'
import {useThree} from '@react-three/fiber';

const box = new BoxGeometry();
const Door = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
    </Geometry>
  </Subtraction>
)

function calculateRotation(rotationArr = [0, 0, 0], axis = 'x', radianValue) {
  switch (axis) {
    case 'x':
      rotationArr[0] += radianValue;
      break;
    case 'y':
      rotationArr[1] += radianValue;
      break;
    case 'z':
      rotationArr[2] += radianValue;
      break;
  }

  return rotationArr;
}

function ThickWall({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  geometry = [1, 1, 1],
  color = 0x08000,
  width = 0,
  height = 0,
  thickness = 0,
  receiveShadow = false,
  castShadow = false,
  doors = false,
  onClick,
  name,
}, ref) {
  const refMesh1 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const refBox = useRef();
  const csg = useRef();
  const [hovered, setHovered] = useState(false);
  const [clickedDoor, setClickedDoor] = useState(false);
  const activeWall = useStore((state) => state.activeWall);
  const setActiveWall = useStore((state) => state.setActiveWall);
  const setActiveId = useStore((state) => state.setActiveId)
  const holedWalls = useStore((state) => state.holedWalls);
  const addHoledWalls = useStore((state) => state.addHoledWalls);
  const removeHole = useStore((state) => state.removeHole);
  const invalidateRenderLoop = useThree(state => state.invalidate);

  const wallId = ref?.current?.uuid;
  const holedWall = holedWalls.find(w => w.name === name);

  const holeDoorPos = [holedWall?.position, -height/2 + 1, 0];
  const holeDoorScale = [holedWall?.width, 2, thickness + 1];
  const doorScale = [holedWall?.width, 2, thickness];

  useLayoutEffect(() => {
    ref.current.updateMatrixWorld();
    const clipping = new Plane(
      new Vector3(-1, 0, 0).applyAxisAngle(new Vector3(0, 1, 0), -Math.PI/4).applyAxisAngle(new Vector3(0, 1, 0), rotation[1]),
      (((width) + thickness) * Math.sqrt(2)) / 4
    ).applyMatrix4(ref.current.matrixWorld)
    const clipping2 = new Plane(
      new Vector3(0, 0, -1).applyAxisAngle(new Vector3(0, 1, 0), -Math.PI/4).applyAxisAngle(new Vector3(0, 1, 0), rotation[1]),
      (((width) + thickness) * Math.sqrt(2)) / 4
    ).applyMatrix4(ref.current.matrixWorld)

    refMesh1.current.material.clippingPlanes = [clipping, clipping2];
    ref1.current.material.clippingPlanes = [clipping, clipping2];
  }, [width, thickness, geometry, rotation]);

  const handleAddHole = useCallback((e) => {
    e.preventDefault();

    addHoledWalls({
      id: wallId,
      name: name,
      position: 0,
      width: 1,
      door: false,
    });
  });

  const defaultRotation = [0, 0, 0];
  const doorOpen = useSpring({
    rotation: clickedDoor ? calculateRotation(defaultRotation, 'y', 0.75) : defaultRotation,
    config: config.wobbly,
    onChange: () => invalidateRenderLoop(2),
    onProps: () => invalidateRenderLoop(2),
  });

  return (
    <group
      ref={ref}
      name={name}
      position={position}
      onPointerOver={ (e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onClick={ (e) => {
        e.stopPropagation();
        setActiveWall(name);
        setActiveId(null);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <mesh
        ref={refMesh1}
        rotation={rotation}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        onClick={onClick}
      >
        {holedWall ? (
          <>
            <Geometry ref={csg}>
              <Base
                name={name}
                geometry={new BoxGeometry(geometry[0], geometry[1], geometry[2])}
              />
              <Door position={holeDoorPos} scale={holeDoorScale} />
            </Geometry>
            <meshBasicMaterial
              color={'black'}
              side={BackSide}
            />
            {holedWall.door && (
              <animated.group
                rotation={doorOpen.rotation}
                position={[holedWall.width/2, 0, 0]}
              >
                <group
                  position={[-holedWall.width/2, 0, 0]}
                >
                  <GlassDoor
                    position={holeDoorPos}
                    scale={doorScale}
                    color={'#abc9ff'}
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedDoor(prevState => !prevState)
                    }}
                    onPointerOver={ (e) => {
                      e.stopPropagation();
                      setHovered(false);
                    }}
                  />
                </group>
              </animated.group>
            )}
          </>
        ) : (
          <>
            <meshBasicMaterial
              color={'black'}
              side={BackSide}
            />
            <boxGeometry args={geometry} />
          </>
        )}
      </mesh>

      <mesh
        ref={ref1}
        rotation={rotation}
        castShadow={castShadow}
        onClick={onClick}
        receiveShadow={receiveShadow}
      >
        {holedWall ? (
          <>
            <Geometry ref={csg}>
              <Base
                name={name}
                geometry={new BoxGeometry(geometry[0], geometry[1], geometry[2])}
              />
              <Door position={holeDoorPos} scale={holeDoorScale} />
            </Geometry>
            <meshPhysicalMaterial
              ref={ref2}
              color={activeWall === name ? '#5381d3' : color}
              emissive={hovered ? '#1a5b5b' : '#000000'}
            />
          </>
        ) : (
          <>
            <meshPhysicalMaterial
              ref={ref2}
              color={activeWall === name ? '#5381d3' : color}
              emissive={hovered ? '#1a5b5b' : '#000000'}
            />
            <boxGeometry args={geometry} ref={refBox} />
          </>
        )}
      </mesh>
      {activeWall === name && (
          <Html center position={[0, (height + 1) /2, 0]} >
            <div
              style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '0.3rem',
                color: 'rgb(255,255,255)',
                padding: '5px',
              }}
            >
              <p style={{margin: '0 0 5px', textAlign: 'center'}}>{name}</p>
              <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                {
                  holedWalls.find(w => w.name === name)
                  ? (<button onClick={(e) => {
                      e.preventDefault();
                      removeHole(name);
                    }}>Remove hole</button>)
                  : (<button onClick={(e) => {
                      e.preventDefault();
                      handleAddHole(e);
                    }}>Add hole</button>)
                }
              </div>
            </div>
          </Html>
      )}
    </group>
  );
}

export default React.forwardRef(ThickWall);
