function createClouds(x,y,h)
{
  var plane = new THREE.PlaneGeometry(x,y);

  var shaderInput = {
    color: 0xFFFFFF
  }

  var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: CloudMap,
        fragmentShader: CloudColors,
        side: THREE.DoubleSide,
        color: 0xFFFFFF,
        clipping: false,
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
