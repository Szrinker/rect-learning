import { useGLTF } from "@react-three/drei";
import {useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import useStore from '../../store/useStore.js';
import {useBox} from '@react-three/cannon';

function resize(mesh, dimension, val) {
  if (mesh.morphTargetDictionary?.[dimension]) {
    const min = mesh.userData[`min${dimension.charAt(0).toUpperCase()}${dimension.slice(1)}`];
    const max = mesh.userData[`max${dimension.charAt(0).toUpperCase()}${dimension.slice(1)}`];

    mesh.morphTargetInfluences[mesh?.morphTargetDictionary[dimension]] = (1/ (max - min)) * (val - min);
  } else {
    switch (dimension) {
      case 'width':
        mesh.scale.setX(val);
        break;
      case 'height':
        mesh.scale.setY(val);
        break;
      case 'depth':
        mesh.scale.setZ(val);
        break;
      default:
        break;
    }
  }
}

export default function Model({
  id,
  model,
  onClick,
  dimensions = {
    width: 0,
    height: 0,
    depth: 0,
  },
  castShadow = true,
  receiveShadow = true,
}) {
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);
  const resizeFurniture = useStore((state) => state.resizeFurniture);
  // const activeId = useStore((state) => state.activeId);
  // const isActive = id === activeId;
  // const furnitureRef = useBox(() => ({
  //   mass: isActive ? 1 : 0,
  //   type: isActive ? 'Dynamic' : 'Static'
  // }), useRef());

  useLayoutEffect(() => {
      scene.traverse(obj => {
        if (obj.isMesh) {
          obj.receiveShadow = receiveShadow;
          obj.castShadow = castShadow;
        }
      })
  }, [scene]);

  useEffect(() => {
    scene.traverse(obj => {
      if(obj.isMesh) {

        if (obj.morphTargetDictionary?.width != null ) {
          resizeFurniture(id, 'width', Number(obj.userData.minWidth));
        }
        if (obj.morphTargetDictionary?.height != null ) {
          resizeFurniture(id, 'height', Number(obj.userData.minHeight));

        }
        if (obj.morphTargetDictionary?.depth != null ) {
          resizeFurniture(id, 'depth', Number(obj.userData.minDepth));
        }
      }
    });
  }, [scene]);

  useLayoutEffect(() => {
    scene.traverse(obj => {
      if (obj.isMesh) {
        resize(obj, 'width', dimensions?.width);
        resize(obj, 'height', dimensions?.height);
        resize(obj, 'depth', dimensions?.depth);
      }
    })
  }, [scene, dimensions])

  return (
    <>
      <primitive name={id} userData={{ id }} object={scene} onClick={onClick} />
    </>
  );

  // scene.traverse(obj => {
  //   if (obj.isMesh) {
  //     console.log(obj)
  //     return (
  //       <group
  //         // ref={furnitureRef}
  //       >
  //         <mesh
  //           name={id}
  //           userData={{ id }}
  //           onClick={obj}
  //           visible
  //         >
  //           <meshStandardMaterial
  //             attach="material"
  //           />
  //           <primitive name={id} userData={{ id }} object={obj.geometry} onClick={onClick} />
  //         </mesh>
  //       </group>
  //     );
  //   }
  // });
}
