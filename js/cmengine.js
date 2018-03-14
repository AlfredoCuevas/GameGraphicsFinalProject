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

    requestAnimationFrame(CMENGINE.Update);

    // Rendering to the Frame Buffer Object first
    CMENGINE.renderer.setClearColor(0xcccccc);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObject);
        //CMENGINE.scene.children[1].material.uniforms.uMap.value = bufferObject.texture;(probably no longer needed)

    //temporarily get rid of the clipping planes and then restore them in the end
    var temp = CMENGINE.renderer.clippingPlanes;
    CMENGINE.renderer.clippingPlanes = [];

    // Render to the screen
    CMENGINE.renderer.setClearColor(0x666666);
    CMENGINE.renderer.render(CMENGINE.scene, CMENGINE.camera);

    // placing the clipping plane back into the renderer.
    CMENGINE.renderer.clippingPlanes = temp;
}

function onWindowResize( event ){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    //may need to resize the bufferObject here
}