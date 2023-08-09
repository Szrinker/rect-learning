import { Canvas } from "@react-three/fiber";
import CustomCameraControls from "./components/3d/CustomCameraControls";
import Panel from "./components/Panel";
import Scene from "./components/3d/Scene";

function App() {
  return (
    <>
      <Panel />
      <Canvas
        className="canvas"
        camera={{ position: [2, 2, 2] }}
        shadows
        style={{ background: "#333333" }}
        gl={{
          localClippingEnabled: true,
        }}
      >
        <CustomCameraControls
          options={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2,
            // minDistance: 5,
            smoothTime: 0.15,
          }}
        />
        <ambientLight intensity={1} />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
