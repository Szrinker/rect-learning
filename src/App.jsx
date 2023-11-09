import { Canvas } from "@react-three/fiber";
import {Environment} from '@react-three/drei';
import CustomCameraControls from "./components/3d/CustomCameraControls";
import Panel from "./components/Panel";
import Scene from "./components/3d/Scene";
import Postprocessing from './components/3d/Postprocessing.jsx';
import { Selection } from '@react-three/postprocessing';

function App() {
  return (
    <>
      <Panel />
      <Canvas
        className="canvas"
        camera={{ position: [2, 2, 2] }}
        style={{ background: "#333333" }}
        gl={{
          localClippingEnabled: true,
          antialias: false,
          // preserveDrawingBuffer: true,
          // logarithmicDepthBuffer: true,
        }}
        shadows
        flat
      >
        <Environment preset={'night'} />
        <CustomCameraControls
          options={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2,
            smoothTime: 0.15,
          }}
        />
        <ambientLight intensity={0.25} />
        <Selection>
          <Postprocessing />
          <Scene />
        </Selection>
      </Canvas>
    </>
  );
}

export default App;
