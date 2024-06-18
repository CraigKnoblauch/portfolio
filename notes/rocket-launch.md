I have the exhaust animation figured out
I have the flames shader figured out
I have the flow of the animation figured out

The animation logic needs to be refactored so that it's not coupled to the career scene. 

There needs to be a reset

Shadows must be in a place that are easily obscured.
- Rocket shadow behind it.
- Button shadow at a small angle or behind it.

## Reset
The shadows are baked on. They would need to be replaced without the user seeing. 
- I could have smoke obsure the area, then swap them out. 
- I could angle the camera such that the shadows aren't visible, then swap them after.
- I could have "lighting" around the area such that it would make sense that there aren't shadows.

The rocket needs to be replaced
- I could spawn the rocket under platform, Move the ring element down an out, the rocket up, the ring back and up, the cradle back
- I could lower a new rocket from the sky into the cradle, pivot the cradle back up.

The button needs to move back out

## Actions of the animation
1. Player hits launch button (depress sound effect)
2. Launch button moves inward
3. The camera moves to a viewing position.
4. A low rumbling sound starts to play
5. Exhaust shoots out of the flame trench
5. Exhaust billows around the base (just enough to obscure the shadows)
6. The baked textures are replaced with ones where the cradle has fallen and the rocket isn't there.
6. The rocket begins to climb
7. The cradle falls away
8. The rocket exits view
9. The exhaust dies off
10. The rumbling sound dies away

## Actions of the reset
1. Player hits the reset button (depress sound effect)
2. The entire launch complex (platform and launch button) falls into the ground
3. The entire launch complex with rocket reset on it raises from the ground and settles into place (settling with spring?)

## Responsibilties of various software entities
[x] Responsible for rearward exhaust
[x] Responsible for exhaust around base
[x] Responsible for rocket movement
[x] Responsible for cradle movement
[x] Responsible for swapping textures
[x] Responsible for playing sounds (See https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/)
[x] Responsible for moving camera (See [camera-pathing](camera-pathing.md))
[x] Responsible for swapping models
[x] Responsible for orchestration, of launch and of reset

### Abstracting so that it can be applied to future demonstrations
useAnimation could be used if the rocket, cradle, etc. were actually animated.

The exhaust is a component, so this decomposes down to "responsible for adding components". Not so much of a responsibility since React already does that. It's more that the implementation should allow components to be added.

### Orchestration
Actions can be event driven
Can trigger events in a context. 

### Rearward exhaust component
Activates on launch event
Deactivates on launch done event

### Playing sounds 
This is something shared by a lot of entities. There's probably already a hook for it.
Found this: https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/

### Swapping textures
Could work minimally with a reference to the mesh on which to swap out the texture. Might even be able to get a away with a reference to the material itself. Swap the texture on that.

Make a hook that swaps textures on certain events

### Swapping models
If all models are swapped the same way, then relevant parameters can be provided to achieve the swap. 
- Models to swap
- bounding box to black out. 

### Wrapping as one abstract component
I'm not sure it's possible to completely abstract that, but will try as much as I can. So the abstract component might be `<GenericScene />` instead of `<NG12LaunchScene />`. Again, I'm not sure how much I can/should abstract all of that. It might be better in this case just to follow a pattern for a scene. 
