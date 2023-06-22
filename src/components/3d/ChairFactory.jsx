import { useRef, Suspense, useLayoutEffect, useMemo } from "react";
import { PivotControls, useHelper, Center } from "@react-three/drei";
import { Box3, BoxHelper, Matrix4, Vector3 } from "three";
import useStore from "../../store/useStore.js";
import Chair from "./Chair.jsx";

const vector3 = new Vector3();
const box1 = new Box3();
const box2 = new Box3();

export default function ChairFactory({ chairObj }) {
  // const isDragged = useStore((state) => state.isDragged);
  const setIsDragged = useStore((state) => state.setIsDragged);
  const pivotRef = useRef();
  const chairRef = useRef();
  const boundary = useRef(new Vector3());
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId);
  const bbox = useStore((state) => state.computed.bbox());
  // const clampPosition = useRef(chairObj.position.clone());

  const beginingMatrix = useMemo(() => {
    const clampPosition = chairObj.position.clone().clamp(bbox.min, bbox.max);
    return new Matrix4().setPosition(
      clampPosition.x,
      clampPosition.y,
      clampPosition.z
    );
    // return new Matrix4().setPosition(clampPosition.current.x, clampPosition.current.y, clampPosition.current.z);
  }, [chairObj.position]);
  const matrix = useRef(beginingMatrix);

  useLayoutEffect(() => {
    box2.setFromObject(chairRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);
  }, [chairObj]);

  useLayoutEffect(() => {
    box2.setFromObject(chairRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);

    box1.copy(bbox).expandByVector(boundary.current);

    // clampPosition.current = chairObj.position.clone().clamp(bbox.min, bbox.max);

    const m4 = matrix.current;
    const newPosition = vector3
      .set(m4.elements[12], m4.elements[13], m4.elements[14])
      .clamp(box1.min, box1.max);

    m4.setPosition(newPosition);
  }, [bbox]); //, chairObj.position

  useHelper(chairRef, BoxHelper, "magenta");

  return (
    <PivotControls
      ref={pivotRef}
      key={chairObj.id}
      fixed
      scale={100}
      activeAxes={[true, false, true]}
      autoTransform={false}
      matrix={matrix.current}
      visible={chairObj.id === activeId}
      anchor={[0, -1, 0]}
      onDrag={(m, md, mW, mWd) => {
        if (!matrix.current) return;

        box2.setFromObject(chairRef.current);
        box2.getSize(boundary.current);
        boundary.current.multiplyScalar(0.5).negate().setY(0);

        box1.copy(bbox).expandByVector(boundary.current);
        const newPosition = vector3
          .set(m.elements[12], m.elements[13], m.elements[14])
          .clamp(box1.min, box1.max);
        m.setPosition(newPosition);
        matrix.current.copy(m);
      }}
      onDragStart={() => {
        setIsDragged(true);
      }}
      onDragEnd={() => {
        setTimeout(() => setIsDragged(false), 0);
      }}
    >
      <group ref={chairRef}>
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
