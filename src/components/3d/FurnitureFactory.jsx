import { useRef, Suspense, useLayoutEffect, useMemo } from "react";
import { PivotControls, useHelper, Center, Html } from "@react-three/drei";
import { Box3, BoxHelper, Matrix4, Vector3 } from "three";
import useStore from "../../store/useStore.js";
import Model from "./Model.jsx";

const vector3 = new Vector3();
const box1 = new Box3();
const box2 = new Box3();

export default function FurnitureFactory({ furnitureObj }) {
  const pivotRef = useRef();
  const chairRef = useRef();
  const boundary = useRef(new Vector3());
  const bbox = useStore((state) => state.bbox());
  const scaleFurniture = useStore((state) => state.scaleFurniture);
  const {activeId, setActiveId, setIsDragged, objects} = useStore();

  const beginingMatrix = useMemo(() => {
    const clampPosition = furnitureObj.position.clone().clamp(bbox.min, bbox.max);
    return new Matrix4().setPosition(
      clampPosition.x,
      clampPosition.y,
      clampPosition.z
    );
  }, [furnitureObj.position]);
  const matrix = useRef(beginingMatrix);
  const handleScale = (e) => {
    scaleFurniture(furnitureObj.id, e.target.value);
    // objects.find(i => i.id === furnitureObj.id).width = Number(e.target.value);
  };

  useLayoutEffect(() => {
    box2.setFromObject(chairRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);
  }, [furnitureObj]);

  useLayoutEffect(() => {
    box2.setFromObject(chairRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);

    box1.copy(bbox).expandByVector(boundary.current);

    const m4 = matrix.current;
    const newPosition = vector3
      .set(m4.elements[12], m4.elements[13], m4.elements[14])
      .clamp(box1.min, box1.max);

    m4.setPosition(newPosition);
  }, [bbox]);

  useHelper(chairRef, BoxHelper, "magenta");

  return (
    <PivotControls
      ref={pivotRef}
      key={furnitureObj.id}
      fixed
      scale={100}
      activeAxes={[true, false, true]}
      autoTransform={false}
      matrix={matrix.current}
      visible={furnitureObj.id === activeId}
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
      <group ref={chairRef} key={`${furnitureObj.id}-gr`}>
        <Suspense>
          <Center disableY>
            {furnitureObj.id === activeId && (
              <Html position={[0, 1, 0]} center>
                <div
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '0.3rem',
                    color: 'rgb(255,255,255)',
                    padding: '5px',
                  }}
                >
                  <p style={{margin: 0}}>{furnitureObj.name}</p>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <label htmlFor={furnitureObj.id}>Width</label>
                    <input
                      style={{width: '40px'}}
                      type="number"
                      id={furnitureObj.id}
                      value={furnitureObj.width}
                      step={0.2}
                      onChange={(e) => {handleScale(e)}}
                    />
                  </div>
                </div>
              </Html>
            )}
            <Model
              id={furnitureObj.id}
              model={furnitureObj.model}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(e.eventObject.userData.id);
              }}
              scale={[furnitureObj.width, 1, 1]}
            />
          </Center>
        </Suspense>
      </group>
    </PivotControls>
  );
}
