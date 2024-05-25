uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {

    // Scale and animate
    vec2 smokeUV = vUv;
    smokeUV.x *= 0.5;
    smokeUV.y *= 0.3;
    smokeUV.y -= uTime * 0.04;

    // Smoke
    float smoke = texture(uPerlinTexture, smokeUV).r;

    // Remap for transparency
    smoke = smoothstep(0.4, 1.0, smoke);

    // Remap for edges, x are sides, y are top and bottom
    smoke *= smoothstep(0.0, 0.1, vUv.x);
    smoke *= 1.0 - smoothstep(0.9, 1.0, vUv.x);
    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= 1.0 - smoothstep(0.9, 1.0, vUv.y);


    gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}