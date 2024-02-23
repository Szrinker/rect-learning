import { useCallback, useState } from 'react';
// import useThreeState from '../../store/useThreeState.js';
import {useThreeStateContext} from '../../utils/threeStateContext.js';

export default function ScreenShoot() {
  // const three = useThreeState((state) => state.three);
  // const screenShoot = useThreeState((state) => state.screenShoot);
  const [loader, setLoader] = useState(false);
  const gl = useThreeStateContext(state => state.gl);

  const handler = useCallback(() => {
    setLoader(true);

    // const ss = screenShoot();
    const ss = gl.domElement.toDataURL();

    const url = document.createElement('a');
    url.download = 'FurnitureFactory.png';
    url.href = ss;
    document.body.appendChild(url);
    url.click();
    document.body.removeChild(url);

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
