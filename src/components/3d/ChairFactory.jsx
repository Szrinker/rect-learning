import { useRef, Suspense } from "react";
import { PivotControls, useHelper, Box, Center } from "@react-three/drei";
import { Box3, BoxHelper, Matrix4, Vector3 } from "three";
import useStore from "../../store/useStore.js";
import Chair from "./Chair.jsx";

// const tmpVec = new Vector3();
// const tmpBox = new Box3();
// const tmpBox2 = new Box3();

export default function ChairFactory({ chairObj }) {
  const pivotRef = useRef();
  const chairRef = useRef();
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId);
  // const box = new THREE.Box3();

  // box.expandByObject(chairRef);
  useHelper(chairRef, BoxHelper, "magenta");

  return (
    <PivotControls
      ref={pivotRef}
      key={chairObj.id}
      activeAxes={[true, false, true]}
      visible={chairObj.id === activeId}
      anchor={[0, -1, 0]}
    >
      <group ref={chairRef} position={chairObj.position}>
        <Suspense>
          <Center disableY>
            <Chair
              id={chairObj.id}
              model={chairObj.model}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(e.eventObject.userData.id);
              }}
            />
          </Center>
        </Suspense>
      </group>
    </PivotControls>
  );
}
