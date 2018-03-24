var sandVShader = `

	uniform sampler2D sandHeightMap;
	uniform sampler2D sandNormalMap;
	uniform sampler2D sandMegaNormalMap;
	uniform float sandSpeed;

	uniform float displaceAmt; //controls the amount of vertex displacement...
	uniform float yOffset;
	
    varying float vDisplace; 
	varying vec2 vUv;

	#include <clipping_planes_pars_vertex> // Alfredo's edit

    //precision mediump float;

	void main() {
		#include <begin_vertex> // Alfredo's edit
       
		vUv = uv;
		vec2 timeShift = uv*1.0 + vec2(0.2*sandSpeed, 0.3*sandSpeed);
		vec2 megaShift = uv*8.0 + vec2(13.2*sandSpeed, 11.3*sandSpeed);
		vec4 clr = texture2D(sandHeightMap, uv);
		vec4 clr2 = texture2D(sandNormalMap, timeShift);
		vec4 clr3 = texture2D(sandMegaNormalMap, megaShift);
		float clrSum = clr.r+clr.g+clr.b;
		float clr2Sum = clr2.r+clr2.g+clr2.b;
		float clr3Sum = clr3.r+clr3.g+clr3.b;
		vDisplace = 0.333 * (clrSum + clr2Sum*0.8 + clr3Sum*0.15) * displaceAmt - (2.10*0.5*displaceAmt);
		vec3 offset = vec3(0.0, 0.0, yOffset); // GLSL z axis is vertical apparently
        vec3 newPosition = (offset + position.xyz + normal.xyz * vDisplace).xyz;
      
       	gl_Position = vec4( newPosition, 1.0 ) * modelMatrix * viewMatrix * projectionMatrix;

       	transformed = newPosition; // Alfredo's edit 
       	#include <project_vertex> 
        #include <clipping_planes_vertex> 
    }
`;

var sandFShader = `

	//precision mediump float;

	#include <clipping_planes_pars_fragment> // Alfredo's edit

	uniform sampler2D sandTexture; //, tSnow, tHill;
	uniform sampler2D fineTexture;
	uniform float sandSpeed;
	
	//attribute vec2 uv; 
	varying vec2 vUv;
	varying float vDisplace;

void main() {
	#include <clipping_planes_fragment> // Alfredo's edit

	//vUv = uv*8.0; 
	// repeat texture 1x, 8x 
	vec2 timeShift = vUv*1.0 + vec2(0.2*sandSpeed, 0.3*sandSpeed);
	vec2 megaShift = vUv*8.0 + vec2(13.2*sandSpeed, 11.3*sandSpeed);
	vec4 timeTex = texture2D(sandTexture, timeShift);
	vec4 megaTex = texture2D(fineTexture, megaShift);

	gl_FragColor = mix(timeTex, megaTex, 0.4);

}
`;