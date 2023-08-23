import {
  Vector3,
  Plane,
  BackSide
} from "three";
import React, { useRef, useLayoutEffect } from "react";

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
  onClick,
}, ref) {
  const refMesh1 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const refBox = useRef();
  const group = useRef();

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

  return (
    <group
      ref={ref}
      // ref={group}
      position={position}
    >
      <mesh
        ref={refMesh1}
        rotation={rotation}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        onClick={onClick}
      >
        <boxGeometry args={geometry} />
        <meshBasicMaterial
          color={'black'}
          side={BackSide}
          // clippingPlanes={[clipping]}
          // clippingPlanes={[clipping, clipping2]}
          // clipShadows={true}
          // clipIntersection={true}
        />
      </mesh>

      <mesh
        ref={ref1}
        rotation={rotation}
        castShadow={castShadow}
        onClick={onClick}
        receiveShadow={receiveShadow}
      >
        <boxGeometry args={geometry} ref={refBox} />
        <meshPhysicalMaterial
          ref={ref2}
          color={color}
          // clippingPlanes={[clipping]}
          // clippingPlanes={[clipping, clipping2]}
          // clipShadows={true}
          // clipIntersection={true}
        />
      </mesh>
    </group>
  );
}

export default React.forwardRef(ThickWall);
