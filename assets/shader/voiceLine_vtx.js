//VERTEX
attribute vec3 trgPos;
varying vec2 vUv;

void main()
{
	vUv = uv;

	vec3 pos = vec3(position.x + trgPos.x, position.y + trgPos.y, position.z);
	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );	
	gl_Position = projectionMatrix * mvPosition;
}