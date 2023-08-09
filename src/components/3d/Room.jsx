import Wall from './Wall.jsx';
import ThickWall from './ThickWall.jsx';
import Floor from './Floor.jsx';
import Light from './Light.jsx';
import useStore from '../../store/useStore';

export default function Room({ wallClicker, floorClicker }) {
  const scale = useStore((state) => state.scale);
  const textureUrl = "https://lh3.googleusercontent.com/fife/APg5EObZPfXP70WJEtLxJHxBDj6TsZSrvThB3wx7ZpBcLHdW1pmARLq4p6eTsTD-3VT3ZW0lLf9uApjrYaesJ3Ai8P6hVT92pX0pWl23mxIXQPNkGdh3vjTJDzVFZohY0FaKNon4_X1ahHNfRhHCq5xBJrzSZnqqkj-BebZfVrBE26BGn2kKSN9vhIrmWWkxHtV6XZWmuhjU-LaXxu-AGI9wfc7uL1D7c7vu-6drUkwFWOkwKbjQZCowYkfTXe2WPgnR33fz9-7jORb4HAEtYHBP5fvHE9OLAbHtymz1DqDh6MPg6t1SnqDwxb9vH8zt5wiSI-iEmRSpoyfRMHI9Z7p6khXvXaf2vEQ0OWnN4Q-6w_L9EQBXVLzYBlHUT1vihEzq9i-hcIHqTX5H222i515rvaiZ_Vs81ooTIa1Yq8IwJsrf88JnGnxvBVuWcVQduYT64BECColE61ocYBOXjw4B0wu4zQgYD0xZAQfCaTND9X3MvXZrtMYsrEQtbq8xBfT9ZL6pGuSYw446i3XPhBFSm-g4pJ2vwKEsa9N1xskCD8RnMbwweIb-of0azk5ROwRQv0MvNKn0uJWvtV4GEaudaOyMDSVfOEJRg4FywKGczTRVcX-wV1OaQoDy297DkKPekUmuHGBdrQ_BJQ3gnbg9N6_2lTzZIIVldmcC1O3AItssFksykDbnZmUzMAuDoXxl9QzDN076f9eSjsjyfLN5gYTuOX3YbZtDyM4vc6UXuDapVQTa33RDKADj8ZWKd79FGNS7kn0dM830BEA3jPwnGLS67SPkWtQwHxUpSBRBPMalCLoWT7cDaZhPnMgZTnL7xkC0E8LvtYSLtQ9wwRCDrBLLIF2lflLF-48AC58CF8Dbs2pB-6fs2GcDAmyhILC8uI_PMDYPiZJzhEi_XF6gjKEd4JQfD4VH3-OhpJR8NrGWvOOwxAbJJqsVgcHNPUWM7r9mYE1HiWio34wosDxuNZxDkDVZ8EUjMfbKCumkROGFx6Z0czja6X-kf_NFyUNIxfDn9CHWbblKhWcj2QFuUnUrOi66_09EPsxADrtR2kDJX4Xy7kbh98MUqTNEnRIOud_IWY_H6e4ieAnIya_dPcs9Vp9-iXe7_fBrArrwrM9GVh3AfPB5YoMvA0LbnOYE6Oskc3m7yeQerGCNiWVnJ6D0rlzG0gZ3ZTqEiEJztea3Ll8WOEMTlShWzNjSu4JupjNvg_gy18FC0i_t3oSPvGXJqaOUu-uLwlxVgZp6Z84nwHIvRIiW68g7B_Dm21-I90jrbvTYzTRfyTppcHUYJV5ehA5J9CO0fbeawKEVytTwiL93WhGr-UClfO9CWgpqUUj4vOn2yaokEqLTHLrZYeHVw_qsFQgmPj4ylDgUWadfR6pMVeOJygTr9Sttv0TFyyXJ7XnZ-lFgiVuUWZUlHPdw8vr4SnPXPJXbUzA6jT6wBSWI7XL9hMHOcXgiY_n9RBySvgFkcVZSP0XVYT3v6NKMorXv9jbEzgY1JSkHFnqegQAiwvcrXysthOjzwBTH7Rc9EPP5xuyg7B53OV_IjSRudzOzIVpXkI7SfA=w1706-h1319";
  const roomSize = useStore((state) => state.roomSize());
  const wallThickness = useStore((state) => state.wallThickness);

  const wallHeight = roomSize.height;
  const halfX = roomSize.width / 2;
  const halfY = wallHeight / 2;
  const halfZ = roomSize.depth / 2;

  const texRepeatX = scale.x;
  const texRepeatY = scale.z;

  const walls = [
    {
      key: 'redWall',
      geometry: [roomSize.width + wallThickness * 2, wallHeight, wallThickness],
      position: [0, halfY, -halfZ - wallThickness / 2],
      rotation: [0, 0, 0],
      color: 0xff0000,
      width: roomSize.width,
    },
    {
      key: 'greenWall',
      geometry: [roomSize.depth + wallThickness * 2, wallHeight, wallThickness],
      position: [-halfX - wallThickness / 2, halfY, 0],
      rotation: [0, Math.PI/2, 0],
      color: 0x08000,
      width: roomSize.depth,
    },
    {
      key: 'blueWall',
      geometry: [roomSize.width + wallThickness * 2, wallHeight, wallThickness],
      position: [0, halfY, halfZ + wallThickness / 2],
      rotation: [0, -Math.PI, 0],
      color: 0x0000ff,
      width: roomSize.width,
    },
    {
      key: 'yellowWall',
      geometry: [roomSize.depth + wallThickness * 2, wallHeight, wallThickness],
      position: [halfX + wallThickness / 2, halfY, 0],
      rotation: [0, -Math.PI/2, 0],
      color: 0xffff00,
      width: roomSize.depth,
    },
  ];

  return (
    <>
      <Light castShadow={true} position={[0, 0.8, 0]} />
      {walls.map((wall) => (
        // <Wall
        //   key={wall.key}
        //   rotation={wall.rotation}
        //   position={wall.position}
        //   color={wall.color}
        //   width={wall.width}
        //   height={wallHeight}
        //   onClick={wallClicker}
        // />
        <ThickWall
          key={wall.key}
          rotation={wall.rotation}
          position={wall.position}
          color={wall.color}
          geometry={wall.geometry}
          // onClick={wallClicker}
          width={wall.width}
          height={wallHeight}
          thickness={wallThickness}
        />
      ))}
      <Floor
        rotation={[-Math.PI / 2, 0, 0]}
        color="orange"
        width={roomSize.width}
        depth={roomSize.depth}
        position={[0, 0, 0]}
        castShadow={true}
        textureUrl={textureUrl}
        textureRepeatX={texRepeatX}
        textureRepeatY={texRepeatY}
        onClick={floorClicker}
      />
    </>
  );
}
