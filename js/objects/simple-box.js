function createSimpleBox(w, h, d){

    var cube = new THREE.BoxGeometry(w, h, d);

    var shaderInput = {}

    var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: basicVShader,
        fragmentShader: basicFShader,
    });

    var mesh = new THREE.Mesh(cube, material);

    mesh.Start = function(){
        mesh.position.z = 0.0;
    }

    mesh.Update = function(){
        mesh.rotation.x += 0.05;
    }

    return mesh;
}