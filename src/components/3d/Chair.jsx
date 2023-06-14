import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function Chair({ id, model, onClick }) {
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);
  return (
    <primitive name={id} userData={{ id }} object={scene} onClick={onClick} />
  );
}
