import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { CameraControls } from "@react-three/drei"
import Panel from './components/Panel';
import Scene from './components/3d/Scene';

function App() {
  return (
    <>
      <Panel />
      <Canvas className="canvas" camera={{ position: [2, 2, 2] }} shadows style={{background: '#333333'}}>
      <CameraControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
        {/* <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        /> */}
        <ambientLight intensity={0.2} />
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
