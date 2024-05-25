uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{
    // Flames
    float flames = texture(uPerlinTexture, vUv).r;

    gl_FragColor = vec4(vUv, 1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}