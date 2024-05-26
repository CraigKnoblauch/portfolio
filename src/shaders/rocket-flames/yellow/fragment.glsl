uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform vec3 uHotFlameColor;

varying vec2 vUv;

void main()
{
    // Scale and animate
    vec2 flamesUv = vUv;
    // flamesUv.x *= 0.5; /// Use these to scale the flames if you choose
    flamesUv.y *= 0.5;

    flamesUv.y -= uTime;

    // Flames
    float flames = texture(uPerlinTexture, flamesUv).r;

    gl_FragColor = vec4(uHotFlameColor, flames);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}