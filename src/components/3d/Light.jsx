import * as THREE from 'three';
import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';

export default function Light({
  helperSize = 0.2,
  helperColor = 0x000000,
  lightColor = 0xffffff,
  intensity = 0.4,
  distance = 0,
  decay = 2,
  castShadow = false,
  position = [0, 0, 0],
  shadowMapSize = [1024, 1024],
}) {
  const pointLightRef = useRef();
  const shadowCameraRef = useRef();

  useHelper(pointLightRef, THREE.PointLightHelper, helperSize, helperColor);

  return (
    <pointLight
      castShadow={castShadow}
      position={position}
      ref={pointLightRef}
      shadow-mapSize={shadowMapSize}
      args={[lightColor, intensity, distance, decay]}
    >
      <orthographicCamera ref={shadowCameraRef} attach="shadow-camera" />
    </pointLight>
  );
}
