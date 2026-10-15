//FRAGMENT

uniform sampler2D tex;
uniform sampler2D noise;
uniform float alpha;

uniform float time;
uniform float strength;

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
  /*float uvXX = 4.5;//8.0;//22.0;
	float uvYY = 2.25;//4.0;//11.0;
	vec2 mirrorUv = mirror(vec2(vUv.x * uvXX, vUv.y * uvYY));
	vec4 noiseCol = texture2D( noise, mirrorUv );
	float wave = ((noiseCol.r - 0.5) * 2.0) * strength;

  vec2 dist = vec2(vUv.x * 0.75 + wave, vUv.y);
  vec4 col = texture2D( tex, dist );*/

  vec4 bCol = blur9(tex, vUv, vec2(1600.0, 800.0), vec2(0.0, 3.0));

  vec4 col = texture2D( tex, vUv );
	gl_FragColor = vec4( ((col.rgb * 0.9 + bCol.rgb * 0.2)), alpha );

  //gl_FragColor = vec4( darkCol.a, 0.0, 0.0, alpha );
}


/*uniform float time;
uniform vec2 resolution;


float interpolation(float f)
{
    return f * f * f * (f * (6.0 * f - 15.0) + 10.0);
}
float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
vec2 random2(vec2 v){
    return vec2(random(v), random(v + vec2(0.5, 0.5)));
}
vec2 animation2(vec2 v)
{
    return vec2(sin(v.x * 6.283 + time * 2.0) * 0.5 + 0.5, sin(v.y * 6.283 + time * 2.0) * 0.5 + 0.5);
}
void main(){
  vec2 r=resolution,p=(gl_FragCoord.xy*2.-r)/min(r.x,r.y);
  vec2 position = ( gl_FragCoord.xy / resolution.xy );
  vec3 color = vec3(.0);
  vec2 i_uv = floor(p * 8.0);
    vec2 f_uv = fract(p * 8.0);
    vec2 v1 = animation2(random2(i_uv + vec2(0.0, 0.0)));
    vec2 m_neighbor;
    float m_dist = 1.;
    for (int y= -1; y <= 1; y++) {
    for (int x= -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x),float(y));
          vec2 v1 = animation2(random2(i_uv + neighbor));
          vec2 diff = v1-f_uv+neighbor;
        float dist = length(diff);
        m_dist=min(dist,m_dist);
    }
    }
  color += m_dist;
  //color -= step(.7,abs(sin(27.0*m_dist)))*.5;
  //color += 1.-step(.02, m_dist);
  //color.r += step(.96, f_uv.x) + step(.96, f_uv.y);
  gl_FragColor = vec4(color,1.);
}*/