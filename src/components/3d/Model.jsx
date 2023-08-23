import { useGLTF } from "@react-three/drei";
import {useEffect, useLayoutEffect, useMemo} from 'react';
import useStore from '../../store/useStore.js';

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
}) {
  const gltf = useGLTF(model);
  const scene = useMemo(() => gltf.scene.clone(true), []);
  const resizeFurniture = useStore((state) => state.resizeFurniture);

  useEffect(() => {
    gltf.scene.traverse(obj => {
      if(obj.isMesh) {
        console.log(obj);
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
  }, [gltf]);

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
}
