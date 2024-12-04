import {DoubleSide, Shape, ExtrudeGeometry} from 'three';

export default function ShapePath({
  position,
  rotation,
  width,
  depth,
  extrudeSettings= {
    steps: 1,
    depth: 0.04, //thickness
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 10
  }
}) {
  const path = new Shape();
  path.lineTo(width,0);
  path.bezierCurveTo( width + 0.02, 0, width + 0.02, 0, width + 0.02, depth - 0.02 );
  path.bezierCurveTo( width + 0.02, depth, width + 0.02, depth, width, depth );
  path.lineTo(0, depth)
  path.bezierCurveTo(-0.02, depth, -0.02, depth, -0.02, depth - 0.02);
  path.bezierCurveTo(-0.02, 0, -0.02, 0, 0, 0)

  const geometry = new ExtrudeGeometry(path, extrudeSettings);

  return (
      <mesh
        position={position}
        rotation={rotation}
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial side={DoubleSide} />
      </mesh>
  )
}
