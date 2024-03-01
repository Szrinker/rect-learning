import Panel from "./components/Panel";
import useStore from './store/useStore.js';
import { useEffect } from 'react';
import { getProject } from './api/api.js';
import { useParams } from 'react-router-dom';
import {useThreeStateContext} from './utils/threeStateContext.js';

function App({
  injectCanvas,
}) {
  const setProjectId = useStore((state) => state.setProjectId);
  const setProject = useStore((state) => state.setProject);
  const { pid } = useParams();

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
