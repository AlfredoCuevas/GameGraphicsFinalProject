var CMENGINE = {}

CMENGINE.Start = function( scene, renderer, camera, bufferScene, bufferObjectRefraction, bufferObjectReflection ){
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

    // Temp is an array that will be used to apply clipping planes to individual FBO
    var temp = CMENGINE.renderer.clippingPlanes;

    // Rendering to the Frame Buffer Object Refraction first---------------------------------------------------------
    CMENGINE.renderer.clippingPlanes = [temp[0]];
    CMENGINE.renderer.setClearColor(0xcccccc);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObjectRefraction);
        //CMENGINE.scene.children[1].material.uniforms.uMap.value = bufferObject.texture;(probably no longer needed)


    // Rendering to the Frame Buffer Object Reflection second--------------------------------------------------------
     //var tempCamera = CMENGINE.camera;
    var dist = 2 * (CMENGINE.camera.position.y - temp[1].constant);
    CMENGINE.camera.position.y -= dist;
    //CMENGINE.camera.rotation.y = -CMENGINE.camera.rotation.y;
    CMENGINE.renderer.clippingPlanes = [temp[1]];
    CMENGINE.renderer.setClearColor(0xcccccc);
    CMENGINE.renderer.render(CMENGINE.bufferScene, CMENGINE.camera, CMENGINE.bufferObjectReflection);
    CMENGINE.camera.position.y += dist;
    //CMENGINE.camera.rotation.y = -CMENGINE.camera.rotation.y;

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