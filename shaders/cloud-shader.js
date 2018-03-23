var CloudMap = `
	#include <clipping_planes_pars_vertex>

    void main(){
    	#include <begin_vertex>

        //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        #include <project_vertex>
        #include <clipping_planes_vertex>

    }
`;

var CloudColors = `
    #include <clipping_planes_pars_fragment>

    void main(){
    	#include <clipping_planes_fragment>

        gl_FragColor = vec4(0.9, 0.9, 0.9, 1.0);
    }
`;
