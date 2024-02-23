// import { Canvas } from "@react-three/fiber";
// import {XRButton, XR} from '@react-three/xr';
// import {Environment} from '@react-three/drei';
// import CustomCameraControls from "./components/3d/CustomCameraControls";
import Panel from "./components/Panel";
// import Scene from "./components/3d/Scene";
// import Postprocessing from './components/3d/Postprocessing.jsx';
// import { Selection } from '@react-three/postprocessing';
import useStore from './store/useStore.js';
// import useThreeState from './store/useThreeState.js';
import { useEffect } from 'react';
import { getProject } from './api/api.js';
import { useParams } from 'react-router-dom';
import {Html} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';

function App({
  injectCanvas,
}) {
  // const setActiveId = useStore((state) => state.setActiveId);
  // const setActiveWall = useStore((state) => state.setActiveWall);
  const setProjectId = useStore((state) => state.setProjectId);
  const setProject = useStore((state) => state.setProject);
  const { pid } = useParams();
  // const sceneRef = useRef();
  // const { setState } = useThreeState;

  useEffect(() => {
    async function loadProject() {
      if (pid) {
        try {
          const project = await getProject(pid);

          // if project is not defined, don't update the state
          if (project.id) {
            setProjectId(project.id);
            setProject(project.data);
          } else {
            console.error('Project not loaded correctly: ', project);
          }
        } catch (error) {
          // handle or log the error
          console.error('Error during loading the project: ', error);
        }
      }
    }

    loadProject();
  }, [pid]);

  const handleMissClick = (e) => {
    if (e.target.localName === 'canvas') {
      setActiveId(null);
      setActiveWall(null);
    }
  }

  return (
    <>
      <Panel />
      {/*<Canvas*/}
      {/*  className="canvas"*/}
      {/*  camera={{ position: [2, 2, 2] }}*/}
      {/*  frameloop={'demand'}*/}
      {/*  style={{ background: "#333333" }}*/}
      {/*  gl={{*/}
      {/*    localClippingEnabled: true,*/}
      {/*    preserveDrawingBuffer: true,*/}
      {/*    logarithmicDepthBuffer: true,*/}
      {/*  }}*/}
      {/*  shadows*/}
      {/*  flat*/}
      {/*  onPointerMissed={e => handleMissClick(e)}*/}
      {/*  // onCreated={(state) => {*/}
      {/*  //   setState(() => ({ three: state }));*/}
      {/*  // }}*/}
      {/*>*/}
      {/*  <Html>EEEEEEEEEEEEEEEEEEEEEEEEEEEEE</Html>*/}
      {/*</Canvas>*/}

      <div
        className="canvas-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
        ref={injectCanvas}
      />
    </>
  );
}

export default App;
