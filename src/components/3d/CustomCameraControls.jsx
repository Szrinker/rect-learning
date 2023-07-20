import { Vector3, Box3, Sphere, Clock } from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { CameraControls, useHelper } from "@react-three/drei";
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

const clock = new Clock();
const bbox = new Box3();
const center = new Vector3();
const bsphere = new Sphere();

function CustomCameraControls({ options, fitOnResize = true }) {
  const roomSize = useStore((state) => state.computed.roomSize());
  const setThree = useThree((state) => state.set);
  const gl = useThree((state) => state.gl);
  const size = useThree((state) => state.size);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const controls = useRef();
  const fitToSphere = useMemo(
    () =>
      controls.current
        ? controls.current.fitToSphere.bind(controls.current)
        : () => {},
    [controls.current]
  );

  console.log(size);
  useDidMountEffect(() => {
    setBBoxDimensions(roomSize.width, roomSize.height, roomSize.depth, bbox);
    if (bbox.isEmpty()) return;

    bbox.getBoundingSphere(bsphere);

    fitToSphere(bsphere, true);
  }, [fitOnResize, size.width, size.height, roomSize]);

  return <CameraControls makeDefault ref={controls} {...options} />;
}

export default CustomCameraControls;
