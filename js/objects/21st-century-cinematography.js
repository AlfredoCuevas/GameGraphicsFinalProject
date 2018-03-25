function createPanningCamera(panningPath){
	
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 10000 );

	// ROTATION: eulerX+ = up, eulerY+ = left
	
	camera.Start = function(){
		if (panningPath == 1) {
			camera.position.set(-10, 4.1, 35);
			//camera.setRotationFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.5);
			camera.setRotationFromEuler(new THREE.Euler(-0.0, 0.9, 0.0, 'YXZ'));
		} 
		else if (panningPath == 2) {
			camera.position.set(-7, 12, -38);
			camera.setRotationFromEuler(new THREE.Euler(0.6, 1.2, 0.0, 'YXZ'));
		}
		else if (panningPath == 3) {
			camera.position.set(-10, 1.5, 4);
		}
		else if (panningPath == 4) {
			camera.position.set(-25.5, 3.75, -2);
			camera.setRotationFromEuler(new THREE.Euler(-0.05, 1.48*Math.PI, 0.0, 'YXZ'));
		}
		else if (panningPath == 5) {
			camera.position.set(45, 500, -17);
		}
	}
	
	// TRANSLATION: X+ = right, Z+ = ???

	camera.AnotherUpdate = function(){
		var view = camera.rotation.toVector3();
		//camera.rotateX(0.01);
		if (panningPath == 1) {
			// move right relavtive to camera
			camera.translateOnAxis(new THREE.Vector3(1, 0, 0), 0.1);
		} 
		else if (panningPath == 2) {
			camera.rotateY(0.003);
		}
		else if (panningPath == 3) {
			camera.rotateY(0.004);
			camera.rotateX(0.0005);
		}
		else if (panningPath == 4) {
			
		}
		else if (panningPath == 5) {
			camera.lookAt(-3, 0, 0);
			camera.translateOnAxis(new THREE.Vector3(30, -15, 0), 0.1);
			camera.lookAt(-3, 0, 0);
		}
	}

	return camera;
}