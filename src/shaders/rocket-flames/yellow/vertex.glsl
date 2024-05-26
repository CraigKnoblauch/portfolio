uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main()
{
    vec3 newPosition = position;

    if (uv.y > 0.55) {

        float jumpyPerlin = texture(
            uPerlinTexture, 
            vec2(0.5, uv.y * 0.2 - uTime)
        ).r;

        newPosition.y -= jumpyPerlin * 2.0;

    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}