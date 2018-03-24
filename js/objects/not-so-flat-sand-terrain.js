function createSand(w, d, y){
	
	var loader = new THREE.TextureLoader();
	loader.setPath('images/sand/');
	var fineTexture = loader.load('sand1.jpg');
	var texture = loader.load('SandCombo5.png');
	var bump = loader.load('sand2normalShallow.jpg');
	var normal = loader.load('sand4bump.jpg');
	var megaNormal = loader.load('sand1bump.jpg');
	var heightMap = loader.load('heightmapBlur.png');
	
	var sandSpeed = 0.0;
	
	var geometry = new THREE.PlaneGeometry(w, d, 256, 256);
	//var geometry = new THREE.PlaneGeometry(w, d, 512, 512);
	
	texture.wrapS = texture.wrapT = 
	fineTexture.wrapS = fineTexture.wrapT =
	bump.wrapS = bump.wrapT = 
	normal.wrapS = normal.wrapT = 
	megaNormal.wrapS = megaNormal.wrapT = 
	heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set(3, 3);
    //bump.repeat.set(1, 1);
	
	var shaderInput = {
		fineTexture: {type: "t", value: fineTexture },
		sandTexture: {type: "t", value: texture },
		sandNormalMap: {type: "t", value: normal },
		sandMegaNormalMap: {type: "t", value: megaNormal },
		sandHeightMap: {type: "t", value: heightMap },
		displaceAmt: { type: "f", value: 15.0 }, //12.0
		yOffset: { type: "f", value: y },
		sandSpeed: { type: "f", value: sandSpeed },
		//uTime: {type: 'f', value: 0.0 },
		//uColor: {type: 'f', value: new THREE.Color('#0051da') },
	}

	var shaderMaterial = new THREE.ShaderMaterial({
		uniforms: shaderInput,
		vertexShader: sandVShader,
		fragmentShader: sandFShader,
		side: THREE.DoubleSide,
		clipping: true,
	});
	
	// for testing normal maps
	var normalMaterial = new THREE.MeshPhongMaterial({
		side: THREE.DoubleSide,
		map: texture,
		bumpMap: bump,
	});

	var mesh = new THREE.Mesh(geometry, shaderMaterial);

	mesh.Start = function(){
		//mesh.position.z = -3.0;
		mesh.position.x = -3; // to line up with water
		mesh.position.y = -1.4;
		mesh.rotateX(-Math.PI/2.0);
	}

	mesh.Update = function(){
		mesh.material.uniforms.sandSpeed.value += 0.0001; //.0003
		//texture.offset.y += .003;
		//texture.offset.x += .001;
		//bump.offset.y -= 30;
		//bump.offset.x -= .1;
	}

	return mesh;
}