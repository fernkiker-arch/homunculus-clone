uniform sampler2D tex;
uniform sampler2D noise;
uniform float alpha;

varying vec2 vUv;



void main()
{
	vec4 baseCol = texture2D(tex, vUv);
	vec4 noiseCol = texture2D(noise, vUv * 0.6);

	/*if(baseCol.a < 0.001)
	{
		discard;
	}
	else
	{
		gl_FragColor = vec4(baseCol.rgb, (baseCol.a * alpha) - noiseCol.r * 0.4);
	}*/
	gl_FragColor = vec4(baseCol.rgb, (baseCol.a * alpha) - pow(noiseCol.r * 1.0, 2.0));
	//gl_FragColor = vec4(baseCol.rgb, baseCol.a * alpha);
}