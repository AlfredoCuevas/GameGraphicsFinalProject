var mountainVShader = `
		// uniform mat4 modelMatrix;
  //       uniform mat4 viewMatrix;
  //       uniform mat4 projectionMatrix;

  //       attribute vec3 position;
  //       attribute vec2 uv;
  //       attribute vec3 normal;

        uniform sampler2D tPic;
        uniform sampler2D tPic2;
        uniform float heightMapMix;
        uniform float displaceAmt;

        varying float vDisplace;
        varying vec2 vUv;

        precision mediump float;

        #include <clipping_planes_pars_vertex>

        void main(){
        	#include <begin_vertex>

            vUv = uv;

            vec4 clr = texture2D(tPic, uv);
            vec4 clr2 = texture2D(tPic2, uv);
            vec4 clr3 = mix(clr, clr2, heightMapMix);

            vDisplace = clr3.r * displaceAmt;
            vec3 newPosition = (position.xyz + normal.xyz * vDisplace).xyz;

            transformed = newPosition;

            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(newPosition, 1.0);

            #include <project_vertex>
        	#include <clipping_planes_vertex>
        }
`;

var mountainFShader = `
        precision mediump float;
        #include <clipping_planes_pars_fragment>

        uniform sampler2D tGrass, tSnow, tHill;

        varying vec2 vUv;
        varying float vDisplace;

        void main(){
        	#include <clipping_planes_fragment>

            vec4 grass = texture2D(tGrass, vUv);
            vec4 snow = texture2D(tSnow, vUv);
            vec4 hill = texture2D(tHill, vUv);

            float zOffset = vDisplace;

            vec4 mix1 = mix(grass, hill, min(1.0, zOffset*8.0));
            vec4 mix2 = max(vec4(1.0), mix(hill, grass, zOffset) * 1.5);
            vec4 mix3 = mix(mix1, mix2, zOffset);

            gl_FragColor = vec4(mix1.rgb, 1.0);
        }
`;