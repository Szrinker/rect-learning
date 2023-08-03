import {
  Vector3,
  Plane,
  BackSide,
  PlaneHelper,
  Quaternion,
  Matrix4
} from "three";
import {useThree} from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

function ThickWall({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  geometry = [1, 1, 1],
  color = 0x08000,
  width = 0,
  height = 0,
  thickness = 0,
  castShadow = false,
  onClick,
}, ref) {
  const ref1 = useRef();
  const ref2 = useRef();
  const refBox = useRef();

  const positionVector = new Vector3(position[0], position[1], position[2]);
  const dir = positionVector.clone().normalize();
  const matrix = new Matrix4()
    .compose(
      positionVector,
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 0),
        dir
      ),
      new Vector3(1, 1, 1)
    );
  const clipping = new Plane(
    new Vector3(-1, 0, 0).applyAxisAngle(new Vector3(0, 1, 0), -Math.PI/4),
    (((width) + thickness) * Math.sqrt(2)) / 4
  ).applyMatrix4(matrix);
  const clipping2 = new Plane(
    new Vector3(0, 0, 1).applyAxisAngle(new Vector3(0, -1, 0), -Math.PI/4),
    (((width) + thickness) * Math.sqrt(2)) / 4
  ).applyMatrix4(matrix);
  const planeHelper = useRef(new PlaneHelper(clipping, 10, color));
  const planeHelper2 = useRef(new PlaneHelper(clipping2, 10, color));
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    planeHelper.current.plane = clipping;
    planeHelper2.current.plane = clipping2;
    scene.add(planeHelper.current);
    scene.add(planeHelper2.current);
  });

  return (
    <group ref={ref}>
      <mesh
        rotation={rotation}
        position={position}
        castShadow={castShadow}
        onClick={onClick}
      >
        <boxGeometry args={geometry} />
        <meshBasicMaterial
          color={'black'}
          side={BackSide}
          // clippingPlanes={[clipping]}
          clippingPlanes={[clipping, clipping2]}
          // clipShadows={true}
          // clipIntersection={true}
        />
      </mesh>

      <mesh
        ref={ref1}
        rotation={rotation}
        position={position}
        castShadow={castShadow}
        onClick={onClick}
      >
        <boxGeometry args={geometry} ref={refBox} />
        <meshPhysicalMaterial
          ref={ref2}
          color={color}
          // clippingPlanes={[clipping]}
          clippingPlanes={[clipping, clipping2]}
          // clipShadows={true}
          // clipIntersection={true}
        />
      </mesh>
    </group>
  );
}

export default React.forwardRef(ThickWall);
