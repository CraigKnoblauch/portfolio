varying vec2 vUv;

// Shouldn't be a need to change the vertices
void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
}