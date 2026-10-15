/* Credits: 
   Author: [uuuulala](https://github.com/paper-desig/shader)
*/

uniform sampler2D uTex;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uPhase;
uniform float uScale;
uniform float uBrightness;
uniform float uAlpha;
uniform float uShiftX;

uniform int uRepeat;
uniform float uPowNum;

varying vec2 vUv;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t)
{
	vec2 sine_acc = vec2(0.);
	vec2 res = vec2(0.);
	float scale = 8.;

	for (int j = 0; j < uRepeat; j++) {
		uv = rotate(uv, 1.);
		sine_acc = rotate(sine_acc, 1.);
		vec2 layer = uv * scale + float(j) + sine_acc - t;
		layer.y *= 0.95;
		sine_acc += sin(layer);
		res += (.5 + .5 * cos(layer)) / scale;
		scale *= (1.2);
	}
	return res.x + res.y;
}

void main() 
{
	vec4 texCol = texture2D(uTex, vUv);

	vec4 bgCol = vec4(0.0, 0.0, 0.0, 1.0);
	vec4 mainCol = vec4(1.0, 1.0, 1.0, 1.0);

	vec2 uv = vUv;//gl_FragCoord.xy / uResolution.xy;

	uv -= .5;
	float scale = .75 * uScale + 1e-4;
	uv *= (.001 * (1. - step(1. - scale, 1.) / scale));
	uv *= uResolution;
	uv += .5;

	float t = uTime * (uSpeed * 3.) + (uPhase * 10.);

	float noise = neuro_shape(vec2(uv.x + uShiftX, uv.y + uTime * 0.1), t);

	noise = uBrightness * pow(noise, 2.0);
	noise += pow(noise, uPowNum);//
	noise = max(.0, noise - .5);

	vec3 color = mix(bgCol.rgb * bgCol.a, mainCol.rgb * mainCol.a, noise);
	//float opacity = 1.0;//mix(bgCol.a, mainCol.a, noise);

	//gl_FragColor = vec4(color, opacity * uAlpha);

	gl_FragColor = vec4(texCol.rgb + color.r * 0.2, uAlpha * color.r);
}