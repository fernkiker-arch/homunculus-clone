uniform sampler2D tex;
uniform sampler2D mask;
uniform float alpha;
uniform vec2 uResolution;
uniform float uBlurPow;

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


void main()
{
	vec4 blurCol = blur13(tex, vUv, uResolution, vec2(uBlurPow, uBlurPow));

	vec4 baseCol = texture2D(tex, vUv);
	vec4 maskCol = texture2D(mask, vUv);

	vec3 mixCol = mix(baseCol.rgb, blurCol.rgb, maskCol.r);
	//gl_FragColor = vec4(mixCol.rgb - (maskCol.r * 0.15), baseCol.a * alpha);
  gl_FragColor = vec4(mixCol.rgb - (maskCol.r * 0.13), baseCol.a * alpha);
}