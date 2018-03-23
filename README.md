# GameGraphicsFinalProject

To Run the Project simply click on this 
[link Oasis Final Project](https://alfredocuevas.github.io/GameGraphicsFinalProject/main.html)

## CMPM163 FINAL PROJECT: Simple Oasis

Team Members: 
  1. Alfredo Cuevas - acuevas5: Water <br>
  2. Robert Gaines: Sand/Terrain <br>
  3. Trenten Kaufeldt-Lira: Clouds <br>
  
<b>Structure of the Project</b>

- **_index.html_** simply provides a link to the main.html file. <br>
- **_main.html_** is were all the code from the other files is brought together. It contains all the code for setting up the scene, renderer, and camera. It calls code from the object files found in the js/ folder. To start running and updating the scene it calls cmengine.js . <br>
- **_js/_** contains all javaScript files that aren't shaders. <br>
  - **_cmengine.js_** calls the Start() functions inside of every object that was placed in a scene. It then runs Update() which will render the scenes, update any values, and then call itself again. <br>
  - **_< object-file >.js_** These are all files for adding objects/meshes to the scene. They create a function that will return a mesh for an object that is ready to be added to a scene. Inside these files textures are loaded and shader files are called. Every mesh is given a .Start() and .Update() that are called inside of cmengine.js. <br>
- **_shaders/_** Every shader that is called in an object file is kept here. <br>

<b>Alfredo Cuevas</b><br>
Created water that reflects and refracts the environment around it. The water ripples and looks like its moving. It has simple specular highlights from certain angles. The edges of the water blend with the sand so that there is a soft transition between the water and the terrain. There is also a Fresnel Effect applied to the water that makes the water reflect/refract more at certain angles.
    Also set up the initial structure of the code based on examples from Lucas's lab. 

<b>Robert Gaines</b>


<b>Trenten Kaufeldt-Lira</b>

