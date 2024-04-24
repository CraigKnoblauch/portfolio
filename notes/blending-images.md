# Blending textures
I'll have the situation coming where I need to put text onto materials, but I don't want to have to bake the materials every time I want to update text. I've found one solution is to put the text in an image where the text has full alpha and the background has 0 alpha. Then I can blend the text image with a base material and have the text appear. 

Here's some example code that I was able to get to work. 
```jsx
import { useEffect, useRef } from 'react';
import { useLoader, useThree, useFrame, extend } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping, ShaderMaterial } from 'three';
import { shaderMaterial } from "@react-three/drei";

const ImageBlendMaterial = shaderMaterial(
  { tDiffuse1: null, tDiffuse2: null },
  // vertex shader
  `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  // fragment shader
  `uniform sampler2D tDiffuse1;
  uniform sampler2D tDiffuse2;
  varying vec2 vUv;
  void main() {
    vec4 texel1 = texture2D(tDiffuse1, vUv);
    vec4 texel2 = texture2D(tDiffuse2, vUv);
    gl_FragColor = mix(texel1, texel2, texel2.a);
  }`
);

extend({ ImageBlendMaterial });

export default function ImageBlend() {
  const texture1 = useLoader(TextureLoader, 'path/to/base.png');
  const texture2 = useLoader(TextureLoader, 'path/to/text.png');
  const materialRef = useRef();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.tDiffuse1.value = texture1;
      materialRef.current.uniforms.tDiffuse2.value = texture2;
    }
  }, [texture1, texture2]);

  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <imageBlendMaterial attach="material" ref={materialRef} />
    </mesh>
  );
}
```