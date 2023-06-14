import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useTexture } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';

export default function Floor({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  width = 1,
  height = 1,
  castShadow = false,
  // textureUrl = '',
  textureRepeatX,
  textureRepeatY,
  onClick,
}) {
  const gl = useThree((state) => state.gl);
  const texture = useLoader(
    TextureLoader,
    'https://lh3.googleusercontent.com/fife/APg5EObZPfXP70WJEtLxJHxBDj6TsZSrvThB3wx7ZpBcLHdW1pmARLq4p6eTsTD-3VT3ZW0lLf9uApjrYaesJ3Ai8P6hVT92pX0pWl23mxIXQPNkGdh3vjTJDzVFZohY0FaKNon4_X1ahHNfRhHCq5xBJrzSZnqqkj-BebZfVrBE26BGn2kKSN9vhIrmWWkxHtV6XZWmuhjU-LaXxu-AGI9wfc7uL1D7c7vu-6drUkwFWOkwKbjQZCowYkfTXe2WPgnR33fz9-7jORb4HAEtYHBP5fvHE9OLAbHtymz1DqDh6MPg6t1SnqDwxb9vH8zt5wiSI-iEmRSpoyfRMHI9Z7p6khXvXaf2vEQ0OWnN4Q-6w_L9EQBXVLzYBlHUT1vihEzq9i-hcIHqTX5H222i515rvaiZ_Vs81ooTIa1Yq8IwJsrf88JnGnxvBVuWcVQduYT64BECColE61ocYBOXjw4B0wu4zQgYD0xZAQfCaTND9X3MvXZrtMYsrEQtbq8xBfT9ZL6pGuSYw446i3XPhBFSm-g4pJ2vwKEsa9N1xskCD8RnMbwweIb-of0azk5ROwRQv0MvNKn0uJWvtV4GEaudaOyMDSVfOEJRg4FywKGczTRVcX-wV1OaQoDy297DkKPekUmuHGBdrQ_BJQ3gnbg9N6_2lTzZIIVldmcC1O3AItssFksykDbnZmUzMAuDoXxl9QzDN076f9eSjsjyfLN5gYTuOX3YbZtDyM4vc6UXuDapVQTa33RDKADj8ZWKd79FGNS7kn0dM830BEA3jPwnGLS67SPkWtQwHxUpSBRBPMalCLoWT7cDaZhPnMgZTnL7xkC0E8LvtYSLtQ9wwRCDrBLLIF2lflLF-48AC58CF8Dbs2pB-6fs2GcDAmyhILC8uI_PMDYPiZJzhEi_XF6gjKEd4JQfD4VH3-OhpJR8NrGWvOOwxAbJJqsVgcHNPUWM7r9mYE1HiWio34wosDxuNZxDkDVZ8EUjMfbKCumkROGFx6Z0czja6X-kf_NFyUNIxfDn9CHWbblKhWcj2QFuUnUrOi66_09EPsxADrtR2kDJX4Xy7kbh98MUqTNEnRIOud_IWY_H6e4ieAnIya_dPcs9Vp9-iXe7_fBrArrwrM9GVh3AfPB5YoMvA0LbnOYE6Oskc3m7yeQerGCNiWVnJ6D0rlzG0gZ3ZTqEiEJztea3Ll8WOEMTlShWzNjSu4JupjNvg_gy18FC0i_t3oSPvGXJqaOUu-uLwlxVgZp6Z84nwHIvRIiW68g7B_Dm21-I90jrbvTYzTRfyTppcHUYJV5ehA5J9CO0fbeawKEVytTwiL93WhGr-UClfO9CWgpqUUj4vOn2yaokEqLTHLrZYeHVw_qsFQgmPj4ylDgUWadfR6pMVeOJygTr9Sttv0TFyyXJ7XnZ-lFgiVuUWZUlHPdw8vr4SnPXPJXbUzA6jT6wBSWI7XL9hMHOcXgiY_n9RBySvgFkcVZSP0XVYT3v6NKMorXv9jbEzgY1JSkHFnqegQAiwvcrXysthOjzwBTH7Rc9EPP5xuyg7B53OV_IjSRudzOzIVpXkI7SfA=w1706-h1319'
  );
  // const texture = useTexture(textureUrl);

  useLayoutEffect(() => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.repeat.set(textureRepeatX, textureRepeatY);
  }, [texture, textureRepeatX, textureRepeatY]);

  return (
    <>
      <mesh
        rotation={rotation}
        position={position}
        scale={[width, height, 1]}
        castShadow={castShadow}
        onClick={onClick}
      >
        <planeGeometry args={[1, 1]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
    </>
  );
}
