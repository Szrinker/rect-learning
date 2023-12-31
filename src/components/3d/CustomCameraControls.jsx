import { Vector3, Box3, Sphere } from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useStore from "../../store/useStore";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

function setBBoxDimensions(width, height, depth, target = new Box3()) {
  target.min.x = -(width / 2);
  target.min.y = 0;
  target.min.z = -(depth / 2);

  target.max.x = width / 2;
  target.max.y = height;
  target.max.z = depth / 2;

  return target;
}

const bbox = new Box3();
const bsphere = new Sphere();

function CustomCameraControls({ options, fitOnResize = true }) {
  const roomSize = useStore((state) => state.roomSize());
  const size = useThree((state) => state.size);
  const controls = useRef();
  const fitToSphere = useMemo(
    () =>
      controls.current
        ? controls.current.fitToSphere.bind(controls.current)
        : () => {},
    [controls.current]
  );

  useDidMountEffect(() => {
    setBBoxDimensions(roomSize.width, roomSize.height, roomSize.depth, bbox);
    if (bbox.isEmpty()) return;

    bbox.getBoundingSphere(bsphere);

    fitToSphere(bsphere, true);
  }, [
    fitOnResize,
    size.width,
    roomSize.width,
    roomSize.depth,
    roomSize.height,
  ]);

  return <CameraControls makeDefault ref={controls} {...options} />;
}

export default CustomCameraControls;
