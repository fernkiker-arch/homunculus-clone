uniform sampler2D tex;
uniform sampler2D waveT;
uniform sampler2D noise;
uniform float noisePow;
uniform float alpha;

varying vec2 vUv;



void main()
{
	vec4 baseCol = texture2D(tex, vUv);
	vec4 waveCol = texture2D(waveT, vUv);
	vec4 noiseCol = texture2D(noise, vUv * 0.2);

	gl_FragColor = vec4((waveCol.rgb * 0.3 + baseCol.rgb) - noiseCol.r * noisePow, (baseCol.a * alpha));
}