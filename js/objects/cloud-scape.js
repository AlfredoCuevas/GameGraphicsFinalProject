function createClouds(x,y,h,clouds)
{
  var timer = 0;
  var plane = new THREE.PlaneGeometry(x,y);

  var shaderInput = {
    texture: {type: "t", value: new THREE.TextureLoader().load('images/Clouds/Cloud_Map_4.png')},
    rate: {type: "f", value: 0.0}
  }

  var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: CloudMap,
        fragmentShader: CloudColors,
        side: THREE.DoubleSide,
        clipping: true,
    		blending: THREE.NormalBlending,
    		transparent: true
      });

  var mesh = new THREE.Mesh(plane, material);

  mesh.Start = function(){
      mesh.position.y += h*2;
      mesh.position.x = 500;
      mesh.position.z = 500;
      mesh.rotation.x = 1.57079632679;
      mesh.rotation.y = 0;
      mesh.rotation.z = 0;


  }

  mesh.Update = function(){
      timer += 0.001;
      mesh.position.z = mesh.position.z  + Math.cos(timer);
      mesh.rotation.z = timer/10;
    }
  return mesh;
}
