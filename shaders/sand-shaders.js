var sandVShader = `

	uniform sampler2D sandHeightMap;
	uniform sampler2D sandNormalMap;

    //attribute vec3 position;
	//attribute vec2 uv;
	//attribute vec3 normal;

	uniform float displaceAmt; //controls the amount of vertex displacement...
	uniform float yOffset;
	
    varying float vDisplace; 
	varying vec2 vUv;

    //precision mediump float;

	void main() {
       
		vUv = uv;
		vec4 clr = texture2D(sandHeightMap, uv);
		vec4 clr2 = texture2D(sandNormalMap, uv);
		float clrSum = clr.r+clr.g+clr.b;
		float clr2Sum = clr2.r+clr2.g+clr2.b;
		vDisplace = 0.333 * (clrSum + clr2Sum*2.0) * displaceAmt - (3.0*0.5*displaceAmt);
		vec3 offset = vec3(0.0, 0.0, yOffset); // GLSL z axis is vertical apparently
        vec3 newPosition = (offset + position.xyz + normal.xyz * vDisplace).xyz;
      
       	gl_Position = projectionMatrix  * viewMatrix * modelMatrix  * vec4( newPosition, 1.0 );
    }
`;

var sandFShader = `

	//FYI: most of the stuff in here is GLSL API calls
	//precision mediump float;

	uniform sampler2D sandTexture; //, tSnow, tHill;

	//attribute vec2 uv; not fucking worth it
	varying vec2 vUv;
	varying float vDisplace; //this /has/ to be passed from the vtx shader then

	//so this is in C I guess??? -> evidently, since it doesnt like nested functions
	vec4 blend(float min, float value, float max, vec4 minTex, vec4 maxTex) {
	return mix(minTex, maxTex, (value-min)/(max-min));
	}

void main() {
	//vUv = uv*8.0; 
	vec4 grass = texture2D(sandTexture, vUv);
	//vec4 hill = texture2D(tHill, vUv);
	//vec4 snow = texture2D(tSnow, vUv);
	float zOffset = vDisplace * 0.80;
	float shtaZ = 0.48;
	float ueZ = 0.69;
	float blendRange = 0.08; //how far zones bleed into each other (.06 both directions)
	//float highZ = 0.6;
	/*vec4 mix1 = mix(grass, hill, min(1.0,zOffset*1.0));
	vec4 mix2 = max(vec4(1.0), mix(hill, snow, zOffset) * 1.5);
	vec4 mix3 = mix(mix1, mix2, zOffset);
	*/
	
	gl_FragColor = vec4( grass.rgb, 1.0 ); //alpha here doesnt matter 
	
	/*if (ueZ + blendRange < zOffset) {
		gl_FragColor = vec4(snow.rgb, 1.0);
	}
	else if (ueZ - blendRange < zOffset) {
		gl_FragColor = blend(ueZ-blendRange, zOffset, ueZ+blendRange, hill, snow);
	}
	else if (shtaZ + blendRange < zOffset) {
		gl_FragColor = vec4(hill.rgb, 1.0);
	}
	else if (shtaZ - blendRange < zOffset) {
		gl_FragColor = blend(shtaZ-blendRange, zOffset, shtaZ+blendRange, grass, hill);
	}
	*/
}
`;