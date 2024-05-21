# Flames

## Particles
Much in the same way that we did the galaxy simulator for three js jhurney, we could do something similar for rocket falmes. There is an eissue thought I think in that the prarticles need to be fairly close together. Might look a tad odd.

## Custom Shader
What I really want is to have a mesh in the right shape as my flames, but have the material be defined as a custom shader. 

## Realism
There's a line with the level of realism. Too real looks odd and doesn't fit the aesthetic, but I'm still looking for something a little more detailed than the dodecahedron technique I used with the exhaust. 

On a scale of 1 to 10, where 1 is yellow dodecahedrons in a line, and 10 is realistic looking flames, I'm looking for a 6. It's also the shape of the flames is so smooth. There's not really a cartoony analog that goes with it. 

## Jagged flames
You know how the flames seem to jump around while the rocket flys up, I was watching this: https://www.youtube.com/watch?v=SoYq9pIwVw8

It looks like that designer actually varies the position of the end vertices. 

In the reference images of the flames, it appears almost like there's two flames. In fact, I think I would be able to achieve the effect I want with two meshes. 
- Mesh 1: The yellow flame emitting straight from the exhaust
- Mesh 2: The blue flame that appears to form a jagged case around the yellow exhaust

# Custom Shader
I'll make a mesh that has about the right shape as the flame exhaust, and have it for nozzle1 and nozzle2. 