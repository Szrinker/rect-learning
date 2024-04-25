import { useCallback, useState, lazy } from 'react';
import {useThreeStateContext} from '../../utils/threeStateContext.js';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const screens = [];

export default function ScreenShoot() {
  const [loader, setLoader] = useState(false);
  const [loaderPdf, setLoaderPdf] = useState(false);
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
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      // pdfMake.fonts = {
      //   Roboto: {
      //     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
      //     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
      //     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
      //     bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      //   }
      // };

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
      screens.length = 0;

    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  }, []);

  console.log(screens)

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        margin: '10px auto auto auto'
      }}
    >
      <button
        type="button"
        onClick={screenShotHandler}
        disabled={loader}
      >
        {loader ? '.....' : 'PDF ScreenShoot'}
      </button>
      <button
        type="button"
        onClick={pdfCreateHandle}
        disabled={loaderPdf}
      >
        {loaderPdf ? '.....' : 'PDF Create'}
      </button>
    </div>
  )
}
