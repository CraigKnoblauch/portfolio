uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{
    vec3 newPosition = position;

    // Jumpiness in the bottom of the mesh
    // float jumpyPerlin = texture(
    //     uPerlinTexture,
    //     vec2(0.5, uTime)
    // ).r;

    // newPosition.y += sin(uTime);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}