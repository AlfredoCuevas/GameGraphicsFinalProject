function createPanningCamera(panningPath){
	
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );

	camera.Start = function(){
		camera.position.set(0, 3, 0);
	}

	camera.AnotherUpdate = function(){
		//camera.rotateX(0.01);
		if (panningPath == 1) {
		}
	}

	return camera;
}