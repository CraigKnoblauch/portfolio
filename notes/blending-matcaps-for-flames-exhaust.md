For the flames of the rocket, I need a smooth transition from the flames right out of the rocket, which are a bright yellow, to the flames lower down which are a pale blue. I think I still want the matcap effect like I get in the exhaust right now, but obviously I can't have a hundred different matcaps to cover all these transitions. Copilot recommended I could try blending the matcaps together. Here's the code it recommended:

```jsx
import { ShaderMaterial, UniformsUtils, UniformsLib } from 'three';

const matcapShaderMaterial = new ShaderMaterial({
  uniforms: UniformsUtils.merge([
    UniformsLib.common,
    {
      matcap1: { value: matcapTexture1 },
      matcap2: { value: matcapTexture2 },
      blendFactor: { value: 0.5 } // 0.0 = 100% matcap1, 1.0 = 100% matcap2
    }
  ]),
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D matcap1;
    uniform sampler2D matcap2;
    uniform float blendFactor;
    varying vec2 vUv;
    void main() {
      vec4 color1 = texture2D(matcap1, vUv);
      vec4 color2 = texture2D(matcap2, vUv);
      gl_FragColor = mix(color1, color2, blendFactor);
    }
  `,
  matcap: true
});

// Then use this material in your mesh
```

I would probably use this material for all meshes that I'm using as downward exhaust, and use the distance from the nozzle as the blend factor.