function createClouds(x,y,h,clouds)
{
  var plane = new THREE.PlaneGeometry(x,y);

  var shaderInput = {
    moveFactor: {type: 'f', value: 0.0 },
    uTime: {type: 'f', value: 0.0 },
    in_val:  { type: "f", value: 0.0 },
    displaceAmt: { type: "f", value: 0.0 }


  }

  var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: CloudMap,
        fragmentShader: CloudColors,
        side: THREE.DoubleSide,
        clipping: false,
        map: clouds
      });

  var mesh = new THREE.Mesh(plane, material);

  mesh.Start = function(){
      mesh.position.y += h;
      mesh.rotation.x = 1.57079632679;
      mesh.rotation.y = 0;
      mesh.rotation.z = 0;


  }

  mesh.Update = function(){

   }

  return mesh;

}
