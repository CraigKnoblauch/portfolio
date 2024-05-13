#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform sampler2D uTexture;

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
  return smoothstep(0.55, 0.45, abs(d / thickness) * 5.0);
}

void main()
{
    float border = 0.15; // adjust to change the thickness of the border
    float radius = 0.15; // adjust to change the roundness of the corners

    // NOTE adjust size to change the utilization of the area of the plane
    float strength = roundedFrame(vec2(0.50), vec2(0.33), radius, border);

    // Put the provided texture in the center of the plane
    float scale = 1.5;
    vec2 uvScaled = vec2(vUv.x * scale - 0.25, vUv.y * scale - 0.25);
    vec4 texColor = texture2D(uTexture, uvScaled);

    // Set the alpha value of texColor to 0 for black pixels
    if (texColor.rgb == vec3(0.0)) {
        texColor.a = 0.0;
    } 
    
    gl_FragColor = mix(texColor, vec4(1.0), strength);
}