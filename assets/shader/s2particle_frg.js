//FRAGMENT
uniform sampler2D tex;
uniform float alpha;
varying float vAlpha;
varying vec4 vNoiseCol;
void main()
{
	vec4 baseCol = texture2D( tex, gl_PointCoord );
	//gl_FragColor = vec4( 1.0, 1.0, 1.0, baseCol.a * alpha * pow(vNoiseCol.r, 2.0) * vAlpha );
	gl_FragColor = vec4( 1.0, 1.0, 1.0, baseCol.a * alpha * pow(vNoiseCol.r, 3.0) );
}