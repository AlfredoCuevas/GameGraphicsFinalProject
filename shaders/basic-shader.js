var basicVShader = `

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

var basicFShader = `
    
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);
    }
`;