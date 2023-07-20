import {
  MOUSE,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Spherical,
  Box3,
  BoxHelper,
  Sphere,
  Raycaster,
  MathUtils,
  Clock,
} from "three";
import React, {
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
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
  target.min.x = 0;
  target.min.y = 0;
  target.min.z = 0;

  target.max.x = width;
  target.max.y = height;
  target.max.z = depth;

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
  const invalidate = useThree((state) => state.invalidate);
  const controls = useRef();
  const previousControls = useRef();
  const fitToSphere = useMemo(
    () =>
      controls.current
        ? controls.current.fitToSphere.bind(controls.current)
        : () => {},
    [controls.current]
  );

  useDidMountEffect(() => {
    setBBoxDimensions(roomSize.width, roomSize.height, roomSize.depth, bbox);
    console.log(bbox);
    if (bbox.isEmpty()) return;

    bbox.getBoundingSphere(bsphere);

    fitToSphere(bsphere, true);
  }, [fitOnResize && size, roomSize]);

  useEffect(() => {
    let stopLoop = false;

    const loop = () => {
      if (stopLoop) return;
      controls.current.update(clock.getDelta());
      requestAnimationFrame(loop);
    };

    loop();

    return () => {
      stopLoop = true;
    };
  }, []);

  const onUpdate = useCallback(() => {
    invalidate();
  }, [invalidate]);

  useEffect(() => {
    const cleanUpFn = () => {
      controls.current.removeEventListener("update", onUpdate);
    };

    if (previousControls.current === controls.current) return cleanUpFn;

    // Expose camera controls to camera component
    gl.domElement.__cameraControls = controls.current;
    controls.current.addEventListener("update", onUpdate);

    setThree({ cameraControls: controls.current });

    previousControls.current = controls.current;

    return cleanUpFn;
  }, [camera, gl, scene, onUpdate]);

  return (
    <CameraControls ref={controls} args={[camera, gl, scene]} {...options} />
  );
}

export default CustomCameraControls;
