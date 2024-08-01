import { useRef, Suspense, useLayoutEffect, useMemo, useState } from 'react';
import { PivotControls, useHelper, Center, Html } from "@react-three/drei";
import { Box3, BoxHelper, Matrix4, Vector3 } from "three";
import useStore from "../../store/useStore.js";
import Model from "./Model.jsx";
import {Select} from '@react-three/postprocessing';
import { useConvexPolyhedron, useBox } from '@react-three/cannon';

const vector3 = new Vector3();
const box2 = new Box3();

export default function FurnitureFactoryPhysics({ furnitureObj }) {
  const [hovered, hover] = useState(null);
  const pivotRef = useRef();
  // const furnitureRef = useRef();
  // const boundary = useRef(new Vector3());
  const bbox = useStore((state) => state.bbox());
  const resizeFurniture = useStore((state) => state.resizeFurniture);
  const activeId = useStore((state) => state.activeId);
  const setActiveId = useStore((state) => state.setActiveId)
  const setActiveWall = useStore((state) => state.setActiveWall)
  const setIsDragged = useStore((state) => state.setIsDragged)
  const furnitureResizer = useStore((state) => state.furnitureResizer);
  const removeObject = useStore((state) => state.removeObject);
  const isActive = furnitureObj.id === activeId;
  const furnitureRef = useBox(() => ({
    type: isActive ? 'Dynamic' : 'Static'
  }), useRef());

  const beginingMatrix = useMemo(() => {
    const clampPosition = new Vector3().fromArray(furnitureObj.position).clamp(bbox.min, bbox.max);
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

  const handleRemoveObj = (obj) => {
    removeObject(obj);
    setActiveId(null);
  }

  useLayoutEffect(() => {
    box2.setFromObject(furnitureRef.current);
  }, [furnitureObj]);

  useLayoutEffect(() => {
    box2.setFromObject(furnitureRef.current);

    const m4 = matrix.current;
    const newPosition = vector3
      .set(m4.elements[12], m4.elements[13], m4.elements[14]);

    m4.setPosition(newPosition);
  }, [bbox]);

  useHelper(furnitureRef, BoxHelper, "cyan");
  // console.log(furnitureRef);

  return (
      <group ref={furnitureRef} key={`${furnitureObj.id}-gr`}>
        <Suspense>
            <Select enabled={isActive}>
              <PivotControls
                enabled={isActive}
                ref={pivotRef}
                key={furnitureObj.id}
                // fixed
                scale={2}
                activeAxes={[true, false, true]}
                autoTransform={false}
                matrix={matrix.current}
                visible={isActive}
                anchor={[0, -0.9, 0]}
                onDrag={(m, md, mW, mWd) => {
                  if (!matrix.current) return;

                  box2.setFromObject(furnitureRef.current);

                  const newPosition = vector3
                    .set(m.elements[12], m.elements[13], m.elements[14]);
                  m.setPosition(newPosition);
                  matrix.current.copy(m);
                }}
                onDragStart={() => {
                  setIsDragged(true);
                }}
                onDragEnd={() => {
                  setTimeout(() => setIsDragged(false), 0);
                }}
              />
              <Model
                id={furnitureObj.id}
                model={furnitureObj.model}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(e.eventObject.userData.id);
                  setActiveWall(null);
                }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
                dimensions={{
                  width: furnitureObj.width,
                  height: furnitureObj.height,
                  depth: furnitureObj.depth,
                }}
                receiveShadow={true}
                castShadow={true}
              />
            </Select>
          {/*</Center>*/}
        </Suspense>
      </group>
  );
}
