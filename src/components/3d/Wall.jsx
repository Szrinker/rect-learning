import React from 'react';

export default function Wall({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  color = 'green',
  width = 1,
  height = 1,
  castShadow = false,
  onClick,
}) {
  return (
    <>
      <mesh
        rotation={rotation}
        position={position}
        scale={[width, height, 1]}
        castShadow={castShadow}
        onClick={onClick}
      >
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial color={color} />
      </mesh>
    </>
  );
}
