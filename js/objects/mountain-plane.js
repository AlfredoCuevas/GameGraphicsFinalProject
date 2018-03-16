function createMountainPlane(w, d){

	var textureHM = new THREE.TextureLoader().load( './images/mountainTest/heightMap.jpg' );
	var textureHM2 = new THREE.TextureLoader().load('./images/mountainTest/angus.jpg');
	var texture2 = new THREE.TextureLoader().load(  './images/mountainTest/grass.png' );
    var texture3 = new THREE.TextureLoader().load(  './images/mountainTest/snow.jpg' );
    var texture4 = new THREE.TextureLoader().load(  './images/mountainTest/hill.jpg' );

	var geometry = new THREE.PlaneGeometry(w, d, 200, 200);

	var shaderInput= {
		displaceAmt: { type: "f", value: 2},
		tPic: { type: "t", value: textureHM},
        tPic2: {type: "t", value: textureHM2},
        heightMapMix: {type: "f", value: 0.01},
        tGrass: { type: "t", value: texture2},
        tSnow: { type: "t", value: texture3},
        tHill: { type: "t", value: texture4},
	};

	var material = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: mountainVShader,
		fragmentShader: mountainFShader,
		clipping: true,
	});

	material.side = THREE.DoubleSide;

	var mesh = new THREE.Mesh(geometry, material);

	mesh.Start = function(){
		mesh.rotateX(-Math.PI/2);
		mesh.position.y -= 1;
	}

	mesh.Update = function(){

	}

	return mesh;
}