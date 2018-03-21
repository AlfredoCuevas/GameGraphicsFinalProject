var waterVShader = `

    uniform vec3 camPosition;
    uniform vec3 lightPos;

    varying vec2 vUv;
    varying vec4 clipSpace;
    varying vec3 cameraVector;
    varying vec3 fromLightVector;

    void main(){
        vUv = uv * 2.0;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = clipSpace;

        cameraVector = camPosition - worldPos.xyz;
        fromLightVector = worldPos.xyz - lightPos;
    }
`;

var waterFShader = `

    varying vec2 vUv;
    varying vec4 clipSpace;
    varying vec3 cameraVector;
    varying vec3 fromLightVector;

    uniform vec3 uColor;
    uniform vec3 lightColor;
    uniform sampler2D uRefraction;
    uniform sampler2D uReflection;
    uniform sampler2D dudvMap;
    uniform sampler2D normalMap;

    uniform float moveFactor; // how fast the water seems to move

    const float waveStrength = 0.01; // how much the water ripples
    const float shineDamper = 20.0;
    const float reflectivity = 0.4;

    void main(){
        vec2 ndc = (clipSpace.xy/ clipSpace.w)/2.0 + 0.5;
        vec2 refractionTexCoords = vec2(ndc.x, ndc.y);
        vec2 reflectionTexCoords = vec2(ndc.x, 1.0 - ndc.y); // I need to flip the texture because it is a reflection

        // Add the ripples by distorting the water and applying it to the Tex coordinates
        // vec2 distortion1 = (texture2D(dudvMap, vec2(vUv.x + moveFactor, vUv.y)).rg) * waveStrength;
        // vec2 distortion2 = (texture2D(dudvMap, vec2(-vUv.x + moveFactor, vUv.y + moveFactor)).rg) * waveStrength;
        // vec2 totalDistortion = distortion1 + distortion2;

        vec2 distortion = texture2D(dudvMap, vec2(vUv.x + moveFactor, vUv.y)).rg * 0.1;
        distortion = vUv + vec2(distortion.x, distortion.y + moveFactor);
        vec2 totalDistortion = (texture2D(dudvMap, distortion).rg * 2.0 - 1.0) * waveStrength;

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
        refractiveFactor = pow( abs(refractiveFactor), 0.8);

        // create the normals for the water using the normal map.
        vec4 normalMapColor = texture2D(normalMap, distortion);
        vec3 normal = vec3(normalMapColor.r * 2.0 - 1.0, normalMapColor.b, normalMapColor.g * 2.0 - 1.0);
        normal = normalize(normal);

        // reflect the light using the normals. specularHighlights will only show at certain angles
        vec3 reflectedLight = reflect(normalize(fromLightVector), normal);
        float specular = max(dot(reflectedLight, viewVector), 0.0);
        specular = pow(specular, shineDamper);
        vec3 specularHighlights = lightColor * specular * reflectivity;

        gl_FragColor = mix(reflectionColor, refractionColor, refractiveFactor);
        gl_FragColor = mix(gl_FragColor, vec4(uColor, 1.0), 0.5) + vec4(specularHighlights, 0.0); // adding a blue tint and specularHighlights
    }
`;