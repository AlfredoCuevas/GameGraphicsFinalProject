var CMENGINE = {}

CMENGINE.Start = function( scene, renderer, camera, controlsEnabled, bufferScene, bufferObjectRefraction, bufferObjectReflection ){
    for(var i = 0; i < scene.children.length; i++){
        if(scene.children[i].Start != null){
            scene.children[i].Start();
        }
    }

    for(var i = 0; i < bufferScene.children.length; i++){
        if(bufferScene.children[i].Start != null){
            bufferScene.children[i].Start();
        }
    }

    window.addEventListener( 'resize', onWindowResize, true);

    CMENGINE.scene = scene;
    CMENGINE.renderer = renderer;
    CMENGINE.camera = camera;

    CMENGINE.bufferScene = bufferScene;
    CMENGINE.bufferObjectRefraction = bufferObjectRefraction;
    CMENGINE.bufferObjectReflection = bufferObjectReflection;

    // false if doing flyover pan for the video
	if (controlsEnabled == true) {
		//CMENGINE.camera.position.z = 5.0;
		CMENGINE.controls = new THREE.OrbitControls(camera);
		//CMENGINE.controls.autoRotate = true;
		//CMENGINE.controls.autoRotateSpeed = 1.5;
		CMENGINE.controls.minDistance = 1;
		CMENGINE.controls.maxDistance = 2000;  //40;
		//CMENGINE.controls.maxPolarAngle = Math.PI/2.2;
		
		//makes rotating smoother, can disable if you want
		CMENGINE.controls.enableDamping = true;
		CMENGINE.controls.dampingFactor = 0.1; //default is 0.25
		CMENGINE.controls.rotateSpeed = 0.05; //default is 1
	} else {
		CMENGINE.camera.Start();
	}
}

CMENGINE.Update = function(){
	if (controlsEnabled == true) {
		CMENGINE.controls.update();
		requestAnimationFrame(CMENGINE.Update);
	} else {
		CMENGINE.camera.AnotherUpdate();
		//setTimeout( function() {
			requestAnimationFrame(CMENGINE.Update);
		//}, 1000/30 );
	}
	
    for(var i = 0; i < CMENGINE.scene.children.length; i++){
        if(CMENGINE.scene.children[i].Update != null){
            CMENGINE.scene.children[i].Update();
        }
    }

    for(var i = 0; i < CMENGINE.bufferScene.children.length; i++){
        if(CMENGINE.bufferScene.children[i].Update != null){
            CMENGINE.bufferScene.children[i].Update();
        }
    }
			
    //requestAnimationFrame(CMENGINE.Update);

    // Temp is an array that will be used to apply clipping planes to individual FBO
    var temp = CMENGINE.renderer.clippingPlanes;

    // Rendering to the Frame Buffer Object Refraction first---------------------------------------------------------
    CMENGINE.renderer.clippingPlanes = [temp[0]];
    CMENGINE.renderer.setClearColor(0xcccccc);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObjectRefraction);


    // Rendering to the Frame Buffer Object Reflection second--------------------------------------------------------
    var dist = 2 * (CMENGINE.camera.position.y - temp[1].constant);
    CMENGINE.camera.position.y -= dist;
    CMENGINE.camera.rotation.x = -CMENGINE.camera.rotation.x;
    CMENGINE.camera.rotation.z = -CMENGINE.camera.rotation.z;
    CMENGINE.renderer.clippingPlanes = [temp[1]];
    CMENGINE.renderer.setClearColor(0xcccccc);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObjectReflection);
    CMENGINE.camera.position.y += dist;
    CMENGINE.camera.rotation.x = -CMENGINE.camera.rotation.x;
    CMENGINE.camera.rotation.z = -CMENGINE.camera.rotation.z;

    // Render to the screen, no clipping planes----------------------------------------------------------------------
    CMENGINE.renderer.clippingPlanes = [];
    CMENGINE.renderer.setClearColor(0x666666);
    CMENGINE.renderer.render(CMENGINE.scene, CMENGINE.camera);

    // giving the renderer all the clipping planes for the next update pass.
    CMENGINE.renderer.clippingPlanes = temp;
}

function onWindowResize( event ){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    //may need to resize the bufferObject here
}