import { useCallback, useState } from 'react';
import { useThreeStateContext } from '../../utils/threeStateContext.js';
import {
  Button,
  ButtonGroup,
  Modal,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const screens = [];

export default function ScreenShoot() {
  const [loader, setLoader] = useState(false);
  const [loaderPdf, setLoaderPdf] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const threeState = useThreeStateContext(state => state.get);

  const screenShotHandler = useCallback( async () => {
    setLoader(true);

    const three = threeState();

    const gl = three.gl;
    const camera = three.camera;
    const cameraControls = three.cameraControls;
    const so = {
      w: 1000,
      h: 1000,
    };

    cameraControls.saveState();
    three.setSizeOverride(so.w, so.h, 1);

    camera.aspect = so.w / so.h;
    camera.updateProjectionMatrix();

    await cameraControls.fitToSphere(three.scene, false);
    cameraControls.update(0);

    gl.render(three.scene, three.camera);

    screens.push(gl.domElement.toDataURL());

    three.resetSizeOverride();
    cameraControls.reset(false);
    cameraControls.update(0);
    gl.render(three.scene, three.camera);

    setLoader(false);
  }, []);

  const pdfCreateHandle = useCallback(async () => {
    setLoaderPdf(true);
    try {
      const pdfMake = await import("pdfmake/build/pdfmake.min.js").then(r => r.default);
      const pdfFonts = await import("pdfmake/build/vfs_fonts.js").then(r => r.default);

      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const ssArr = [];
      screens.forEach(ss => {
        ssArr.push({
          image: ss,
          width: 200,
        })
      });

      const dd = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
          'Projekt Ściśle ubogi Cela 1.0',
          ssArr,
        ],
        defaultStyle: {
          font: 'Roboto',
        }
      }

      pdfMake.createPdf(dd).download(`ProjektUbogiejCeli-10_${Date.now()}`);
      screens.splice(1);
    } catch (err) {
      console.error(err);
      setLoaderPdf(false);
    } finally {
      setLoaderPdf(false);
    }
  }, []);

  return (
    <>
      <ButtonGroup
        variant="contained"
        color="secondary"
        orientation="vertical"
      >
        <Button
          onClick={screenShotHandler}
          disabled={loader}
        >
          {loader ? '.....' : 'PDF ScreenShoot'}
        </Button>
        <Button
          onClick={() => setOpenModal(true)}
          disabled={screens.length === 0}
        >
          Show images
        </Button>
        <Button
          onClick={pdfCreateHandle}
          disabled={loaderPdf}
        >
          {loaderPdf ? '.....' : 'PDF Create'}
        </Button>
      </ButtonGroup>
      <Modal
        open={openModal}
        onClose={()=> setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={style}
        >
          <Typography id="modal-title" variant="h5" component="h2">
            Images for PDF.
          </Typography>
          <Typography id="modal-description">
            List of images inserted into PDF.
          </Typography>
          <ImageList
            cols={4}
            rowHeight={250}
            sx={{ minWidth: 400, maxHeight: '50vh' }}
          >
            {screens.length > 0 && screens.map((sc, indx) => (
              <ImageListItem key={`imageNo_${indx}`}>
                <img
                  src={`${sc}`}
                  srcSet={`${sc}`}
                  alt={`Image No. ${indx}`}
                  loading={'lazy'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </>
  )
}
