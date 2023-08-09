import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Model({ id, model, onClick, scale }) {
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);

  return (
    <>
      <primitive name={id} userData={{ id }} object={scene} onClick={onClick} scale={scale} />
    </>
  );
}
