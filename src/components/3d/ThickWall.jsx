import {
  Vector3,
  Plane,
  BackSide
} from "three";
import React, {useRef, useLayoutEffect, useState, useCallback} from 'react';
import { PivotControls, useHelper, Center, Html } from "@react-three/drei";
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg';
import useStore from '../../store/useStore.js';

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
  const [hovered, setHovered] = useState(false);
  const activeWall = useStore((state) => state.activeWall);
  const setActiveWall = useStore((state) => state.setActiveWall);
  const setActiveId = useStore((state) => state.setActiveId)
  const holedWalls = useStore((state) => state.holedWalls);
  const addHoledWalls = useStore((state) => state.addHoledWalls);
  const removeHole = useStore((state) => state.removeHole);

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
    const id = ref?.current?.uuid;

    addHoledWalls({
      id: id
    });
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
        setActiveWall(ref?.current?.uuid);
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
        <meshBasicMaterial
          color={'black'}
          side={BackSide}
        />
        <boxGeometry args={geometry} />
      </mesh>

      <mesh
        ref={ref1}
        rotation={rotation}
        castShadow={castShadow}
        onClick={onClick}
        receiveShadow={receiveShadow}
      >
        <meshPhysicalMaterial
          ref={ref2}
          color={activeWall === ref?.current?.uuid ? '#5381d3' : color}
          emissive={hovered ? '#1a5b5b' : '#000000'}
        />
        <boxGeometry args={geometry} ref={refBox} />
        {/*<Geometry ref={refBox} computeVertexNormals showOperations>*/}
        {/*  <Base geometry={geometry} />*/}

        {/*</Geometry>*/}
      </mesh>
      {activeWall === ref?.current?.uuid && (
          <Html center position={[0, (height + 1) /2, 0]}>
            <div
              style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '0.3rem',
                color: 'rgb(255,255,255)',
                padding: '5px',
              }}
            >
              <p style={{margin: 0}}>test</p>
              <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                {
                  holedWalls.find(w => w.id === ref?.current?.uuid)
                  ? (<button onClick={(e) => {
                      e.preventDefault();
                      removeHole(ref?.current?.uuid);
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
