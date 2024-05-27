uniform float uTime;
uniform sampler2D uJumpyPerlinTexture;
uniform float uJumpyPerlinTextureVertical;

varying vec2 vUv;

void main()
{
    vec3 newPosition = position;

    if (uv.y > 0.4) {

        float jumpyPerlin = texture(
            uJumpyPerlinTexture, 
            vec2(uJumpyPerlinTextureVertical, uv.y * 0.2 - uTime)
        ).r;

        newPosition.y -= jumpyPerlin * 2.0;

    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}