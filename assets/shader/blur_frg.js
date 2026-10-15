uniform sampler2D tex;
uniform bool isHol;
uniform float uBlurN;


varying vec2 vUv;


vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction)
{
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;
  color += texture2D(image, uv) * 0.1964825501511404;
  color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
  color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
  return color;
}


vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main()
{
  //vec4 baseCol = texture2D( tex, vUv );
  //gl_FragColor = vec4( baseCol.rgb, 1.0 );

  ///////////////////////
  /*vec4 sum = vec4( 0.0 );
  float pp = 0.18;

  if(isHol)
  {
    sum += texture2D(tex, vec2(vUv.x - 9.0 * pp, vUv.y)) * uWeight[9];
    sum += texture2D(tex, vec2(vUv.x - 8.0 * pp, vUv.y)) * uWeight[8];
    sum += texture2D(tex, vec2(vUv.x - 7.0 * pp, vUv.y)) * uWeight[7];
    sum += texture2D(tex, vec2(vUv.x - 6.0 * pp, vUv.y)) * uWeight[6];
    sum += texture2D(tex, vec2(vUv.x - 5.0 * pp, vUv.y)) * uWeight[5];
    sum += texture2D(tex, vec2(vUv.x - 4.0 * pp, vUv.y)) * uWeight[4];
    sum += texture2D(tex, vec2(vUv.x - 3.0 * pp, vUv.y)) * uWeight[3];
    sum += texture2D(tex, vec2(vUv.x - 2.0 * pp, vUv.y)) * uWeight[2];
    sum += texture2D(tex, vec2(vUv.x - 1.0 * pp, vUv.y)) * uWeight[1];
    sum += texture2D(tex, vec2(vUv.x, vUv.y)) * uWeight[0];
    sum += texture2D(tex, vec2(vUv.x + 1.0 * pp, vUv.y)) * uWeight[1];
    sum += texture2D(tex, vec2(vUv.x + 2.0 * pp, vUv.y)) * uWeight[2];
    sum += texture2D(tex, vec2(vUv.x + 3.0 * pp, vUv.y)) * uWeight[3];
    sum += texture2D(tex, vec2(vUv.x + 4.0 * pp, vUv.y)) * uWeight[4];
    sum += texture2D(tex, vec2(vUv.x + 5.0 * pp, vUv.y)) * uWeight[5];
    sum += texture2D(tex, vec2(vUv.x + 6.0 * pp, vUv.y)) * uWeight[6];
    sum += texture2D(tex, vec2(vUv.x + 7.0 * pp, vUv.y)) * uWeight[7];
    sum += texture2D(tex, vec2(vUv.x + 8.0 * pp, vUv.y)) * uWeight[8];
    sum += texture2D(tex, vec2(vUv.x + 9.0 * pp, vUv.y)) * uWeight[9];
  }
  else
  {
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 9.0 * pp)) * uWeight[9];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 8.0 * pp)) * uWeight[8];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 7.0 * pp)) * uWeight[7];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 6.0 * pp)) * uWeight[6];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 5.0 * pp)) * uWeight[5];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 4.0 * pp)) * uWeight[4];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 3.0 * pp)) * uWeight[3];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 2.0 * pp)) * uWeight[2];
    sum += texture2D(tex, vec2(vUv.x, vUv.y - 1.0 * pp)) * uWeight[1];
    sum += texture2D(tex, vec2(vUv.x, vUv.y)) * uWeight[0];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 1.0 * pp)) * uWeight[1];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 2.0 * pp)) * uWeight[2];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 3.0 * pp)) * uWeight[3];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 4.0 * pp)) * uWeight[4];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 5.0 * pp)) * uWeight[5];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 6.0 * pp)) * uWeight[6];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 7.0 * pp)) * uWeight[7];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 8.0 * pp)) * uWeight[8];
    sum += texture2D(tex, vec2(vUv.x, vUv.y + 9.0 * pp)) * uWeight[9];
  }

  gl_FragColor = vec4( sum.rgb, 1.0 );
  */
  ///////////////////////


  vec4 sum = vec4( 0.0 );
  float pp = uBlurN;

  if( isHol )
	{
    //pp = 0.004;
		sum += texture2D( tex, vec2( vUv.x - 4.0 * pp, vUv.y ) ) * 0.051;
		sum += texture2D( tex, vec2( vUv.x - 3.0 * pp, vUv.y ) ) * 0.0918;
		sum += texture2D( tex, vec2( vUv.x - 2.0 * pp, vUv.y ) ) * 0.12245;
		sum += texture2D( tex, vec2( vUv.x - 1.0 * pp, vUv.y ) ) * 0.1531;
		sum += texture2D( tex, vec2( vUv.x, vUv.y ) ) * 0.1633;
		sum += texture2D( tex, vec2( vUv.x + 1.0 * pp, vUv.y ) ) * 0.1531;
		sum += texture2D( tex, vec2( vUv.x + 2.0 * pp, vUv.y ) ) * 0.12245;
		sum += texture2D( tex, vec2( vUv.x + 3.0 * pp, vUv.y ) ) * 0.0918;
		sum += texture2D( tex, vec2( vUv.x + 4.0 * pp, vUv.y ) ) * 0.051;
	}
  else
	{
    //pp = 0.008;
		sum += texture2D( tex, vec2( vUv.x, vUv.y - 4.0 * pp ) ) * 0.051;
		sum += texture2D( tex, vec2( vUv.x, vUv.y - 3.0 * pp ) ) * 0.0918;
		sum += texture2D( tex, vec2( vUv.x, vUv.y - 2.0 * pp ) ) * 0.12245;
		sum += texture2D( tex, vec2( vUv.x, vUv.y - 1.0 * pp ) ) * 0.1531;
		sum += texture2D( tex, vec2( vUv.x, vUv.y ) ) * 0.1633;
		sum += texture2D( tex, vec2( vUv.x, vUv.y + 1.0 * pp ) ) * 0.1531;
		sum += texture2D( tex, vec2( vUv.x, vUv.y + 2.0 * pp ) ) * 0.12245;
		sum += texture2D( tex, vec2( vUv.x, vUv.y + 3.0 * pp ) ) * 0.0918;
		sum += texture2D( tex, vec2( vUv.x, vUv.y + 4.0 * pp ) ) * 0.051;
	}

  gl_FragColor = vec4( sum.rgb, 1.0 );



  ////////////////////////////
  /*float bb = 1.3;
  vec2 dir = vec2(bb, bb);
  vec2 uResolution = vec2(1920.0, 1080.0);
  vec4 blurCol = blur13(tex, vUv, uResolution, dir);
  gl_FragColor = vec4( blurCol.rgb, 1.0 );*/
  /////////////////////////////

}