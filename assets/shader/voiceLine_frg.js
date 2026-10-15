uniform sampler2D tex;
uniform sampler2D noise;
uniform float alpha;
uniform float shiftX;
uniform float isXAlpha;

varying vec2 vUv;

vec2 mirror(vec2 v)
{
	vec2 m = mod(v, 2.0);
	return mix(m, 2.0 - m, step(1.0, m));
}

void main()
{
    vec2 nUv = mirror(vec2(vUv.x * 6.0, vUv.y * 0.1));
    vec4 noiseCol = texture2D(noise, nUv);

    float xa = min(abs(vUv.x - 0.5) * 4.6, 1.0);
    if(isXAlpha < 1.0)
    {
        xa = 1.0;
    }

    //vec3 col = vec3(1.0, 1.0, 1.0);
    vec4 col = texture2D(tex, vec2(vUv.x + shiftX, vUv.y * 0.2));
    vec3 fCol = mix(col.rgb, vec3(1.0, 1.0, 1.0), 0.4);

    gl_FragColor = vec4(fCol.rgb, (alpha - noiseCol.r * 0.2) * xa);
}