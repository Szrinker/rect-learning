import { useLayoutEffect } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useThree, useLoader } from "@react-three/fiber";

export default function Floor({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  width = 1,
  depth = 1,
  height = 1,
  castShadow = false,
  textureUrl = '',
  textureRepeatX,
  textureRepeatY,
  onClick,
}) {
  const gl = useThree((state) => state.gl);
  const texture = useLoader(TextureLoader, textureUrl);

  useLayoutEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.repeat.set(textureRepeatX, textureRepeatY);
  }, [texture, textureRepeatX, textureRepeatY, gl]);

  return (
    <>
      <mesh
        rotation={rotation}
        position={position}
        scale={[width, depth, height]}
        castShadow={castShadow}
        onClick={onClick}
      >
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
    </>
  );
}
