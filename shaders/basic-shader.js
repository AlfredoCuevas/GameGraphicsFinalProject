var basicVShader = `
	#include <clipping_planes_pars_vertex>

    void main(){
    	#include <begin_vertex>

        //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <project_vertex>
        #include <clipping_planes_vertex>

    }
`;

var basicFShader = `
    #include <clipping_planes_pars_fragment>

    void main(){
    	#include <clipping_planes_fragment>

        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

/*  These are what the #include calls are doing 

----------<clipping_planes_pars_vertex> ---------------------------------------------

#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )
	varying vec3 vViewPosition;
#endif



----------<begin_vertex> ------------------------------------------------------------

vec3 transformed = vec3( position );



----------<project_vertex> ----------------------------------------------------------

vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
gl_Position = projectionMatrix * mvPosition;



----------<clipping_planes_vertex>--------------------------------------------------

#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )
	vViewPosition = - mvPosition.xyz;
#endif



----------<clipping_planes_pars_fragment> ----------------------------------------

#if NUM_CLIPPING_PLANES > 0

	#if ! defined( PHYSICAL ) && ! defined( PHONG )
		varying vec3 vViewPosition;
	#endif

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif



----------<clipping_planes_fragment> ---------------------------------------------

#if NUM_CLIPPING_PLANES > 0

	for ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {

		vec4 plane = clippingPlanes[ i ];
		if ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;

	}
		
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {
			vec4 plane = clippingPlanes[ i ];
			clipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;
		}

		if ( clipped ) discard;
	
	#endif

#endif

*/