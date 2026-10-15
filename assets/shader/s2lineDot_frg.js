//FRAGMENT
uniform sampler2D map;
uniform float alpha;
uniform float time;

varying vec2 vUv;
varying float vAlpha;

void main()
{
	/*float size = 20.0;
    vec2 p = -1.0 + 2.0 * vUv;
    float dist = sin(time + length(p * size));
    float strength = 0.03;
	vec2 distUv = vUv + strength * vec2( dist, dist * 0.2 );*/

	vec4 col = texture2D( map, vUv );

	gl_FragColor = vec4(col.rgb, col.a * alpha * vAlpha);
}

