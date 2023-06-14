import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import chairModel from '../../assets/chair.glb';

export default function Chair({ id, model, onClick }) {
  // console.log(model);
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);
  return (
    <primitive name={id} userData={{ id }} object={scene} onClick={onClick} />
  );
}
