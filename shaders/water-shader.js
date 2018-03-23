var waterVShader = `

    uniform vec3 camPosition;
    uniform vec3 lightPos;

    varying vec2 vUv;
    varying vec4 clipSpace;
    varying vec3 cameraVector;
    varying vec3 fromLightVector;

    void main(){
        vUv = uv * 3.0;
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
    uniform sampler2D depthMap;

    uniform float moveFactor; // how fast the water seems to move

    const float waveStrength = 0.02; // how much the water ripples
    const float shineDamper = 20.0;
    const float reflectivity = 0.4;

    void main(){
        vec2 ndc = (clipSpace.xy/ clipSpace.w)/2.0 + 0.5;
        vec2 refractionTexCoords = vec2(ndc.x, ndc.y);
        vec2 reflectionTexCoords = vec2(ndc.x, 1.0 - ndc.y); // I need to flip the texture because it is a reflection

        // Finding the waterDepth  by using the depthMap and waterDistance (distance from camera to the plane)
        float near = 0.1; // near plane and far plane. These should be the same as the ones defined in the perspective camera
        float far = 10000.0;
        float depth = texture2D(depthMap, refractionTexCoords).r;
        float floorDistance = 2.0 * near * far / (far + near - (2.0 * depth - 1.0) * (far - near));

        depth = gl_FragCoord.z;
        float waterDistance = 2.0 * near * far / (far + near - (2.0 * depth - 1.0) * (far - near));
        float waterDepth = floorDistance - waterDistance;

        // Add the ripples by distorting the water and applying it to the Tex coordinates
        // vec2 distortion1 = (texture2D(dudvMap, vec2(vUv.x + moveFactor, vUv.y)).rg) * waveStrength;
        // vec2 distortion2 = (texture2D(dudvMap, vec2(-vUv.x + moveFactor, vUv.y + moveFactor)).rg) * waveStrength;
        // vec2 totalDistortion = distortion1 + distortion2;

        vec2 distortion = texture2D(dudvMap, vec2(vUv.x + moveFactor, vUv.y)).rg * 0.1;
        distortion = vUv + vec2(distortion.x, distortion.y + moveFactor);
        vec2 totalDistortion = (texture2D(dudvMap, distortion).rg * 2.0 - 1.0) * waveStrength * clamp(waterDepth/20.0, 0.0, 1.0);

        refractionTexCoords += totalDistortion;
        refractionTexCoords = clamp(refractionTexCoords, 0.001, 0.999 );

        reflectionTexCoords += totalDistortion;
        reflectionTexCoords = clamp(reflectionTexCoords, 0.001, 0.999);

        // Use the distorted texture coordinates to read from the FBO textures
        vec4 refractionColor = texture2D(uRefraction, refractionTexCoords);
        vec4 reflectionColor = texture2D(uReflection, reflectionTexCoords);

        // create the normals for the water using the normal map. normalMapColor.b is multiplied by a number to make the normals point upward more.
        vec4 normalMapColor = texture2D(normalMap, distortion);
        vec3 normal = vec3(normalMapColor.r * 2.0 - 1.0, normalMapColor.b * 6.0, normalMapColor.g * 2.0 - 1.0);
        normal = normalize(normal);

        //Creates a Fresnel effect by taking the dot product of the camera vector and the waters normal
        vec3 viewVector = normalize(cameraVector);
        float refractiveFactor = dot(viewVector, normal);
        refractiveFactor = pow( abs(refractiveFactor), 1.0);
        refractiveFactor = clamp(refractiveFactor, 0.0, 1.0);

        // reflect the light using the normals. specularHighlights will only show at certain angles
        vec3 reflectedLight = reflect(normalize(fromLightVector), normal);
        float specular = max(dot(reflectedLight, viewVector), 0.0);
        specular = pow(specular, shineDamper);
        vec3 specularHighlights = lightColor * specular * reflectivity * clamp(waterDepth/2.0, 0.0, 1.0); // specularHighlights are reduced on edges

        gl_FragColor = mix(reflectionColor, refractionColor, refractiveFactor);
        gl_FragColor = mix(gl_FragColor, vec4(uColor, 1.0), 0.5) + vec4(specularHighlights, 0.0); // adding a blue tint and specularHighlights
        gl_FragColor.a = clamp(waterDepth/8.0, 0.0, 1.0); // changing the alpha value(transparency) based on the water depth to create soft edges
    }
`;
