import { useGLTF, Html } from "@react-three/drei";
import { useMemo } from "react";
import useStore from "../../store/useStore.js";

export default function Chair({ id, model, onClick, name }) {
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);
  const activeId = useStore((state) => state.activeId);

  return (
    <>
      { (id === activeId) && (
        <Html>
          <h3 id="chairName" >{name}</h3>
        </Html>
      )}
      <primitive name={id} userData={{ id }} object={scene} onClick={onClick} />
    </>
  );
}
