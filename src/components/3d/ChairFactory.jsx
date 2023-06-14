import { useRef } from 'react';
import { PivotControls, useHelper } from '@react-three/drei';
import * as THREE from "three";
import useStore from '../../store/useStore.js';
import Chair from './Chair.jsx';

export default function ChairFactory({ chairObj }) {
  const pivotRef = useRef();
  const chairRef = useRef();
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId);
  // const box = new THREE.Box3();

  // box.expandByObject(chairRef);
  // useHelper(chairRef, THREE.Box3Helper, 0x000000);

  return (
    <PivotControls
      ref={pivotRef}
      key={chairObj.id}
      activeAxes={[true, false, true]}
      visible={chairObj.id === activeId}
      anchor={[0, -1, 0]}
    >
      <group ref={chairRef} position={chairObj.position}>
          <Chair
            id={chairObj.id}
            model={chairObj.model}
            onClick={(e) => {
              e.stopPropagation();
              setActiveId(e.eventObject.userData.id);
            }}
          />
      </group>
    </PivotControls>
  );
}
