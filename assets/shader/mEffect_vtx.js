//VERTEX
attribute float alphas;

varying vec2 vUv;
varying float vAlpha;

void main()
{
	vUv = uv;
	vAlpha = alphas;

	vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}