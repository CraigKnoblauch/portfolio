#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()
{
    float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    
    vec3 mixedColor = mix(vec3(0.0), vec3(1.0), strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}