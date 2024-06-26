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
1. When the player enters a certain area, switch to a camera meant for viewing the primary model of that area. 
2. Area camera should move slightly with the player
3. When the player exits an area, switch to the primary camera that tracks the player
4. Allow the player to occlude their own model.
5. Never allow the player to go out of view, except as described in previous.
6. Allow the user to move the primary camera (translate, pan, zoom) at will.
7. If not in an area, focus the primary camera on the player when the player starts moving. 
8. Allow switching to static cameras based on user events.

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


