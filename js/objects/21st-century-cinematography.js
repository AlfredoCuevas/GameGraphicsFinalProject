function createPanningCamera(panningPath){
	
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );

	// eulerX+ = up, eulerY+ = left
	
	camera.Start = function(){
		if (panningPath == 1) {
			camera.position.set(-14, 3, 25);
			//camera.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.5);
			camera.setRotationFromEuler(new THREE.Euler(-0.1, 0.9, 0.0, 'YXZ'));
		} 
		else if (panningPath == 2) {
			
		}
		else if (panningPath == 3) {
			
		}
		else if (panningPath == 4) {
			
		}
		else if (panningPath == 5) {
			
		}
	}

	camera.AnotherUpdate = function(){
		var view = camera.rotation.toVector3();
		//camera.rotateX(0.01);
		if (panningPath == 1) {
			// move right relavtive to camera
			camera.translateOnAxis(new THREE.Vector3(1, 0, 0), 0.1);
		} 
		else if (panningPath == 2) {
			
		}
		else if (panningPath == 3) {
			
		}
		else if (panningPath == 4) {
			
		}
		else if (panningPath == 5) {
			
		}
	}

	return camera;
}