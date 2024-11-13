import React, {Suspense} from 'react';
import * as THREE from 'three'
import { extend, createRoot, events } from '@react-three/fiber'
import useStore from 'store/useStore';
import {Environment} from '@react-three/drei';
import CustomCameraControls from 'components/3d/CustomCameraControls';
import Scene from 'components/3d/Scene';
import {debounce} from 'throttle-debounce';
import {observeElementResize} from 'utils/observeElementResize';
import { Selection } from '@react-three/postprocessing';
import Postprocessing from 'components/3d/Postprocessing';
// import { Physics, Debug } from '@react-three/cannon';

extend(THREE);

const so = {
  width: null,
  height: null,
};

export function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.className = 'main-canvas';
  canvas.style.display = 'block';
  const root = createRoot(canvas);

  const configureAndRender = (size, dpr) => {
    if (size.width < 1 || size.height < 1) return null;

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
        far: 150,
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
      //   rs.events.connect(document.querySelector('#root'));
      //   // console.log(document.querySelector('#root'));
      // },
      // TODO: add eventSource https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/web/Canvas.tsx#L101-L119
    });

    return root.render(
      <>
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
          {/*<Physics*/}
          {/*  allowSleep={false}*/}
          {/*  axisIndex={2}*/}
          {/*  broadphase='SAP'*/}
          {/*  // defaultContactMaterial={ contactEquationStiffness: 1e6 }*/}
          {/*  gravity={[0, -9.81, 0]}*/}
          {/*  isPaused={false}*/}
          {/*  iterations={5}*/}
          {/*  maxSubSteps={10}*/}
          {/*  quatNormalizeFast={false}*/}
          {/*  quatNormalizeSkip={0}*/}
          {/*  shouldInvalidate={true}*/}
          {/*  size={1000}*/}
          {/*  solver='Split'*/}
          {/*  stepSize={1/60}*/}
          {/*  tolerance={0.001}*/}
          {/*>*/}
            <Scene />
          {/*</Physics>*/}
        </Selection>
      </>
    );
  };

  const debounceCanvas = debounce(0, configureAndRender);
  const canvasState = configureAndRender({ width: 1, height: 1 });

  canvasState.setState({
    setSizeOverride(width, height, dpr) {
      so.width = width;
      so.height = height;
      configureAndRender({ width, height, dpr });
    },
    resetSizeOverride() {
      so.width = null;
      so.height = null;
      const wrapper = canvasState.getState().gl.domElement?.parentNode;
      if (wrapper) {
        configureAndRender({ width: wrapper.clientWidth, height: wrapper.clientHeight });
      }
    },
  });

  const injectCanvas = wrapper => {
    if (wrapper) {
      wrapper.appendChild(canvas);
      canvasState.getState().events.connect(wrapper);
      debounceCanvas({ width: wrapper.clientWidth, height: wrapper.clientHeight });
      observeElementResize(wrapper, debounceCanvas);
    }
  };

  return {
    injectCanvas,
    canvasState,
  }
}
