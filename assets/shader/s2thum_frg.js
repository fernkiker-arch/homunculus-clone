uniform sampler2D tex;
uniform sampler2D waveTex;
uniform sampler2D mask;
uniform sampler2D noise;
uniform float alpha;
uniform float time;
uniform float waveScale;
uniform float wavePow;
uniform float shiftRGB;

//test
uniform sampler2D greenTex;

varying vec2 vUv;


vec2 mirror(vec2 v)
{
	vec2 m = mod(v, 2.0);
	return mix(m, 2.0 - m, step(1.0, m));
}


vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction)
{
	vec4 color = vec4(0.0);
	vec2 off1 = vec2(1.3846153846) * direction;
	vec2 off2 = vec2(3.2307692308) * direction;
	color += texture2D(image, uv) * 0.2270270270;
	color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
	color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
	color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
	color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
	return color;
}

void main()
{
	vec4 noiseCol = texture2D(noise, vUv * 0.5);

	vec4 waveCol = texture2D(waveTex, vec2(vUv.x * waveScale + time * 0.5, vUv.y * waveScale + time));
	vec4 greenCol = texture2D(greenTex, vUv);
	vec4 maskCol = texture2D(mask, vUv);

	////
	float strength = waveCol.r * wavePow * greenCol.g;
	float size = 2.0;//20.0;
    vec2 p = -1.0 + 2.0 * vUv;
    float dist = sin(-time * 1.0 + length(p * size));
    float distUvX = vUv.x + strength * 0.7 * dist;
	float distUvY = vUv.y + strength * 0.1 * dist;
	vec2 distUv = vec2(distUvX, distUvY);
	////

	vec4 distColR = texture2D(tex, distUv);
	vec4 distColG = texture2D(tex, distUv + shiftRGB * strength);
	vec4 distColB = texture2D(tex, distUv + (shiftRGB * 2.0) * strength);

	vec3 distCol = vec3(distColR.r, distColG.g, distColB.b);
	
	float aa = maskCol.a;

	if(aa < 0.0001)
	{
		discard;
	}
	else
	{
		gl_FragColor = vec4(distCol.rgb - noiseCol.r * 0.3 - greenCol.g * 0.1, aa * alpha);
	}
}