uniform sampler2D noise;
uniform sampler2D tex;
uniform sampler2D texBlur;
uniform sampler2D texColor;
uniform sampler2D traceT;
uniform float alpha;
uniform float time;


varying vec2 vUv;

vec2 mirror(vec2 v)
{
	vec2 m = mod(v, 2.0);
	return mix(m, 2.0 - m, step(1.0, m));
}


void main()
{
	/////
	/*float size = 8.0;
    vec2 ringP = -1.0 + 2.0 * vUv;
    float ringDist = sin(length(ringP * size));
    vec2 redDistResult = 0.08 * vec2( ringDist, ringDist );

	vec2 ringUv = vec2(vUv.x, vUv.y * 1.2 + distTY) + redDistResult;
	vec4 ringCol = texture2D(distT, ringUv);
	float ringRed = ringCol.r;

	vec4 noiseCol = texture2D(noise, mirror(vec2(vUv.x * 16.0, vUv.y * 6.0)));
	float strength = ringRed * 0.3;
	float wave = ((noiseCol.r - 0.5) * 2.0) * (strength * noiseCol.r);
	vec2 distUv = vUv + sin(wave * 0.01);

	vec4 distColR = texture2D(tex, distUv);
	vec4 distColG = texture2D(tex, distUv + 0.002 * ringRed);
	vec4 distColB = texture2D(tex, distUv + 0.001 * ringRed);

	vec3 distCol = vec3(distColR.r, distColG.g, distColB.b);
	
	gl_FragColor = vec4( distCol.rgb - ringRed * 0.4, distColR.a * alpha );*/
	/////

	////////
	vec4 traceCol = texture2D(traceT, vUv);
	///////

	//vec4 noiseCol = texture2D(noise, vec2(vUv.x * 0.3, vUv.y * 0.6));

	float size = 4.0;
    vec2 p = -1.0 + 2.0 * vUv;
	float dd = sin(length(p * size));
    vec2 distUv = vUv + traceCol.r * 0.018 * vec2( dd, dd );
	//vec2 distUv = vUv + sin(traceCol.r * 0.015);

	//float size = 8.0;
	//vec2 pp = -1.0 + 2.0 * vUv;
    //vec2 distUv = vUv + sin(-pp * traceCol.r) * 0.1;

	/*vec4 baseColR = texture2D( tex, distUv + traceCol.r * 0.003 );
	vec4 baseColG = texture2D( tex, distUv );
	vec4 baseColB = texture2D( tex, distUv - traceCol.r * 0.003 );
	vec4 baseCol = vec4(baseColR.r, baseColG.g, baseColB.b, mix(baseColR.a + baseColG.a + baseColB.a, baseColG.a, 1.0 - traceCol.r));

	vec4 graColR = texture2D( texCol, distUv + traceCol.r * 0.003 );
	vec4 graColG = texture2D( texCol, distUv );
	vec4 graColB = texture2D( texCol, distUv - traceCol.r * 0.003 );
	vec4 graCol = vec4(graColR.r, graColG.g, graColB.b, mix(graColR.a + graColG.a + graColB.a, graColG.a, 1.0 - traceCol.r));*/


	vec4 baseCol = texture2D( tex, distUv );
	vec4 blurCol = texture2D( texBlur, distUv );
	vec4 graCol = texture2D( texColor, mirror(distUv + vec2(time, time)) );

	vec4 mixCol = mix(baseCol, vec4(blurCol.rgb * 0.8, blurCol.a), traceCol.r * 0.8);

	
	vec3 mixCol2 = mix(mixCol.rgb, graCol.rgb, min(traceCol.r * 0.5, 1.0));

	//vec3 fCol = vec3(mixCol.r + traceCol.r * 0.2, mixCol.g - traceCol.r * 0.05, mixCol.b);
	//gl_FragColor = vec4( fCol, mixCol.a );
	
	gl_FragColor = vec4( mixCol2.rgb - traceCol.r * 0.06, mixCol.a );
}