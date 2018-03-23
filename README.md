# GameGraphicsFinalProject

To Run the Project simply click on this 
[link Oasis Final Project](https://alfredocuevas.github.io/GameGraphicsFinalProject/main.html)

<b>CMPM163 FINAL PROJECT: Simple Oasis</b>

Team Members: 
  Alfredo Cuevas: Water
  Robert Gaines: Sand/Terrain
  Trenten Kaufeldt-Lira: Clouds
  
<b>Structure of the Project</b>
<p>
  <b>* index.html *</b> simply provides a link to the main.html file.
  <b>* main.html *</b> is were all the code from the other files is brought together. It contains all the code for setting up the scene, renderer, and camera. It calls code from the object files found in the js/ folder. To start running and updating the scene it calls cmengine.js .
  <b>* js/ *</b> contains all javaScript files that aren't shaders.
  <b>* cmengine.js *</b> calls the Start() functions inside of every object that was placed in a scene. It then runs Update() which will render the scenes, update any values, and then call itself again. 
  <b>* <object-file>.js *</b> These are all files for adding objects/meshes to the scene. They create a function that will return a mesh for an object that is ready to be added to a scene. Inside these files textures are loaded and shader files are called. Every mesh is given a .Start() and .Update() that are called inside of cmengine.js.
   <b>* shaders/ </b> Every shader that is called in an object file is kept here. 


<b>Alfredo Cuevas</b>
<p> Created water that reflects and refracts the environment around it. The water ripples and looks like its moving. It has simple specular highlights from certain angles. The edges of the water blend with the sand so that there is a soft transition between the water and the terrain. There is also a Fresnel Effect applied to the water that makes the water reflect/refract more at certain angles.
    Also set up the initial structure of the code based on examples from Lucas's lab. 
</p>

<b>Robert Gaines</b>
<p></p>

<b>Trenten Kaufeldt-Lira</b>
<p></p>
