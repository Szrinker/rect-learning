import ShapePath from "components/3d/ShapePath";
import {Center} from '@react-three/drei'
import {DoubleSide, Vector3, CubicBezierCurve3} from 'three';
import {useMemo} from 'react';


export default function Desk({
  position = [0, 0, 0],
  maxHeight,
  height,
  width,
  depth,
  legWidth,
  legDepth,
  extrudeSettingsTop= {
    steps: 1,
    depth: 0.04, //thickness
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 10
  },
  extrudeSettingsLeg = {
    steps: 1,
    depth: 0.04, //thickness
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 10
  },
  cableThickness = 0.02,
}) {
  const cableHeight = height - 0.03;
  const cableShape = useMemo(() => {
    const h = 0.459 * Math.sqrt(maxHeight ** 2 - cableHeight ** 2) + 0.407 * Math.sqrt(maxHeight ** 2 - cableHeight ** 2);
    return new CubicBezierCurve3(
      new Vector3(0.4, cableHeight, 0),
      new Vector3(h, cableHeight/2, 0),
      new Vector3(0, cableHeight/2, h),
      new Vector3(0, 0, -0.2),
    );
  }, [height])

  return (
    <group position={position}>
      <Center disableY>
        <ShapePath
          position={[0, height, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          width={width}
          depth={depth}
          extrudeSettings={extrudeSettingsTop}
        />
        <ShapePath
          position={[0.6, 0, 0.6]}
          rotation={[-Math.PI / 2, 0, 0]}
          width={legWidth}
          depth={legDepth}
          extrudeSettings={extrudeSettingsLeg}
        />
        <mesh
          position={[legWidth*2, 0, legDepth*2]}
          castShadow
          receiveShadow
        >
          <tubeGeometry args={[cableShape, 45, cableThickness, 10]}/>
          <meshStandardMaterial color={0xffffff} side={DoubleSide}/>
        </mesh>
      </Center>
    </group>
  )
}
