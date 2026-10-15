uniform sampler2D tex;
uniform sampler2D mask;
uniform sampler2D noise;
uniform float alpha;
uniform float shiftY;
uniform float maskShiftY;

varying vec2 vUv;


void main()
{
    vec4 noiseCol = texture2D(noise, vUv * 0.3);
    vec4 col = texture2D(tex, vec2(vUv.x, vUv.y + shiftY));
    vec4 maskCol = texture2D(mask, vec2(vUv.x, vUv.y + maskShiftY));

    float aa = min(col.a * alpha + maskCol.r * 0.40 * col.a, 1.0);
    gl_FragColor = vec4(col.rgb - noiseCol.r * 0.3, aa);
}