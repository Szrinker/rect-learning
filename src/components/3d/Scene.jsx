import {useCallback, useEffect} from 'react';
import useStore from "../../store/useStore";
import Room from "./Room.jsx";
import FurnitureFactory from "./FurnitureFactory.jsx";
import Lines from './Lines.jsx';
// import { useHitTest, useXREvent, Interactive, useInteraction, useXR } from '@react-three/xr';
// import {useFrame, useThree} from '@react-three/fiber';
// import {PivotControls} from '@react-three/drei';

export default function Scene() {
  const factory = useStore((state) => state.factory);
  const objects = useStore((state) => state.objects);
  const addObject = useStore((state) => state.addObject);
  const model = useStore((state) => state.model);
  const setActiveId = useStore((state) => state.setActiveId);
  const setActiveWall = useStore((state) => state.setActiveWall);
  const activeId = useStore((state) => state.activeId);
  const activeWall = useStore((state) => state.activeWall);

  // const { player, isPresenting  } = useXR();
  // const selectedObjectRef = useRef();
  // const selectedObjectPosition = useRef([0, 0, 0]);
  // const { gl, camera } = useThree();
  // const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') {
        setActiveId(null);
        setActiveWall(null);
      }
    };

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    }
  }, []);

  const addChair = useCallback((e) => {
    if (useStore.getState().isDragged) return;

    if (activeId) {
      setActiveId(null);
      return;
    }

    setActiveWall(null);

    if (!factory) return;


    const { point, normal, object } = e.intersections[0];
    const id = crypto.randomUUID();

    addObject({
      id: id,
      model: `/assets/${model}.glb`,
      position: point.toArray(),
      name: id.split("-").pop().slice(-5),
      width: 1,
      height: 1,
      depth: 1,
    });
  }, [model, factory, activeId]);

  // player.position.z = 3;
  // player.position.y = 1;
  //
  // const groupRef = useRef(sceneRef);
  // const grabbingController = useRef();
  // const previousTransform = useRef(undefined);
  //
  // // useXREvent('selectend', (e) => {
  // //   // console.log(e.target.controller, grabbingController.current);
  // //   if (e.target.controller === grabbingController.current) {
  // //     grabbingController.current = undefined;
  // //     previousTransform.current = undefined;
  // //   }
  // // });
  //
  // // useFrame(() => {
  // //   if (!grabbingController.current || !previousTransform.current || !groupRef.current) {
  // //     return;
  // //   }
  // //
  // //   const controller = grabbingController.current;
  // //   const group = groupRef.current;
  // //
  // //   group.applyMatrix4(previousTransform.current);
  // //   group.applyMatrix4(controller.matrixWorld);
  // //   group.updateWorldMatrix(false, true);
  // //
  // //   previousTransform.current = controller.matrixWorld.clone().invert();
  // // });
  //
  // useInteraction(sceneRef, 'onSelectEnd', (e) => {
  //   if (!grabbingController.current || !previousTransform.current || !sceneRef.current) {
  //     return;
  //   }
  //
  //   const controller = grabbingController.current;
  //   const group = sceneRef.current;
  //
  //   group.applyMatrix4(previousTransform.current);
  //   group.applyMatrix4(controller.matrixWorld);
  //   group.updateWorldMatrix(false, true);
  //
  //   previousTransform.current = controller.matrixWorld.clone().invert();
  // });
  //
  //
  // // useHitTest((hitMatrix, hit) => {
  // //   hitMatrix.decompose(sceneRef.current.position, sceneRef.current.quaternion, sceneRef.current.scale)
  // // });
  // //
  // //
  // // useHitTest((hitMatrix, hit) => {
  // //   // console.log(hit, hitMatrix);
  // //   // hitMatrix.decompose(sceneRef.current.position, sceneRef.current.quaternion, sceneRef.current.scale)
  // //   if (selectedObject) {
  // //     // console.log(selectedObject)
  // //     selectedObject.position.set(hit.matrix[12], hit.matrix[13], hit.matrix[14]);
  // //   }
  // // });
  // //
  // // const onGrab = (event) => {
  // //   // console.log(searchDeep(event.intersections[0].object).parent);
  // //   setSelectedObject(searchDeep(event.intersections[0].object).parent);
  // // };
  // //
  // // const onRelease = () => {
  // //   setSelectedObject(null);
  // // };

  return (
    <>
      <axesHelper />
      {/*<Lines />*/}
      <Room
        floorClicker={addChair}
        key="room"
      />

      {objects.map((furniture) => (
        <FurnitureFactory furnitureObj={furniture} key={`cf-${furniture?.id}`} />
      ))}
    </>
  );

  // return (
  //   <>
  //     {isPresenting ? (
  //       <Interactive
  //         ref={sceneRef}
  //         // onSelect={onGrab}
  //         //// onSelectStart={onGrab}
  //         // onSelectEnd={onRelease}
  //         // onMove={(e) => {
  //         //   console.log(e);
  //         //   grabbingController.current = e.target.controller;
  //         //   previousTransform.current = e.target.controller.matrixWorld.clone().invert();
  //         // }}
  //         onHover={(e) => {
  //           grabbingController.current = e.target.controller;
  //           previousTransform.current = e.target.controller.matrixWorld.clone().invert();
  //         }}
  //       >
  //         {/*{isPresenting ?? (*/}
  //         {/*  <PivotControls*/}
  //         {/*    visible*/}
  //         {/*    activeAxes={[true, false, true]}*/}
  //         {/*    autoTransform={false}*/}
  //         {/*    anchor={[0, -1, 0]}*/}
  //         {/*  />*/}
  //         {/*)}*/}
  //         <axesHelper />
  //         {/*<Lines />*/}
  //         <Room
  //           floorClicker={addChair}
  //           key="room"
  //         />
  //
  //         {objects.map((furniture) => (
  //           <FurnitureFactory furnitureObj={furniture} key={`cf-${furniture?.id}`} />
  //         ))}
  //       </Interactive>
  //     ) : (
  //       <>
  //         <axesHelper />
  //         <Lines />
  //         <Room
  //           floorClicker={addChair}
  //           key="room"
  //         />
  //
  //         {objects.map((furniture) => (
  //           <FurnitureFactory furnitureObj={furniture} key={`cf-${furniture?.id}`} />
  //         ))}
  //       </>
  //     )}
  //   </>
  // );
}

// export default forwardRef(Scene);
