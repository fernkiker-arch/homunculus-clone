//FRAGMENT
uniform sampler2D map;
uniform sampler2D map_b;
uniform sampler2D noise;
uniform float mapScale;
uniform float alpha;

varying vec2 vUv;
varying vec2 vSuv;
varying float vAlpha;


void main()
{
	vec4 noiseCol = texture2D( noise, vUv * 0.7 );

	vec2 baseUv = vec2(vUv.x * mapScale + vSuv.x, vUv.y * mapScale + vSuv.y);
	
	vec2 newUv = baseUv;
	vec4 col = texture2D( map, newUv );
	vec4 colB = texture2D( map_b, newUv );

	//////////
	vec4 mixCol = mix(col, colB, noiseCol.r * 0.85);
	//////////

	gl_FragColor = vec4(mixCol.rgb, mixCol.a * vAlpha * alpha);
	//gl_FragColor = vec4(col.rgb, col.a * vAlpha * alpha);
}

