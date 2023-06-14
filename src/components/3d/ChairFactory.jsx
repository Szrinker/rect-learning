import { useRef } from 'react';
import { PivotControls } from '@react-three/drei';
import useStore from '../../store/useStore.js';
import { Vector3 } from 'three';
import Chair from './Chair.jsx';

const _tmpVec = new Vector3();
const min = new Vector3(-2, 0, -2);
const max = new Vector3(2, 2, 2);

export default function ChairFactory({ chairObj }) {
  const pivotRef = useRef();
  const chairRef = useRef();
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId);

  // console.log(chairObj.id, activeId);

  return (
    <PivotControls
      ref={pivotRef}
      key={chairObj.id}
      activeAxes={[true, false, true]}
      visible={chairObj.id === activeId}
      anchor={[0, -1, 0]}
      autoTransform={false}
      onDrag={(m, md, mW, mWd) => {
        if (!pivotRef.current) return;

        const newpos = _tmpVec
          .set(m.elements[12], m.elements[13], m.elements[14])
          .clamp(min, max);
        m.setPosition(newpos);
        pivotRef.current.matrix.copy(m);
      }}
    >
      <group ref={chairRef} position={chairObj.position}>
        <Chair
          id={chairObj.id}
          model={chairObj.model}
          onClick={(e) => {
            // e.stopPropagation();
            setActiveId(e.eventObject.userData.id);
          }}
        />
      </group>
    </PivotControls>
  );
}
