var waterVShader = `

    varying vec2 vUv;

    void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

var waterFShader = `

    varying vec2 vUv;
    uniform vec3 uColor;
    uniform sampler2D uRefraction;
    uniform sampler2D uReflection;

    void main(){
        vec4 tex1 = texture2D(uRefraction, vUv);

        gl_FragColor = vec4(tex1);
    }
`;