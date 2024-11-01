# Textures 
Before doing a project like this, I had no idea how much you could use textures for. There are shadows in this project, and the lighting appears to change the materials the user sees, yet there's no dyncamic lighting in this project. There's text on the floor that's easy to change. Then there are these wicked dynamic effects like the rocket flames, and the fog wall. These aren't complicated animated meshes, they're tricks with textures. 

## Faking lighting
As you move around the scene, you may notice that the colors on objects appear to change with your perspective. There seems to be a dynamic shading. While it may look like lighting calculations are involved, there actually isn't anything of the sort. Instead, images like these define what the texture will look light from every possible angle **TODO BETTER MATCAP EXPLANATION** **TODO IMAGES OF MATCAPS**.

I'm proud of the way I apply these in code. Originally I planned to apply them as needed, but I quickly found this didn't scale to the number of objects I planned to have. I also found that the number of textures I had was unmanageable. I originally had something like 120 unique textures. Instead, I simplified it down to the common colors. I found textuers that were similar and combined them into one. I then made the material name the same as the filename as its matcap image. I pull the material name out of the meta data from the gltf object. I then pass that to an object responsible for returning a loaded matcap material. This way I only have to load the matcaps once, and I get them whenever I need them.

Craig there's no lights? But there are shadows on the ground. Yes there are, but those exist on the texture of the ground. The shadows are calculated in a blender render, then _baked_ into the texture. 

## Animated textures
There are a few visuals in the project that are animated. The rocket flames, the project fog wall, and the rabbit hole portal all come to mind. These are all accomplished with shaders. Shaders allow you to define two things:

1. Where individual vertices are at any given render.
2. What UV coordinates a texture maps to on a mesh at any given render.

Each of these also combine perlin noise textures. These are images that capture patterns of pseudo randomness (**TODO INSERT PERLIN EXAMPLE**). 

See each section for how I combine both of these tools:

- **TODO LINK TO SECTION ON ROCKET FLAMES**
- **TODO LINK TO SECTION ON RABBIT HOLE PORTAL**
- **TODO LINK TO SECTION ON FOG WALL**

## Text
Text on the floor, text on the rocket. Both of these are accomplished with UV maps. The coordinates of the texture map to the uv coordinates on the mesh
