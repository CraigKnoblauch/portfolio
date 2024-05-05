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
