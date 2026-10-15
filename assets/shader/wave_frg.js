uniform sampler2D tex;
uniform sampler2D mask;
uniform sampler2D noise;
uniform float alpha;
uniform float strength;
uniform float time;
uniform float shiftY;

varying vec2 vUv;


void main()
{
    //vec4 noiseCol = texture2D(noise, vUv * 0.2);
    vec4 maskCol = texture2D(mask, vUv);

    vec2 waveUv = vec2(vUv.x, vUv.y + shiftY);
    float size = 15.0;
    vec2 p = -1.0 + 2.0 * vUv;
    float dist = sin(-time * 1.0 + length(p * size));
    vec2 newUv = waveUv + strength * vec2( dist, dist );

    vec4 col = texture2D(tex, newUv);
    gl_FragColor = vec4(col.rgb, (1.0 - maskCol.a) * alpha);
}