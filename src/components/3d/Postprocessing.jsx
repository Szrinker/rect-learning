import {EffectComposer, Outline, SSAO, Bloom} from '@react-three/postprocessing';
import {BlendFunction} from 'postprocessing';
import {HalfFloatType} from 'three';

export default function Postprocessing() {

  return (
    <>
      <EffectComposer
        multisampling={6}
        autoClear={false}
        frameBufferType={HalfFloatType}
        enableNormalPass
      >
        <Outline blur visibleEdgeColor="white" edgeStrength={100} width={1000} />
        <SSAO
          blendFunction={BlendFunction.MULTIPLY} // blend mode
          samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
          rings={6} // amount of rings in the occlusion sampling pattern
          distanceThreshold={0.1} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
          distanceFalloff={0.1} // distance falloff. min: 0, max: 1
          rangeThreshold={0} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
          rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
          luminanceInfluence={0.5} // how much the luminance of the scene influences the ambient occlusion
          radius={0.05} // occlusion sampling radius
          scale={1} // scale of the ambient occlusion
          bias={0.6} // occlusion bias
          intensity={20}
          color="black"
          depthAwareUpsampling={true}
        />
        <Bloom
          mipmapBlur
          luminanceThreshold={1}
          levels={8}
        />
      </EffectComposer>
    </>
  );
}
