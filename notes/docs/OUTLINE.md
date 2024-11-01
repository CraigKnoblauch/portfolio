About
[x] Introduction
- Seeing Bruno Simon's website in 2019
- Always wanting to build something similar
- Loving software development
- Wanting to be my own site rather than a Bruno Simon clone
Design
- Philosophy of the site
    - The experience I wanted for a user
    - Thinking a garden would be best for how I would want a user to feel when welcomed into my world.
- Layout design
Challenges
- Learning React
- Learning JS
- Learning front end development having never even made a simple website before
- Learning 3D modeling
- Thinking in 3D
- Architecture challenges

Thinking in 3D
- Vectors
------------------------------------------------
[x] Making the models
- Lessons learned in blender
- Models started very complex then I realized the time required to get what I needed was absurd for this level of detail
- The ASU model
- The Phoenix logo model (proud of it but I would do it differently now)
- The rocket model
- The vanguard model
- The NRL model (adapting to realities of work but still being able to represent the work)

Making the rocket launch scene
- Deciding on what the user might see
- A proper relationship between realism and cartoon for the context
- Copilot helping with the exhaust
- How the exhaust works
- How the rocket flames shader works
- The transition design
    - The plan
- The launch button

Making the rabbit hole
- Adapting an existing model to work on this scene
- Modifying the floor and creating the hole
- The portal shader 

Making the homelab
- Originally a very complex model
- How I did the logo models, and how I would do them now (getting more clever with wrapping textures instead of having geometries, especially for docker)
- Planes for activity and link light shaders (not going to implement)
- Modeling the ethernet connectors. Using proportional editing to blend them
---------------------------------------------------------------

The rabbit user model
- Reused from (source)
- Source of collision woes because I don't really know how to work with that thing
- Animations 
   - Design for full release
---------------------------------------------------------------

Mobile controls
- Joystick design
- Goofed on minimal testing for mobile

---------------------------------------------------------------

[x] Textures
- Matcaps
- Select UV maps
- Shaders
- Baked shadows
---------------------------------------------------------------

Scalability
- Project section definitely scalable
- Divisions by sections allowed for rapid prototyping

[x] Releasing a beta
- Gave me a clear deadline and a resistance to scope creep
- User feedback was on stuff that I didn't think would be an issue XD.
- Design decisions driven by user feedback:
    - A rework of the camera system
    - An ability to reset the launch animation
    - Working on the mobile controls to make them more seamless
    - Reworking the loading screen to be clear about the intention of the site.
    - Rethinking the narrative flow of the site
        - Making the "point" immediately apparent on load and entry into the 3d scene.
    - Fixing other misc. bugs

[ ] Redesigned camera system
    - Camera zones
        - useSwitchCamera and having all it does is switch camera. Not over designing it so its easy to test
        - constructing a collision area from a path (motivation and solution)
    - Camera following a user along a track
        - Design requirements like 
        - Attempt at brute force solution
        - Attempt at searching for an intersection
        - Design for a PID controller combination for optimizing distance and viewing angle
    - Option for user to freely move camera

[ ] Loading screen
   - Having a title screen that communicates what the site is for. Users loaded in and were like "What's the point?"

[ ] Mobile controls
    - Who knows what's wrong with those
    - Tutorial to usher user how to use them

[ ] Narrative flow
   - Influenced by camera work
   - Signs included

   - Reworked project area
        - Hidden behind fog wall
        - Fog wall shader

[ ] Reset the rocket launch scene (see making the scene above)

Learning about how to write testable component after the beta
    - Realizing a bunch of my components are highly coupled and not testable

Refactoring
- Launch component to be testable and reusable

Decisions with React
- Most of my work happens outside of the react renderer
- Trying to use hooks but thinking KISS is better for me. Behaviors that would normally classify as effects aren't really effects since they shouldn't have an influence on the react renderer (I think)

Physics

TriggerVolumes
- In current state not very testable or decoupled
- Neat effect though

Future
- Integrating a backend
- Building a system to test performance in a simulated environment (this sounds super fun)
- Adding projects to the project area
    - Aurora shader that pulls from the NOAA prediction website
