import { useCallback, useState } from 'react';
import {useThreeStateContext} from '../../utils/threeStateContext.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default function ScreenShoot() {
  const [loader, setLoader] = useState(false);
  const threeState = useThreeStateContext(state => state.get);

  const handler = useCallback( async () => {
    setLoader(true);

    const three = threeState();

    const gl = three.gl;
    const cameraControls = three.cameraControls;

    cameraControls.saveState();

    three.setSizeOverride(1000, 1000, 1);

    await cameraControls.rotateTo( -(Math.PI/3), Math.PI / 3, false);
    await cameraControls.fitToSphere(three.scene, false);
    cameraControls.update(0);

    await sleep(0);

    gl.render(three.scene, three.camera);
    // gl.render(three.scene, three.camera);

    gl.domElement.toBlob((blob) => {
      const a = document.createElement('a');
      a.download = 'FurnitureFactory.png';
      a.href = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    three.resetSizeOverride();
    cameraControls.reset(false);
    cameraControls.update(0);
    gl.render(three.scene, three.camera);

    setLoader(false);
  }, []);

  return (
    <button
      type="button"
      onClick={handler}
      disabled={loader}
    >
      {loader ? '.....' : 'ScreenShoot'}
    </button>
  )
}
