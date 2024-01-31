// import { createStore } from 'zustand/vanilla';
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useThreeState = create(
  devtools(
    (set, get) => ({
      three: null,
      screenShoot: () => {
        const three = useThreeState.getState().three;
        const canvas = three.gl.domElement;

        return canvas.toDataURL();
      },
    }),
    {
      name: "ThreeState"
    }
  ),
);

export default useThreeState;
