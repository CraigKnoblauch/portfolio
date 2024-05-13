#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

/**
 * NOTE This only works on planes that are perfect squares
 */

/**
 * Many thanks to gPlatl for the roundedFrame
 * https://www.shadertoy.com/view/MssyRN
 * Created by gPlatl in 2017-02-17
 */
float roundedFrame (vec2 pos, vec2 size, float radius, float thickness)
{
  float d = length(max(abs(vUv - pos),size) - size) - radius;
  return 1.0 - smoothstep(0.55, 0.45, abs(d / thickness) * 5.0);
  // Note remove the (1.0 -) to invert the color
}

void main()
{
    float border = 0.15; // adjust to change the thickness of the border
    float radius = 0.15; // adjust to change the roundness of the corners

    // NOTE adjust size to change the utilization of the area of the plane
    float strength = roundedFrame(vec2(0.50), vec2(0.33), radius, border);
    gl_FragColor = mix(vec4(1.0), vec4(0.0), strength);
}