//FRAGMENT

uniform sampler2D tex;
uniform sampler2D traceT;
uniform float alpha;
uniform float pattNumX;
uniform float pattNumY;
uniform float shiftX;

varying vec2 vUv;

void main()
{
	vec4 traceCol = texture2D(traceT, vUv);
	//vec4 noiseCol = texture2D(noise, vUv * 1.0);
	
	vec4 col = texture2D( tex, vec2(vUv.x * pattNumX, vUv.y * pattNumY + shiftX) );
	gl_FragColor = vec4( col.rgb, (col.a * alpha * traceCol.r) );
	//gl_FragColor = traceCol;
}