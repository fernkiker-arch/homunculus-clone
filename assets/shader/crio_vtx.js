#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

//VERTEX
attribute float alphas;
attribute float zDist;
attribute float mixNum;

varying vec2 vUv;
varying float vAlpha;
varying float vZDist;
varying float vMixNum;


#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>


void main()
{
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>


	vUv = uv;
	vZDist = zDist;
	vMixNum = mixNum;
	
	float rad = 0.01;
	float xx = position.x;
	float yy = position.y;
	float zz = position.z;

	vec4 mvPosition2 = modelViewMatrix * instanceMatrix * vec4( xx, yy, zz, 1.0 );
	vViewPosition = mvPosition2.xyz;
	
	//vViewPosition = -mvPosition.xyz;
	//vAlpha = max(min(alphas * (position.z / 10.0), 1.0), 0.0);
	vAlpha = alphas;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

	gl_Position = projectionMatrix * mvPosition2;
}