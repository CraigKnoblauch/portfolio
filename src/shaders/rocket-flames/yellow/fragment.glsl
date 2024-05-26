uniform float uTime;
uniform sampler2D uPerlinTexture;
uniform vec3 uHotFlameColor;
uniform vec3 uCoolFlameColor;

varying vec2 vUv;

void main()
{
    // Scale and animate
    vec2 flamesUv = vUv;
    // flamesUv.x *= 0.25; /// Use these to scale the flames if you choose
    flamesUv.y *= 0.5;

    flamesUv.y -= uTime * 1.2;

    // Flames
    float flames = texture(uPerlinTexture, flamesUv).r;

    // Change flame color based on y position
    vec3 flameColor = mix(uHotFlameColor, uCoolFlameColor, vUv.y);

    gl_FragColor = vec4(flameColor, flames);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}