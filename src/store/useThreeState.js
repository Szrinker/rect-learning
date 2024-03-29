import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useThreeState = create(
  devtools(
    (set, get) => ({
      three: null,
      screenShoot: () => {
        const three = get().three;
        const canvas = three.gl.domElement;

        return canvas.toDataURL();
      },
    }),
    {
      name: "ThreeState",
      serialize: {
        options: false,
      },
    }
  ),
);

export default useThreeState;
