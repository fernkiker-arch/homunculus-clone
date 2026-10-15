//FRAGMENT
uniform sampler2D map;
uniform float alpha;

varying vec2 vUv;
varying float vAlpha;


void main()
{
	vec4 col = texture2D( map, vUv );
	gl_FragColor = vec4(col.rgb, col.a * vAlpha * alpha);
}

