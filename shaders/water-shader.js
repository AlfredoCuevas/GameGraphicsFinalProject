var waterVShader = `

    varying vec2 vUv;
    varying vec4 clipSpace;

    void main(){
        vUv = uv;
        clipSpace = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = clipSpace;
    }
`;

var waterFShader = `

    varying vec2 vUv;
    varying vec4 clipSpace;
    uniform vec3 uColor;
    uniform sampler2D uRefraction;
    uniform sampler2D uReflection;

    void main(){
        vec2 ndc = (clipSpace.xy/ clipSpace.w)/2.0 + 0.5;
        vec2 refractionTexCoords = vec2(ndc.x, ndc.y);
        vec2 reflectionTexCoords = vec2(ndc.x, 1.0 - ndc.y); // I need to flip the texture because it is a reflection

        vec4 refractionColor = texture2D(uRefraction, refractionTexCoords);
        vec4 reflectionColor = texture2D(uReflection, reflectionTexCoords);

        gl_FragColor = mix(reflectionColor, refractionColor, 0.5);
    }
`;