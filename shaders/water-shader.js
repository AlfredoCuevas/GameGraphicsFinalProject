var waterVShader = `

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

var waterFShader = `

    uniform vec3 uColor;

    void main(){
        gl_FragColor = vec4(uColor.rgb, 1.0);
    }
`;