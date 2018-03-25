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

		precision mediump float;

		uniform sampler2D texture;
		uniform float rate;

		varying vec2 vUv;
		vec2 pos = gl_fragCoord.xy;



    void main(){
    	#include <clipping_planes_fragment>
			vec4 Texturizer = texture2D(texture,pos).a;


			Texturizer.a = 0.5;

      gl_FragColor = Texturizer;
    }
`;
