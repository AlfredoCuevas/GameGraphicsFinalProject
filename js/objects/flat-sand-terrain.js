function createSand(w, d, y, texture, normalMap, heightMap){
	
	var geometry = new THREE.PlaneGeometry(w, d, 256, 256);

	var shaderInput = {
		sandTexture: {type: "t", value: texture },
		sandNormalMap: {type: "t", value: normalMap },
		sandHeightMap: {type: "t", value: heightMap },
		displaceAmt: { type: "f", value: 5.0 },
		yOffset: { type: "f", value: y },
		//uTime: {type: 'f', value: 0.0 },
		//uColor: {type: 'f', value: new THREE.Color('#0051da') },
	}

	var material = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: sandVShader,
		fragmentShader: sandFShader,
		side: THREE.DoubleSide,
		clipping: true,
	});

	var mesh = new THREE.Mesh(geometry, material);

	mesh.Start = function(){
		//mesh.position.z = -3.0;
		mesh.position.y = -1.5;
		mesh.rotateX(-Math.PI/2.0);
	}

	mesh.Update = function(){

	}

	return mesh;
}