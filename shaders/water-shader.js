var waterVShader = `

    uniform vec3 camPosition;

    varying vec2 vUv;
    varying vec4 clipSpace;
    varying vec3 cameraVector;

    void main(){
        vUv = uv * 6.0;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = clipSpace;

        cameraVector = camPosition - worldPos.xyz;
    }
`;

var waterFShader = `

    varying vec2 vUv;
    varying vec4 clipSpace;
    varying vec3 cameraVector;

    uniform vec3 uColor;
    uniform sampler2D uRefraction;
    uniform sampler2D uReflection;
    uniform sampler2D dudvMap;

    uniform float moveFactor; // how fast the water seems to move

    const float waveStrength = 0.02; // how much the water ripples

    void main(){
        vec2 ndc = (clipSpace.xy/ clipSpace.w)/2.0 + 0.5;
        vec2 refractionTexCoords = vec2(ndc.x, ndc.y);
        vec2 reflectionTexCoords = vec2(ndc.x, 1.0 - ndc.y); // I need to flip the texture because it is a reflection

        // Add the ripples by distorting the water and applying it to the Tex coordinates
        vec2 distortion1 = (texture2D(dudvMap, vec2(vUv.x + moveFactor, vUv.y)).rg) * waveStrength;
        vec2 distortion2 = (texture2D(dudvMap, vec2(-vUv.x + moveFactor, vUv.y + moveFactor)).rg) * waveStrength;
        vec2 totalDistortion = distortion1 + distortion2;

        refractionTexCoords += totalDistortion;
        refractionTexCoords = clamp(refractionTexCoords, 0.001, 0.999 );

        reflectionTexCoords += totalDistortion;
        reflectionTexCoords = clamp(reflectionTexCoords, 0.001, 0.999);

        // Use the distorted texture coordinates to read from the FBO textures
        vec4 refractionColor = texture2D(uRefraction, refractionTexCoords);
        vec4 reflectionColor = texture2D(uReflection, reflectionTexCoords);

        //Creates a Fresnel effect by taking the dot product of the camera vector and the waters normal
        vec3 viewVector = normalize(cameraVector);
        float refractiveFactor = dot(viewVector, vec3(0.0, 1.0, 0.0));

        gl_FragColor = mix(reflectionColor, refractionColor, refractiveFactor);
        gl_FragColor = mix(gl_FragColor, vec4(uColor, 1.0), 0.5); // adding a blue tint
    }
`;