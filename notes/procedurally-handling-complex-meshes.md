The names of individual meshes are accessible
The names of the meshes' materials are accessible and should be the same as their corresponding matcap. That will allow me to map the name of the material to the name of the matcap without defining all those mappings myself. 

# Open questions
How can I define the collison box ahead of time?
Do I have to pull the position, rotation, and scale from the glb like gltfjsx does it?
Do I have to procedurally generate all of this or can I add a post processing step to gtlfjsx?
- Would it be easier to just procedurally generate it all

# Material names from blender
Blender doesn't export material names to glb.
Checked in nodes.mesh_name.material.name -- That value is blank in all cases
Tried a bunch of different export variations and with materials. Didn't see a name in any case

Dug into the blender source. 
See that tinygltf, a library for optimizing a gltf, is used in some controller unrelated to export
tinygltf provides a material serialization method that includes serializing the name.

Currently digging through the blender code to see where the gltf export logic is. greping for gltf or didn't turn up that code surprisingly.

Coolest case, I get a PR into blender with this change
Likely case, I build a middle man that inserts the material name into the exported gltf

The python api doesn't look to be any help. You can call the export mechanism, but you can't specify to serialize the material names.
https://docs.blender.org/api/current/bpy.ops.export_scene.html#bpy.ops.export_scene.gltf
Although this is another path to find where this export logic exists. If I see what that method is bound to, I find my export logic

I thought that maybe the gltf exporting isn't in the base blender, but is instead in an add on that's bundled with blender. I took a look at the blender-addons repo instead. I found a lot of gltf and specifically gltf exporting stuff in here
Specifically blender-addons/io_scene_gltf2/io/exp/ looks promising

Found gltf2_io_export.save_gltf
Looks promising, but I think at this point I just need to post on the blender forums and ask for an answer that way.

# Examining the raw content of the glb files
Used glbdump to examine the actual contents of my glb files. I found that
 - No material names when using placeholder or no material expoert
 - Material names DO EXIST when exported on the glb file. But the material names DON'T EXIST when parsing in js. That means somewhere in the parsing in js, the material names get dropped. 

However, I also don't see how the materials are associated to the meshes in the glb with the material names in it.

**It is at least clear that we'll want our logical names to have hyphens so they can be mapped right on to the png names**

Man do I have to read the freaking GLTF file spec to figure this out: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#concepts
I just don't see how the materials are associated to the meshes
Like, if I don't need the materials at all, I might be safe to just delete all of their data save the name, but that might break something else

OHHH, usually specs or encodings leave room for user data. That might be the case with the GLTF spec as well --> Nope

**In the gltf file, "meshes" have an element "material". That element is an index that corresponds to the materials list in the same file.**
**The "nodes" element has an element "mesh". That element is an index that corresponds to the meshes list in the same file.**

I see that there is no "meshes" element in a parsed glb from drei in react. I've already found that the drei parsing adds a lot to the output data. It's most likely that a change to the useGLTF code will put this name back in there. So now my options are any of the following:
1. Determine how to safely remove all material data except the material name from the glb. **IF an export will all the materials is unreasonably large**. Even if I did do this I would still need to do #2 to get access to the material name in the program
2. Change the useGLTF code to insert the material name into the materials element

# Where useGLTF misses the material name
drei repo: https://github.com/pmndrs/drei.git
useGLTF defined in drei/src/core/useGLTF.tsx
Loads GLTF with GLTFLoader from three-stdlib
three-stdlib lives here: https://github.com/pmndrs/three-stdlib.git
GLTFLoader defined in three-stdlib/src/loaders/GLTFLoader.js

This code is interesting and can be found in GLTFLoader.js
```js
const materialDef = parser.json.materials[materialIndex]
```
Seems like the name should be available in `materialDef.name`

At 4AM, my best guess is adding this to the end of GLTFParser.loadMaterial. Just before the return statement. I tried this on my local node_modules, but I don't think I got the reload to work correctly
```js
if (materialDef.name) {
    pending.push(parser.assignTexture(materialParams, "name", materialDef.name));
}
```

Functions to look at later:
assignTexture
parse

Heck when is parse even called, or loadMaterial for that matter? Was my glb loaded cached and that's why this didn't go off?

Can I attach a debugger to this thing and step through to the load? That would be best
