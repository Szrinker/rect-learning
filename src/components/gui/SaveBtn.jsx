import { useCallback, useState } from 'react';
import useStore from '../../store/useStore.js';
import { saveProject } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';

export default function SaveBtn() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const setProjectId = useStore(state => state.setProjectId);
  const projectId = useStore(state => state.projectId);
  const objects = useStore(state => state.objects);
  const scale = useStore(state => state.scale);
  const holedWalls = useStore(state => state.holedWalls);
  const wallThickness = useStore(state => state.wallThickness);

  const handler = useCallback( async () => {
    setLoader(true);

    const data = await saveProject(
      projectId,
      {
        scale: scale,
        objects: objects,
        holedWalls: holedWalls,
        wallThickness: wallThickness,
      }
    );

    setProjectId(data.id);
    navigate(`project/${data.id}`);

    setLoader(false);
  }, [projectId, objects, scale, holedWalls, wallThickness,]);

  return (
    <button
      type="button"
      onClick={handler}
      disabled={loader}
    >
      {loader ? '.....' : 'Save'}
    </button>
  )
}
