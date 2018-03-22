var sandVShader = `

	uniform sampler2D sandHeightMap;
	uniform sampler2D sandNormalMap;
	uniform float sandSpeed;

    //attribute vec3 position;
	//attribute vec2 uv;
	//attribute vec3 normal;

	uniform float displaceAmt; //controls the amount of vertex displacement...
	uniform float yOffset;
	
    varying float vDisplace; 
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex> // Alfredo's edit

    //precision mediump float;

	void main() {
		#include <begin_vertex> // Alfredo's edit
       
		vUv = uv;
		vec2 timeShift = uv*2.0 + vec2(sandSpeed, 0.6*sandSpeed);
		vec4 clr = texture2D(sandHeightMap, uv);
		vec4 clr2 = texture2D(sandNormalMap, timeShift);
		float clrSum = clr.r+clr.g+clr.b;
		float clr2Sum = clr2.r+clr2.g+clr2.b;
		vDisplace = 0.333 * (clrSum + clr2Sum*0.2) * displaceAmt - (1.2*0.5*displaceAmt);
		vec3 offset = vec3(0.0, 0.0, yOffset); // GLSL z axis is vertical apparently
        vec3 newPosition = (offset + position.xyz + normal.xyz * vDisplace).xyz;
      
       	gl_Position = projectionMatrix  * viewMatrix * modelMatrix  * vec4( newPosition, 1.0 );

       	transformed = newPosition; // Alfredo's edit 
       	#include <project_vertex> 
        #include <clipping_planes_vertex> 
    }
`;

var sandFShader = `

	//precision mediump float;

	#include <clipping_planes_pars_fragment> // Alfredo's edit

	uniform sampler2D sandTexture; //, tSnow, tHill;
	uniform float sandSpeed;
	
	//attribute vec2 uv; 
	varying vec2 vUv;
	varying float vDisplace; //this /has/ to be passed from the vtx shader then

	
	vec4 blend(float min, float value, float max, vec4 minTex, vec4 maxTex) {
		return mix(minTex, maxTex, (value-min)/(max-min));
	}

void main() {
	#include <clipping_planes_fragment> // Alfredo's edit

	//vUv = uv*8.0; 
	// repeat texture 2x 
	vec2 timeShift = vUv*2.0 + vec2(sandSpeed, 0.2*sandSpeed);
	vec4 grass = texture2D(sandTexture, timeShift);
	//grass += ;
	
	//float zOffset = vDisplace * 0.80;
	//float blendRange = 0.08; //how far zones bleed into each other (.06 both directions)
	//vec4 mix1 = mix(grass, hill, min(1.0,zOffset*1.0));
	//vec4 mix2 = max(vec4(1.0), mix(hill, snow, zOffset) * 1.5);

	gl_FragColor = vec4( grass.rgb, 1.0 ); //alpha here doesnt matter 
	
	//gl_FragColor = blend(shtaZ-blendRange, zOffset, shtaZ+blendRange, grass, hill);

}
`;