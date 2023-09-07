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
  const furnitureRef = useRef();
  const boundary = useRef(new Vector3());
  const bbox = useStore((state) => state.bbox());
  const resizeFurniture = useStore((state) => state.resizeFurniture);
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId)
  const setIsDragged = useStore((state) => state.setIsDragged)

  const beginingMatrix = useMemo(() => {
    const clampPosition = furnitureObj.position.clone().clamp(bbox.min, bbox.max);
    return new Matrix4().setPosition(
      clampPosition.x,
      clampPosition.y,
      clampPosition.z
    );
  }, [furnitureObj.position]);
  const matrix = useRef(beginingMatrix);
  const handleScale = (e, dimension) => {
    resizeFurniture(furnitureObj.id, dimension, e.target.value);
  };

  useLayoutEffect(() => {
    box2.setFromObject(furnitureRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);
  }, [furnitureObj]);

  useLayoutEffect(() => {
    box2.setFromObject(furnitureRef.current);
    box2.getSize(boundary.current);
    boundary.current.multiplyScalar(0.5).negate().setY(0);

    box1.copy(bbox).expandByVector(boundary.current);

    const m4 = matrix.current;
    const newPosition = vector3
      .set(m4.elements[12], m4.elements[13], m4.elements[14])
      .clamp(box1.min, box1.max);

    m4.setPosition(newPosition);
  }, [bbox]);

  useHelper(furnitureRef, BoxHelper, "magenta");

  return (
    <PivotControls
      ref={pivotRef}
      key={furnitureObj.id}
      // fixed
      scale={2}
      activeAxes={[true, false, true]}
      autoTransform={false}
      matrix={matrix.current}
      visible={furnitureObj.id === activeId}
      anchor={[0, -1, 0]}
      onDrag={(m, md, mW, mWd) => {
        if (!matrix.current) return;

        box2.setFromObject(furnitureRef.current);
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
      <group ref={furnitureRef} key={`${furnitureObj.id}-gr`}>
        <Suspense>
          {/*<Center>*/}
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
                    <label htmlFor={`${furnitureObj.id}_width`}>Width</label>
                    <input
                      style={{width: '40px'}}
                      type="number"
                      id={`${furnitureObj.id}_width`}
                      value={furnitureObj.width}
                      step={0.2}
                      onChange={(e) => {handleScale(e, 'width')}}
                    />
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <label htmlFor={`${furnitureObj.id}_height`}>Height</label>
                    <input
                      style={{width: '40px'}}
                      type="number"
                      id={`${furnitureObj.id}_height`}
                      value={furnitureObj.height}
                      step={0.2}
                      onChange={(e) => {handleScale(e, 'height')}}
                    />
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <label htmlFor={`${furnitureObj.id}_depth`}>Depth</label>
                    <input
                      style={{width: '40px'}}
                      type="number"
                      id={`${furnitureObj.id}_depth`}
                      value={furnitureObj.depth}
                      step={0.2}
                      onChange={(e) => {handleScale(e, 'depth')}}
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
              dimensions={{
                width: furnitureObj.width,
                height: furnitureObj.height,
                depth: furnitureObj.depth,
              }}
              receiveShadow={true}
              castShadow={true}
            />
          {/*</Center>*/}
        </Suspense>
      </group>
    </PivotControls>
  );
}
