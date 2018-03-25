var CloudMap =`
	#include <clipping_planes_pars_vertex>

	varying vec2 vUv;

	void main(){
	 #include <begin_vertex>

		vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

			#include <project_vertex>
			#include <clipping_planes_vertex>

		}
`;

var CloudColors =`
		#include <clipping_planes_pars_fragment>

	 uniform sampler2D texture;
	 uniform float rate;

	 varying vec2 vUv;

		void main(){
		 #include <clipping_planes_fragment>

				gl_FragColor = texture2D(texture,vUv);
				gl_FragColor.a = gl_FragColor.r;
		}
`;
