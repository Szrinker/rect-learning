import Panel from "components/Panel";
import useStore from 'store/useStore';
import { useEffect } from 'react';
import { getProject } from 'api/api';
import { useParams } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, teal } from '@mui/material/colors';
import {useThreeStateContext} from 'utils/threeStateContext';

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: teal,
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        disableGutters
        id="container"
        style={{
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/*<Box*/}
        {/*  display="flex"*/}
        {/*  alignItems="center"*/}
        {/*>*/}
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
        {/*</Box>*/}
      </Container>
    </ThemeProvider>
  );
}

export default App;
