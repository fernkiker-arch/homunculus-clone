//VERTEX
attribute float ks;
attribute float rs;
attribute float rnd;
attribute float rnd2;
attribute vec2 noiseUvs;

uniform sampler2D noise;
uniform float size;
uniform float radius;
uniform float rotSpeed;

varying float vAlpha;
varying vec4 vNoiseCol;


void main()
{
	vec4 noiseCol = texture2D( noise, noiseUvs );

	/*float kk = ks + sin(noiseCol.r * 0.3);// * rnd;
	float rr = (radius + rs);
	float xx = cos(kk) * rr;
	float yy = sin(kk) * rr;*/

	float kk = ks - rotSpeed * rnd - noiseCol.r * 0.04;// + sin(noiseCol.r * 0.3);
	float rr = rs;// + sin(noiseCol.r) * 70.0 * rnd;
	float xx = cos(kk) * rr;
	float yy = sin(kk) * rr;
	float zz = 0.0;//sin(noiseCol.r) * 100.0;

	vec4 mvPosition = modelViewMatrix * vec4( position.x + xx, position.y + yy, position.z + zz, 1.0 );
	
	gl_PointSize = size * rnd;

	vNoiseCol = noiseCol;
	vAlpha = rnd;
	gl_Position = projectionMatrix * mvPosition;
}