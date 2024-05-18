![alt text](image-6.png)

# Code
```jsx
const triggerVolume = new THREE.Box3().setFromObject(triggerObject);

// In your update loop:
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera); // Assuming you're using the mouse position

const intersects = raycaster.intersectObjects(scene.children);
for (let i = 0; i < intersects.length; i++) {
    if (triggerVolume.containsPoint(intersects[i].point)) {
        console.log('Trigger volume hit!');
        // Handle the trigger event here
    }
}
```

# Propogating a hit through the system
Yes we could couple the Rabbit and the trigger volumes and hack the solution that way, but I think there's a more elegant solution.

## Ray Casting
In rapier, you can cast a ray from an origin in a direction. 
- origin -> Rabbit position
- direction -> Rabbit forward vector

### world.CastRay QueryFilterFlags
You can pass flags to the castRay method to exclude certain colliders. In reading about this, I found Sensor colliders.

# Getting collision events from the world
Rapier World class docs: https://rapier.rs/javascript3d/classes/World.html

On each frame I can get updates from the world.
I can check each of those events for `event.types === "contact"`.
I'll be able to get both colliders from that event. I'll check if colliders are my trigger volume and the rabbit. I believe RigidBodies have user data so that's how I can pass the identity of the rabbit without my trigger volumes having to know about the Rabbit. 

I'm a little concerned about checking every single world even on every single frame. I could do a few things to mitigate
- Early break: The Rabbit can only be interacting with one thing at once. If I find that thing, I can break out and not check more events.
- Test the event list length. If the event list isn't that long, this isn't a real issue.

# Sensor colliders
From Copilot: "Sensor colliders are useful for creating areas in your game world that trigger certain actions when an entity enters, stays within, or leaves them." That's good for me. Getting collisions from the world will work for an entity entering, but will require some extra work for staying and leaving. If I can figure out how to make a trigger volume a sensor I think this would be the most appropriate solution. 

The approach for this still looks like iterating through the events from a world step. Therefore it's time to set up a small experiment and see what I get out of these events. I'm looking for
- How many events are there each frame
- What are the different types of events. So far I've seen "contact" and "intersection"

# Collison Events
After all that research, there's a page on the front page of the documentation about collision events: https://pmndrs.github.io/react-three-rapier/#collision-events

The docs show that you can have callbacks for `onCollisonEnter` and `onCollisionExit`. This is also where you can set the collider to be a sensor. You do this with ColliderOptions: https://pmndrs.github.io/react-three-rapier/interfaces/ColliderOptions.html

# TriggerVolume design
TriggerVolume will be responsible for the triggler volume meshes. How they display and how collisions with the rabbit are handled. 

Each TriggerVolume will have:
- The trigger volume mesh
- A collider that allows dynamic bodies to enter and responds to enter, stay, and exit

On Enter, the trigger volume will show the interaction icon. This icon depends on if we're on desktop or mobile.

On Stay, the trigger volume will contineu to show the interaction icon.

On exit, the trigger volume will cease to show the interaction icon.

On click, the trigger volume will direct the user out to the provided link

## Enter and exit events achieved with sensors
```jsx
<RigidBody type="fixed"
           onIntersectionEnter={() => {console.log("Intersection Enter")}}
           onIntersectionExit={() => {console.log("Intersection Exit")}}
           sensor={true}
>
    
    <mesh geometry={model.geometry}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          visible={true}
          onClick={() => window.location.href = link}
    >
        <meshBasicMaterial color="red" wireframe />
    </mesh>
</RigidBody>
```