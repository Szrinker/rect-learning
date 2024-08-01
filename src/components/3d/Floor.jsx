import React, { useLayoutEffect, forwardRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useThree, useLoader } from "@react-three/fiber";

function Floor({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  width = 1,
  depth = 1,
  height = 1,
  castShadow = false,
  receiveShadow = false,
  textureUrl = '',
  textureRepeatX,
  textureRepeatY,
  onClick,
}, ref) {
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
        receiveShadow={receiveShadow}
        onClick={onClick}
        ref={ref}
      >
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
    </>
  );
}

export default React.forwardRef(Floor);
