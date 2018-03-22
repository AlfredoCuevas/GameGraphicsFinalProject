function createWaterPlane(w, d, bufferTextureRefraction, bufferTextureReflection, bufferObjectRefractionDepthTexture){
	
	var geometry = new THREE.PlaneGeometry(w, d, 20, 20);

	var dudvTex = new THREE.TextureLoader().load('images/water/waterDUDV.png');
	var normalsTex = new THREE.TextureLoader().load('images/water/normalMap.png');

	var lightSource = new THREE.Vector3(-100, 100, 100);


	var shaderInput = {
		uRefraction: {type: "t", value: bufferTextureRefraction },
		uReflection: {type: "t", value: bufferTextureReflection },
		depthMap: { type: "t", value: bufferObjectRefractionDepthTexture },
		dudvMap: {type: "t", value: dudvTex },
		normalMap: {type: "t", value: normalsTex },
		moveFactor: {type: 'f', value: 0.0 }, 
		uTime: {type: 'f', value: 0.0 },
		uColor: {type: 'f', value: new THREE.Color('#5c7aa8') },
		camPosition: {type: 'v3', value: new THREE.Vector3(0.0, 0.0, 0.0) },
		lightPos: {type: 'v3', value: lightSource },
		lightColor: {type: 'v3', value: new THREE.Vector3(1.0, 1.0, 1.0) },
	}

	var material = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: waterVShader,
		fragmentShader: waterFShader,
		side: THREE.DoubleSide,
		blending: THREE.NormalBlending,
		transparent: true,
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

		mesh.material.uniforms.normalMap.value.wrapS =
		mesh.material.uniforms.normalMap.value.wrapT = THREE.RepeatWrapping;
	}

	mesh.Update = function(){
		mesh.material.uniforms.moveFactor.value += 0.001; // wave speed movement
		mesh.material.uniforms.moveFactor.value %= 1;

		mesh.material.uniforms.camPosition.value = new THREE.Vector3(CMENGINE.camera.position.x,
																	 CMENGINE.camera.position.y,
																	 CMENGINE.camera.position.z);
	}

	return mesh;
}