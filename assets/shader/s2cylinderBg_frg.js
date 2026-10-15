//FRAGMENT

uniform sampler2D noise;
uniform float alpha;

varying vec2 vUv;

vec2 mirror(vec2 v)
{
	vec2 m = mod(v, 2.0);
	return mix(m, 2.0 - m, step(1.0, m));
}

void main()
{
	//vec3 gCol = vec3(0.12, 0.12, 0.12);
	//vec2 nUv = mirror(vec2(vUv.x * 2., vUv.y * 0.2));
	vec2 nUv = vUv * 0.3;
	//vec2 nUv = vUv * 0.3;
	vec4 nCol = texture2D( noise, nUv );
	//float nn = pow(nCol.r, 4.) * 0.1;
	//gl_FragColor = vec4( gCol + vec3(nCol.r * 0.1), alpha );
	gl_FragColor = vec4( vec3(nCol.r * 0.2), alpha );
}