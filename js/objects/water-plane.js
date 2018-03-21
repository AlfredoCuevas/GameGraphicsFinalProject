function createWaterPlane(w, d, bufferTextureRefraction, bufferTextureReflection, texPath){
	
	var geometry = new THREE.PlaneGeometry(w, d, 20, 20);

	var dudvTex = new THREE.TextureLoader().load(texPath);


	var shaderInput = {
		uRefraction: {type: "t", value: bufferTextureRefraction },
		uReflection: {type: "t", value: bufferTextureReflection },
		dudvMap: {type: "t", value: dudvTex },
		moveFactor: {type: 'f', value: 0.0 }, 
		uTime: {type: 'f', value: 0.0 },
		uColor: {type: 'f', value: new THREE.Color('#0098af') },
	}

	var material = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: waterVShader,
		fragmentShader: waterFShader,
		side: THREE.DoubleSide,
	});

	var mesh = new THREE.Mesh(geometry, material);

	mesh.Start = function(){
		//mesh.position.z = -10.0;
		mesh.rotateX(-Math.PI/2.0);

		// By default, textures have "Clamp To Edge" wrapping mode, which means u or v
        // over 1 will still be 1 instead of wrapping back to 0.
        // To fix this, you need to set the wrapping mode of your texture to "Repeat".
		mesh.material.uniforms.dudvMap.value.wrapS = 
		mesh.material.uniforms.dudvMap.value.wrapT = THREE.RepeatWrapping;
	}

	mesh.Update = function(){
		mesh.material.uniforms.moveFactor.value += 0.001; // wave speed movement
		mesh.material.uniforms.moveFactor.value %= 1;
	}

	return mesh;
}