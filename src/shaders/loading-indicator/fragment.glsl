#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uProgress;

void main()
{
    
    float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    float angle = (atan(vUv.x, vUv.y) + PI) / (PI * 2.0);
    if (angle < 0.5)
    {
        discard;
    }

    vec3 mixedColor = mix(vec3(0.0), vec3(uProgress, 1.0, 0), strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}