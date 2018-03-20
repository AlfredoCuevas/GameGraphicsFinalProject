function createSimpleBox(w, h, d){

    var cube = new THREE.BoxGeometry(w, h, d);

    var shaderInput = {}

    var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: basicVShader,
        fragmentShader: basicFShader,
        clipping: true,
    });

    var mesh = new THREE.Mesh(cube, material);

    mesh.Start = function(){
        mesh.position.y += 1.0;
    }

    mesh.Update = function(){

        mesh.rotation.x += 0.05;
        //mesh.position.x = 10 * Math.sin(performance.now() * 0.005);
    }

    return mesh;
}