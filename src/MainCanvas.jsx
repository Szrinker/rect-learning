import React from 'react';
import * as THREE from 'three'
import { extend, createRoot, events } from '@react-three/fiber'
import useStore from './store/useStore.js';
// import useThreeState from './store/useThreeState.js';
// import {XR} from '@react-three/xr';
import {Environment} from '@react-three/drei';
import CustomCameraControls from './components/3d/CustomCameraControls.jsx';
import Scene from './components/3d/Scene.jsx';
import {debounce} from 'throttle-debounce';
import {observeElementResize} from './utils/observeElementResize.js';
import { Selection } from '@react-three/postprocessing';
import Postprocessing from './components/3d/Postprocessing.jsx';

extend(THREE);

export function createCanvas() {
  const canvas = document.createElement('canvas');
  const root = createRoot(canvas);

  const configureAndRender = (size, dpr) => {
    root.configure({
      size: { width: size.width, height: size.height },
      dpr,
      frameloop: 'demand',
      events,
      gl: {
        localClippingEnabled: true,
        preserveDrawingBuffer: true,
        logarithmicDepthBuffer: true,
        antialias: true,
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        },
      },
      flat: true,
      shadows: 'soft',
      camera: {
        position: [2, 2, 2],
        near: 1,
        far: 100,
      },
      scene: {
        background: new THREE.Color('#333333'),
      },
      onPointerMissed: (e) => {
        if (e.target.localName === 'canvas') {
          useStore.setState({ activeId: null });
          useStore.setState({ activeWall: null });
        }
      },
      // onCreated: (rs) => {
      //   useThreeState.setState({ three: rs })
      // }
    });

    return root.render(
      <>
      {/*<XR*/}
      {/*  referenceSpace={'unbounded'}*/}
      {/*>*/}
        <Environment preset={'night'} />
        <CustomCameraControls
          options={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2,
            smoothTime: 0.15,
          }}
        />
        <ambientLight intensity={0.25} />
        <Selection>
        <Postprocessing />
        {/*<RayGrab>*/}
        <Scene />
        {/*</RayGrab>*/}
        </Selection>
      {/*</XR>*/}
  </>
    );
  };

  const debounceCanvas = debounce(100, configureAndRender);
  const canvasState = configureAndRender({ width: 1, height: 1 });

  // const debounceThreeStateUpdate = debounce(300, (st) => {
  //   useThreeState.setState({ three: st });
  // });
  // canvasState.setState({
  //   customPropertyTest: true,
  // });
  // canvasState.subscribe((newState) => {
  //   debounceThreeStateUpdate(newState);
  // });


  const injectCanvas = wrapper => {
    if (wrapper) {
      wrapper.appendChild(canvas);
      debounceCanvas({ width: wrapper.clientWidth, height: wrapper.clientHeight });
      observeElementResize(wrapper, configureAndRender);
    }
  };

  return {
    injectCanvas,
    canvasState,
  }
}
