Rapier JS docs: https://rapier.rs/docs/user_guides/javascript/getting_started_js
react-three-rapier: https://pmndrs.github.io/react-three-rapier/

# Rigid Bodies
https://rapier.rs/docs/user_guides/rust/rigid_bodies/

## Types
From the Rapier documentation:
`RigidBodyType::Dynamic`: Indicates that the body is affected by external forces and contacts.
`RigidBodyType::Fixed`: Indicates the body cannot move. It acts as if it has an infinite mass and will not be affected by any force. It will continue to collide with dynamic bodies but not with fixed nor with kinematic bodies. This is typically used for the ground or for temporarily freezing a body.
`RigidBodyType::KinematicPositionBased`: Indicates that the body position must not be altered by the physics engine. The user is free to set its next position and the body velocity will be deduced at each update accordingly to ensure a realistic behavior of dynamic bodies in contact with it. This is typically used for moving platforms, elevators, etc.
`RigidBodyType::KinematicVelocityBased`: Indicates that the body velocity must not be altered by the physics engine. The user is free to set its velocity and the next body position will be deduced at each update accordingly to ensure a realistic behavior of dynamic bodies in contact with it. This is typically used for moving platforms, elevators, etc.

For the rabbit, I believe I want `RigidBodyType::KinematicPositionBased`. In that case, to set the position, we would use specific methods for modifying the position (`RigidBody::set_next_kinematic_rotation`, `RigidBody::set_next_kinematic_translation`). If we modify the position directly, it's akin to teleporting it. I'm a little concerned about this though, because it looks like kinematic bodies won't be affected by colliders. Will have to test it.

## Rotation (aka Orientation)
The rotation values on Rigid bodies oscillate from -1 to 1.
In Rapier docs this is also called _orientation_. It's represented as a _unit quaternion_.

## Damping
Liner and angular damping are both available to slow down the movement of a rigid body

## Sleeping
Make sure the rabbit doesn't sleep. Meaning that physics computations will no longer run on it if it's idle too long. 

Although, if a sleeping rabbit doesn't fall through the floor, this could be a good thing for us. We might be able to catch the go to sleep signal and use it to trigger the idle rabbit animation. Just an idea.