# Dynamic Camera Pathing
How do I cahange teh view of the camera based on where the user is in the level. 

Have hidden meshes where their (x, y) bound describe the area where the camera will be directed elsewhere. 
- Rabbit enters these bounds, camera focuses on target
    - What's the target defined by?
    - Where does the camera go?

Camera position could be defined by a different plane
Camera look vector could be defined by the normal vector of that plane.

![This paper](GameAIPro_Chapter47_Tips_and_Tricks_for_a_Robust_Third-Person_Camera_System-MARKUP.pdf) gives strategies for working with multiple cameras instead of managing the state of one camera. Certainly a little easier. Especially if cameras from blender can be turned into three js cameras.

Paper source: http://www.gameaipro.com/

Smooth interpolation between cameras is possible. See this demo: https://observablehq.com/@severo/transition-between-three-js-cameras

I think you can have cameras in glb files. Defining where the camera is and is looking at is now easy. The hard part is now controlling when each camera is used.

Paths may also be able to be defined by splines. 

_target_ could be the line drawn along the normal vector of the bounding area. So the camera always looks at some point along that line. Then we can vary the camera's pitch more readily.

Probably better for ease of development to have _target_ be a point. In blender you can align a camera with a mesh. We can easily make the camera the same dimensions as mobile, align it with the point, and be good to go. 

## Reacting to player movement
Even when the camera is in a viewing position, there should still be some tie in to the player. It should gently shift perspective as the player moves within the bounds. The position of the camera should sway slightly. Let's say the player comes in from the right. The camera for that are should move to be more towards the right where the player is but still looking at the target. As the player moves around the area, the camera moves slightly off it's origin corresonding to the player. 

Given that there's a concept of a _target_, I think I need a mesh, maybe just a point, to represent that for the camera. 

## Always keeping the player in view
For all cases except the launch, the player always needs to stay in view. Easy to achieve if the camera is outside the bounds of the area.

What if the player goes behind an object?
- Make a view through the object?
- Interpolate the camera around 180 degrees? In an orbit?
- Interpolate the camera around an orbit until the player is in view again?
- How do you detect when the player is out of view?

Paper suggests to allow the user to occlude, but before an occlusion happens, move the camera slightly off path in the opposite direction of the player's movement. Seems like this would require calculating an **impending occlusion**. 

## Arbitrary cameras
What about if I want a view and animation that's not tied to an area. Some examples include:
- Rocket launch camera
- Camera zoom into rabbit hole
- Camera spiral down from homepage into level

These cases are very event driven:
**Rocket launch**: User presses launch, camera goes to viewing position, is returned when **user starts moving** or animation is done.
**Rabbit hole**: Camera zooms into rabbit hole when the user goes down
**Spiral down**: Camera starts in top position and interpolates down to primary position after the user presses start on the title page.

That reveals that in these cases and the area cases we're concerned about switching the camera in a certain way given an event. **In some cases there may be control logic with the new camera.**

## Summarized requirements an implementation ideas
**Requirements**
1. [x] When the player enters a certain area, switch to a camera meant for viewing the primary model of that area. 
2. ~~[ ] Area camera should move slightly with the player~~
3. [ ] When the player exits an area, switch to the primary camera that tracks the player
4. [x] Allow the player to occlude their own model.
5. [ ] Never allow the player to go out of view, except as described in previous.
6. [x] Allow the user to move the primary camera (translate, pan, zoom) at will.
7. [ ] If not in an area, focus the primary camera on the player when the player starts moving. 
8. [x] Allow switching to static cameras based on user events.

Struck out 2 because the implementation is difficult with the design and I don't really think it's needed.

5 is something to be concious of on a case by case basis. The camera's view in blender should include the whole area captured by the camera zone.

6 is accomplishted with OrbitControls. Will set pan, rotate, move, etc. limits 

**Implementation ideas**
1. Have three elements to each area:
    1. Bounding plane that describes the x and y bounds of the area
    2. Point that will be the target for the camera
    3. Camera that is oriented towards the target, and positioned such that the player will never be out of view
2. Have a system for managing the active camera. Interpolate to next camera.
3. Abstract logic enough such that each camera can control itself. And that there's nothing fundamentally special about switching to an area camera or an arbitrary camera.

### Calculating intersections
I want to take advantage of the Rigid Body sensor. It solves the intersection problem. I don't, however, want to have a mesh in my blender project that combpletely obsures the mode. I will end up having ot hide it and I'll eventually forget to export it. It will be hard to work around, etc.

Instead, I could keep the circle approach, and draw the rest of the geometry in threejs. I think I could do this with a buffer geometry where I copy the circle, move the copy by y+10 or something, then fill in between.

If that works I can refeactor the TriggerVolume to either use this pattern, or use a hook that encapsulates this behaviour. 

# Architecture to manage active camera
React recommends I implement this as a hook. I can set the camera from `useThree`. To do this in a minimal way, the hook just needs to know
- the camera object to switch to
- the event for which to switch in response to

How do I have events called anywhere and captured anywhere? 

I'm thinking it's good to have everything:
- the construction of the area mesh
- the managing the state of the camera
- the event on player intersection

handled by this entity. If all the logic is contained here, then it becomes a component.

So I would have a component that:
- Draws the camera area mesh
- Provides an event for when the player intersects with it

I would have a hook that switches to the provided camera on the provided event. I could then use that hook in other places besides the camera area components.

## useCameraOnEvent
Takes as prop: camera to switch to

Returns: function handle to use for event

It feels like I could get away with using a standard class instead of a hook, but React docs recommend using hooks when the stateful logic uses hooks itself.

## CameraArea component
Takes as props: mesh for camera area base, camera for the camera area

Returns to renderer: Rigid body as a sensor. Calls useCameraOnEvent callback when intersection with player occurs

# Notes from implementing
Found that I have to select "loose edges" on export to have the camera area geometry exported.

I think there's a lot of loose points in the ASU model and the phoenix logo model. When I selected "loose points" in the export, the sun and most components of the phoenix logo appeared in the middle of the level.

The challenges I solved implementing a useCameraSwitch hook were:
- Multiple approaches trying to get the camera zone to draw. These included:
    - Building a custom buffer geometry. I thought that didn't work with the rigid body intersections so I tryed to modify a cylinder positions attribute array
    - Modifying an existing cylinder geometry. Found that the buffer geometry didn't work how I expected. There were groups of vertices where the last vertex in the group was the first vertex again. I tried using a 4 point cylinder to figure out the geometry, then I tried to replace the points correctly. Didn't work out. I missed one of the vertex group
    - Creating a THREE.Shape with the path I've drawn for the zone, then extruding out to form the final geometry. Worked perfectly once I figued out I wanted to use onCollisionEnter instead of intersection triggers on the RigidBody
- Changed from "moving the camera on an event and managing the event in the same hook" to "switching the camera in the hook, providing function handle to use for that switch"
- Figured out how to interpolate camera position. 
- Figured out how to interpolate camera rotation. 
- Found out that the orbit controls camera has a target that needs to be set when the camera rotation changes. Otherwise after I finish updating the camera continuously, the camera would snap back to looking at the last target (the origin in a lot of my testing). Probably will find that my look at position is not calculated correctly. Calculation was neat though.
- Figured out how to interpolate the camera fov and focal length to achieve the same view as on blender. Probably want to change the blender cameras to have the same focal length and fov as the three camera. That way I can have the same near and far for all cameras rather than having custom configurations. 
- Forgot to reset the smoothing variables so I was seeing the camera snap back even though the distance to the next target camera was the same. Sense the zones are individual objects, the smoothing variables were already set for that zone. That's why this would happen only with previously visited zones and not new unvisited zones.

## What should be responsible for switching the camera back to the player?
In the current use of useSwitchCamera, you provide a target camera and it provides a function handle to use when you want to switch to that target camera. In the case of camera zones, there's an event on entry, and the same event on exit. I had planned to have useSwitchCamera figure out when to switch back to the player camera, but this is too much responsibility for that hook. It advances the scope of that hook in two ways:
1. The hook now needs to be cognizent of the player and putting the camera back to focus on the player. That could couple at least two parts of our software. 
2. It's not clear to the consumer of useSwitchCamera that this behavior exists. There could be situations in the future where I want to switch the camera in the same way, but not have a partner event that would mean switch back.
I believe it's better to do the following:
1. Define a perspective camera that allways follows the Rabbit
2. Have a consumer of useSwitchCamera provide that perspective camera to the hook and be responsible for defining the event to switch to it.

### Case where the user has moved the camera somewhere else
The camera should look at the user defined target until the rabbit starts moving again or until some long time has passed (3 minutes?). If the user starts moving again and it's in a camera zone, the camera should go back to the zone camera. If it's out of camera zone, it should go back to the player camera. In most cases it means **go back to the last used camera**.

[x] Need a mechanism for tracking the last used camera.

## Mechanism for tracking last used camera
I could implement a store. In the store put all the cameras in the system. 
| Pros | Cons |
| :--- | :--- |
|      | Requires an extra step for using cameras. You have to add each to the store. |
| The store would be easy to test | |
| | Integrating the store into the useSwitchCamera would make useSwitchCamera harder to test, but honestly the integration may not be necessary or provide a benefit. |
| | Every time I switch cameras, there's an extra step where the store has to be told the switch happened | 

I could have system track the last stable location of state.camera
| Pros | Cons |
| :--- | :--- |
| | Would have to know what a stable location is. Could just be "was there longer than 1 second" |
| Wouldn't require any additional steps when using cameras. | |
| | Would be difficult to test because it requires mocking camera movement. |
| Would be far less coupled than store solution. Consumers wouldn't **have** to use it. They could use it when they need it. | |
| | Wouldn't be able to return more information about the camera that the state.camera was moving too. Consumer would be restricted to relevant details like position, rotation, fov, focal length, etc. |

After consideration, I'm going to implement the second option. If I find I need object information of the specific camera that was the last camera used, I'll implement a camera store that will contain all of the available cameras. The camera tracker can provide the position of the last camera used to the store and get the right camera object back.

NOTE: If implementing this as a hook, make sure it behaves like a singleton. I'm still not really sure how these things work. 

### Requirements for useLastCamera
- [ ] Returns a Perspective Camera object with the postion, rotation, fov, and focal length of the last used camera
- [ ] Returns null if the last used camera is the current camera.
- [ ] Last used camera is defined as the last camera where the configuration was stable for at least 1 second.


### Implemented singley-linked backward list and algo
After implementing the first iteration I realized a breaking case:

What if the user moves the camera, lets it rest, then moves it again and lets it rest, and then moves it again. In this case, the camera will return to a user defined position. That's not desired behavior. To fix that, we will need to know if the current camera in use is a defined camera.

By default, perspective cameras do not have names. I could maintain a store of cameras.... I just realized I don't even need to track the camera. If I need a store of cameras anyway to solve this problem, I could do this:
1. Maintain a store of system cameras
2. Have useSwitchCamera set the name of the render camera to be the name of the targetCamera once it's reached
3. In useLastCamera, get the camera object from the store by name (User driven camera actions will never change the name). In fact you could skip the useLastCamera hook entirely and just get the camera by name from the store. 

## How to manage which camera to use
Most of the time the camera should be following the rabbit. There are events (user, camera zones, animation scenes) that pull the camera away. The novel way of keeping the camera on the rabbit requires updating the camera each frame. This still works in a camera zone because the rabbit camera will have it's position updated, not the state camera. Uhhh I actually don't think this is a problem.
1. State camera defaults to rabbit cam. 
2. State cam follows rabbit cam around (this part I think is what I need to add extenerally)
3. State cam target is updated with useSwitchCamera
4. State cam target is updated with useSwitchCamera by the consumer when it's done.
5. If the rabbit is moving, the state cam is always set to the last camera. If the rabbit is not in special conditions, the last camera will be the rabbit camera.

So really, I just need to implement some external system that has state camera track the current camera object. 

The only camera that gets followed in this way is the rabbit camera. I could switch the name of the state camera as soon as the switch event starts, then I could, in the rabbit frame logic, say that if the state camera is the rabbit camera, update the state camera parameters with the rabbit camera parameters. Not future proof, but at the moment we only have one camera that needs to be followed in this way. If/when there's another camera that needs to be tracked, I'll redesign it then. 

Oh wait, there is another camera like that. Well no, the entrypoint camera and future project cameras will follow pretermined spline paths. We can problem design like a holding system for that. 

## Having the player camera follow a predetermined track
I realized that having the player camera track the rabbit doesn't work for a lot of cases. The primary problem, is how I manage orbiting the camera to the proper position around the player. Take the career area, when the rabbit enters and moves towards the right, and the camera is orbited on the left of the player, it works out just fine. The user can see the rabbit and the models. As soon as the rabbit goes into the position where the models are on the other side, the user can no longer see the models in a good way. The problem is determining when to orbit the rabbit. And when to do ithat in a way that is scalable. I could do it off of position, but tht isn't relient to change. I would have to define like a bounding area of some kind to do that in a resilent way. And even then, going off of straight positions is just, it's too easily broken. 

So I had the idea to have a positional spline. So I have a predifined track that ththe camera goes along. Now I need to figure out the logic of that track. 

Having the camera begin where the rabbit begins is easy enought, I can set that up in the blender level . But how do I determine when the camera rotates, or goes to a new section of track? 

- I could keep the camera's rotatoinal angle on some kind of offset with teh rabbit. This way the user gets a pretty consistent viewing angle.
- I could try to maintain som ethreshold of distance between the camera and the player. That way the camera would move out of hte way if the player got to close, but move to anothe rpart of the track if the player got too far away. I should say TRY to move to some other part of the track. There are cases where the user mvoes very far away and the camera should just stay  in its position in thsoe case. 

Before I make requirements, let's see if I can at least gget the camera to follow the plaer camera track spline as the user moves. 

I need to know the following
- How to import the spline from a glb
- How to animate the camera long that spline as the user moves



