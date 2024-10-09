import {PointLightHelper, CameraHelper} from 'three';
import React, {useRef} from 'react';
import {OrthographicCamera, Sphere, useHelper} from '@react-three/drei';
import useStore from 'store/useStore';

export default function Light() {
  const roomSize = useStore((state) => state.roomSize());
  const wallHeight = roomSize.height;
  const pointLightRef = useRef();
  const pointLightShadowCameraRef = useRef();
  const directionalLightRef = useRef();
  const directionalLightShadowCameraRef = useRef();

  // useHelper(pointLightRef, PointLightHelper, 0.2, 0x000000);
  // useHelper(directionalLightRef, DirectionalLightHelper, 3, 'magenta');
  // useHelper(pointLightShadowCameraRef, CameraHelper);
  // useHelper(directionalLightShadowCameraRef, CameraHelper);

  return (
    <>
        <pointLight
          castShadow
          position={[0, wallHeight - 0.3, 0]}
          ref={pointLightRef}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0002}
          shadow-normlaBias={0.003}
          shadow-radius={5}
          args={[0xffffff, 1.4, 0, 0.6]}
        >
          <Sphere args={[0.069]} >
            <meshPhysicalMaterial
              // transparent={true}
              // opacity={0.8}
              // roughness={0}
              // metalness={0}
              // reflectivity={0}
              // clearcoat={1}
              // clearcoatRoughness={1}
              color="white"
              emissive="white"
              emissiveIntensity={6}
              toneMapped={false}
            />
          </Sphere>
          <perspectiveCamera ref={pointLightShadowCameraRef} args={[90, 1, 0.1, 100]} attach="shadow-camera" />
        </pointLight>


      <directionalLight
        castShadow
        position={[20, 20, 5]}
        ref={directionalLightRef}
        args={[0xffffff, 1]}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.002}
        shadow-normlaBias={0.0003}
      >
        <OrthographicCamera
          ref={directionalLightShadowCameraRef}
          attach="shadow-camera"
          left={-((roomSize.depth/2) + 6)}
          right={((roomSize.depth/2) + 6)}
          top={((roomSize.width/2) + 6)}
          bottom={-((roomSize.width/2) + 6)}
          near={0}
          far={55}
        />
        {/*<orthographicCamera ref={directionalLightShadowCameraRef} attach="shadow-camera" args={[-5, 5, 5, -5, 0.0001, 25]} />*/}
      </directionalLight>
    </>
  );
}
