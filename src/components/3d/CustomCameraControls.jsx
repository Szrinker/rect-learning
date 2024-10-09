import { Box3, Sphere } from "three";
import { useRef, useEffect, useCallback } from 'react';
import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import useStore from "store/useStore";

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
  const wallThickness = useStore((state) => state.wallThickness);
  const size = useThree((state) => state.size);
  const controls = useRef();
  const prevControls = useRef();
  // const fitToSphere = useMemo(
  //   () =>
  //     controls.current
  //       ? controls.current.fitToSphere.bind(controls.current)
  //       : () => {},
  //   [controls.current]
  // );
  const setThree = useThree(state => state.set);
  const gl = useThree(state => state.gl);
  const scene = useThree(state => state.scene);
  const camera = useThree(state => state.camera);
  const invalidate = useThree(state => state.invalidate);

  const onUpdate = useCallback(() => {
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    setBBoxDimensions(roomSize.width + wallThickness, roomSize.height + wallThickness, roomSize.depth + wallThickness, bbox);
    if (bbox.isEmpty()) return;

    bbox.getBoundingSphere(bsphere);
    controls.current.fitToSphere(bsphere, true);
  }, [
    size,
    roomSize,
    wallThickness,
  ]);

  useEffect(() => {
    if (prevControls.current === controls.current) onUpdate();

    prevControls.current = controls.current;
    setThree({ cameraControls: controls.current });

    onUpdate();
  }, []);

  return <CameraControls makeDefault ref={controls} camera={camera} {...options} />;
}

export default CustomCameraControls;
