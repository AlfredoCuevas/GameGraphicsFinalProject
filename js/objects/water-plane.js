function createWaterPlane(w, d, texPath){
	
	var geometry = new THREE.PlaneGeometry(w, d, 20, 20);

	//var tex = new THREE.TextureLoader().load(texPath);

	var shaderInput = {
		//uMap: {type: "t", value: tex },
		uTime: {type: 'f', value: 0.0 },
		uColor: {type: 'f', value: new THREE.Color('#0051da') },
	}

	var material = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: waterVShader,
		fragmentShader: waterFShader,
		side: THREE.DoubleSide,
	});

	var mesh = new THREE.Mesh(geometry, material);

	mesh.Start = function(){
		mesh.position.z = -10.0;
		mesh.rotateX(-Math.PI/2.0);
	}

	mesh.Update = function(){

	}

	return mesh;
}