var CMENGINE = {}

CMENGINE.Start = function( scene, renderer, camera, bufferScene, bufferObject ){
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
    CMENGINE.bufferObject = bufferObject;

    //CMENGINE.camera.position.z = 5.0;
    CMENGINE.controls = new THREE.OrbitControls(CMENGINE.camera);
}

CMENGINE.Update = function(){
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

    CMENGINE.controls.update();
    console.log("7");
    requestAnimationFrame(CMENGINE.Update);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObject);
    console.log(CMENGINE.scene.children[1].material);
    CMENGINE.renderer.render(CMENGINE.scene, CMENGINE.camera);
}

function onWindowResize( event ){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    //may need to resize the bufferObject here
}