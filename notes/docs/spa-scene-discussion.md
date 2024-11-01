# Breaking down a scene
I'm having a lot of trouble figuring out how to break down a "scene" into something that is abstract enough to be reusable, separate enough to be testable, but also useful enough to be, well useful. To not get bogged down in the abstraction so that I can't really do anything with it, and to have something that's flexible enough so that I don't have to have some perfect hiarchy or design before hand. 

I've already seen and basically understand how and why I would use an ECS. I think there are elements of an ECS that I can use in this situation, but I think I'll have to employ a few more patterns to really get what I'm after. 

So without further ado, this is what goes into a scene, using the rocket launch scene as an example.

# The rocket launch scene case study
As a reminder, the term _scene_ covers everything that a user would see, interact with, or mechanisms that would serve the user for a particular discrete set of models. For example, the rocket launch complex with the animations and sound effects is a scene. The whole career area is not. The career area would be a collection of scenes. I'm going through this exercise so I can have a component that's reusable and testable. This component will aid with the simpler site, and with the complex site as well if I ever have the time to build it.

Here's all the things that happen and can happen in the rocket launch scene.
- The rocket, pedastal, cradle, launch button, and floor meshes are all visible
- The rocket and floor meshes have their own UV maps loaded on them.
- The pedastal, cradle, and launch button all have matcap textures.
- The flames mesh is loaded in, but sits under the pedastal out of view
- The flames material is a shader. The shader is animated with the delta time tick
- There is an animation for launch
- There is an animation for reset
- There are sound effects that accompany the animations
- Animations include changes to model positions
- Animations can include changes to model materials
- The launch animation includes the dynamic generation of matcap textured dodecahedrons
- Animations include modifying the view properties of the camera
- Animations include modifying the position and rotation of the camera
- The launch button can be pressed by a user to trigger the launch animation
- The rocket and flames models need to be deleted when they exit the field of view. Or at least their position updates should be stopped.

In addition to these identified for this case study, there are some other functionalities of a scene I should keep in mind:
- A scene can be reset to its initial state
- All the entities of a scene need to decide how they respond to a reset
- Scenes will have 1 to many cameras.
- Cameras can be switched to another camera in the scene

## Animations
The animations are concerning to me. There are so many entities all of which have to have their properties in the scene change. Here are a few ideas:
- There can be some base entity that has it's model and texture set by components in the ECS model.
- There can be some sequencer that coordinates when entities need to hit certain steps. Think keyframes on a sequencer.

## Events
Events are weird too.
- User events (clicks, scrolling past)
- Entity events (like the rocket reaches a certain position)
- Time events (like a certain time is reached)

How do I define the responses to the events, and notify the actions that the events occurred in a decoupled way?

## Textures
UV maps, matcaps, shaders. Could I create a component that would allow me to attach this functionality to an entity. 

## Entities
I'm thinking of an entity as literally an object. So not even a model. It's model attributes would be given with a model component. It's texture would be given with a texture component. How would that work without coupling the model and texture components?

## Coordination of animations, sound effects, etc. into Sequences
I'm thinking about an animations like the rocket launch. In that launch there is:
1. Animation of button
2. Sound effect of button
3. Animation of cradle
4. Sound effect of launch
5. Animation of exhaust particles
6. Shader material on flames
7. Animation of rocket
8. Animation of camera
9. Deletion of rocket model once it exits screen

All of that needs to be coordinated, and the module that coordinates it needs to be tested too.
Steps are triggered by
- User events
- Time steps
- Entities reaching certain locations

And on top of that, the module that handles the events and translates that into modifications to all the entities needs to be decoupled and tested as well.

### From another brainstorming document: Animations
I was thinking that some base level of entity would have animations defined, but actually I think it makes more sense for the Scene, the highest level, to define animations. Or, in ECS land, to have several animation components. All an animation is is changing the state of an entity on each frame. So there's not much reason that the different elements of the animation would get out of sync. 

Then, if you have the animation components at the top level, you can have an event manager component decide when to trigger them. And that event system can do all that without knowing that it is triggering an animation. All it knows is it's making a callback on an event.

# Starting with just models
For the sake of getting some progress, focus on building functionality for just the problem of loading a model and applying a texture. 

## Model
**Props**: geometry, position, rotation, scale, material
The material is an already assembled object. This should be easy enough to assemble, test, and see the results. 

I'm not sure how much this abstraction really gives me though. For example, what's the difference and the benefit from the default approach of:
```jsx
const rocketTexture = useTexture('./textures/rocket-uv-map.jpg')
const { nodes } = useGLTF('./models/career-area.glb')

return (
    <mesh geometry={nodes.rocket.geometry} position={nodes.rocket.position}>
        <meshBasicMaterial map={rocketTexture} />
    </mesh>
)
```
and
```jsx
const rocketTexture = useTexture('./textures/rocket-uv-map.jpg')
const { nodes } = useGLTF('./models/career-area.glb')

return (
    <MyModel geometry={nodes.rocket.geometry} 
             position={nodes.rocket.position}
             material={new MeshBasicMaterial(map=rocketTexture)}/>
)
```

The only real benefit is that we're not able to test `MyModel`, but then we're just testing things that belong to the ThreeJS framework, which we shouldn't have to test in the first place. 

I think it comes down to the question: _What do we want to test with the rocket_? 
- That all the meshes are in the correct position
- That when the rocket moves all the meshes move to the right position
- That the flames shader is working
- That the UV map is applied correctly
- That when the launch event happens the rocket moves
- That when the reset event happens the rocket moves to the right place
- That the rocket stops moving when out of frame
- That the nozzles have the matcap affixed

I think I should focus on making a `Rocket` class. It takes as props the meshes of the peices of the rocket, as well as the materials to apply to them. This way I can put the materials and meshes through their own test cases later if I want to. It's also not exactly important that I have real meshes or the real materials for the test. I'm just testing that the meshes are in the right place and that the right materials are on the meshes.

I could even further abstract the `Rocket` class to a `Model` class that takes as a props an arbitrary length list of mesh and material pairs. This approach might make it easier to hook the Model into an animation sequencer or event manager if I need to make one of those.
