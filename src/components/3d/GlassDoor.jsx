import { Box } from "@react-three/drei";

export default function GlassDoor({
  color,
  scale,
  position,
  onClick,
}) {
  return (
    <>
      <Box
        args={[1, 1, 1]}
        scale={scale}
        position={position}
        onClick={onClick}
      >
        <meshPhysicalMaterial
          color={color}
          transmission={1}
          transparent
          roughness={0.2}
          reflectivity={0.6}
        />
      </Box>
    </>
  );
}
