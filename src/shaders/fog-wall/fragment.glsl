uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform vec3 uHotFlameColor;
uniform vec3 uCoolFlameColor;

varying vec2 vUv;

void main()
{
    // Scale and animate
    vec2 fogUv = vUv;
    fogUv.x *= 7.5; /// Use these to scale the fog if you choose
    fogUv.y *= 0.5;

    fogUv.y += uTime * 0.05;

    // Fog
    float fog = texture(uPerlinTexture, fogUv).r;

    // Make fog white
    gl_FragColor = vec4(vec3(1.0), fog);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}