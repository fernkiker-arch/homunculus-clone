uniform sampler2D tex;
uniform sampler2D blurTex;
uniform sampler2D effectTex;
uniform sampler2D maskTex;
uniform sampler2D noise;
uniform float alpha;
uniform float time;
uniform float strength;
uniform vec2 resolution;
uniform float isTransition;
uniform float fColPow;
uniform float fBlurPow;

varying vec2 vUv;


const float PI = 3.141592653589793;

float atan2(float yy, float xx)
{
	return xx == 0.0 ? sign(yy)*PI / 2.0 : atan(yy, xx);
}


void main()
{
	float size = 12.0;
	vec2 newUv2 = vUv;
	float maskGreen = 1.0;

	if(isTransition > 0.0)
	{
		//////////////////////////////////////////////////////
		vec4 maskCol = texture2D(maskTex, vUv);
		
		vec2 center = vec2(0.5, 0.7);
		float disX = vUv.x - center.x;
		float disY = vUv.y - center.y;
		float rr = sqrt(disX * disX + disY * disY);
		float kk = atan2(disY, disX);
		
		//float nx = cos(kk) * rr * (1.0 - maskCol.r * 0.6) + center.x;
		//float ny = sin(kk) * rr * (1.0 - maskCol.r * 0.6) + center.y;

		float nx = cos(kk) * rr * (1.0 - maskCol.r * 0.6) + center.x;
		float ny = sin(kk) * rr * (1.0 - maskCol.r * 0.6) + center.y;

		//float nx = cos(kk) * rr * (1.0 - sin(maskCol.b * 0.6)) + center.x;
		//float ny = sin(kk) * rr * (1.0 - sin(maskCol.b * 0.6)) + center.y;

		newUv2 = vec2(nx, ny);//newUv;
		maskGreen = 1.0 - maskCol.g;
	}
	///////////////////////////////////////////////////////

	vec4 noiseCol = texture2D(noise, vUv * 0.4);

	vec4 effectCol = texture2D(effectTex, vUv);
	float effectPow = 0.004;//0.004;
	vec2 euv = newUv2 + sin(effectCol.r * effectPow + effectCol.b * effectPow);

	float baseWave = (effectCol.r) * 0.016;// * (abs(vUv.x - 0.5) + 0.05);

	vec4 col_r = texture2D(tex, euv + baseWave);
	vec4 col_g = texture2D(tex, euv + baseWave * 0.6);
	vec4 col_b = texture2D(tex, euv + baseWave * 0.3);

	vec4 col = vec4(col_r.r, col_g.g, col_b.b, 1.0);
	
	vec4 blurCol = texture2D(blurTex, euv + baseWave);

	float blurNum = min(max(abs(vUv.y - 0.5) * 2.5, 0.0), 1.0);;
	float mixNum = mix(blurNum, 1.0, fBlurPow);
	vec3 mixCol = mix(col.rgb, blurCol.rgb, mixNum);

	//gl_FragColor = vec4(maskCol.rgb, 1.0);

	vec3 fCol = mixCol.rgb + (effectCol.rgb * 0.45) - noiseCol.r * 0.16;//0.16;
	vec3 fMinCol = fCol - 1.0 * fColPow;
	gl_FragColor = vec4(fMinCol, alpha * maskGreen);
}