//FRAGMENT

uniform sampler2D mask;
uniform sampler2D noise;
uniform sampler2D noise2;

uniform float alpha;
uniform float maskY;

varying vec2 vUv;

vec2 mirror(vec2 v)
{
	vec2 m = mod(v, 2.0);
	return mix(m, 2.0 - m, step(1.0, m));
}

void main()
{
	/*float strength = 0.05;
	vec4 noiseCol2 = texture2D(noise2, mirror(vec2(vUv.x * 5.0, vUv.y * 2.0)));
	float wave = ((noiseCol2.r - 0.5) * 2.0) * strength;


	vec4 maskCol = texture2D(mask, vec2(vUv.x + wave, (vUv.y + maskY) + wave));
	vec4 noiseCol = texture2D( noise, vUv * 0.25 );
	gl_FragColor = vec4( noiseCol.rgb * 0.15 + maskCol.r * 0.2, alpha * maskCol.a );*/

	vec4 noiseCol = texture2D( noise, vUv * 0.25 );
	gl_FragColor = vec4( noiseCol.rgb * 0.10, alpha );
}