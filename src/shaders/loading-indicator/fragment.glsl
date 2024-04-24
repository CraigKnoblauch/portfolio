#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uProgress;

void main()
{
    // strength is 0 when the second arg is less than the first arg, and 1 when the second arg is greater than the first arg
    float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    float angle_of_progress = uProgress * (2.0 * PI); // Convert progress to radians. Angle goes counter clockwise from the center

    /**
        Calculate the angle of the uv coordinate counter clockwise from the center C
        Assume the point P represents the uv coordinate
    */
    // Step 1. Calculate the differences in the x and y coordinates from point P to the center C
    float dx = vUv.x - 0.5;
    float dy = vUv.y - 0.5;

    // Step 2.
    // Calculate the angle of P measured counter clockwise from the center C.
    // This should return the angle in radians from teh positive x-axis towards teh positive y-axis counter clockwise
    float angle_of_uv = atan(dy, dx);
    
    // Step 3.
    // Normalize the angle to be between 0 and 2PI
    if (angle_of_uv < 0.0)
    {
        angle_of_uv += 2.0 * PI;
    }

    /**
        Combine the knowledge of the uv angle and the angle of progress to determine the strength
        If the uv angle is <= angle of progress, then this pixel should be black (strenght = 0) if strength for this pixel is already 0
        The above is a long way to say we do nothing to the strength in that case.
        If the uv angle is > angle of progress, then this pixel should not be black even if the strength for this pixel is already 0
        The above is a long way to say we set the strength to 1 if the angle of uv is > than the angle of progress
    */
    if (angle_of_uv > angle_of_progress)
    {
        strength = 1.0;
    }
    
    // mix with the step value strength works as a decision
    // If strehgth is 0, the first arg will be the color. Black in this case
    // If strength is 1, the second arg will be the color. White in this case
    vec3 mixedColor = mix(vec3(0.0), vec3(1.0), strength);

    gl_FragColor = vec4(mixedColor, 1.0);
}