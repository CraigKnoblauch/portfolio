# Redesigning for testing
You know when you write a project for the first time. It's small, everything is flowing and everything is great. Then, over the course of about 6 months, you learn a lot more about your craft. You look back at that beautiful code base you're so proud of, and it's just awful. Why is everything so coupled? Why do I have to mock so much just to test this. This is exactly what happened to me. 

I'm lucky enough to work for an organization that values investment into software enigneering as a craft. Over the past 6 months, I learned how to build software modules with testing in mind. And let me tell you, the modules I built for this project do not fit that criteria.

## Coupling
A depends on B depends on C depends on D. A lot of us are familiar with the hell that this can be. Good design means that you can have these scenarios, but A should know nothing about how the internals of B works, B has no idea how the internals of C works, and on and on. That way, the modules don't make assumptions about how their data will be treated.

A can have B, B can have C and so on, but A should be given B. That makes testing easier. Let's say at runtime, A has B but B requires a lot of scaffolding to operate correctly. During testing, to test just the functionality of A, we can pass A a B-stub. To A, B-stub works exactly like B, but we don't require all of the runtime to exist for B to run at test time.

Resource to read about design patterns for decoupling: https://gameprogrammingpatterns.com/decoupling-patterns.html

## Side-effects
So you've got some functions in A, but those functions do more than they say they do. And worse than that, those functions modify state that they really have no need to. 

## Simple implementations
Make sure you understand how your implementations work and that you keep them simple. I spent a long time trying to understand how hooks and effects work into my project when a JS class would do the job just fine. In fact, my react app barely has any rerenders. Most of the stuff you see happens in the useFrame hook anyway. Which should be entirely outside the react renders.

# Current state of all components


# Functional modules that make up the project
Here's all the functional components I can think of in this project
- The front page
- The camera control
    - Routing
    - Looking
    - Switching
- The model management
    - Loading
    - Placing
- The rabbit
    - Animation
    - Movement
- Textures
    - Loading
    - Applying
- Shaders
    - Defining
    - Applyiing
- Controls
    - keyboard
    - mobile
    - affecting the rabbit
    - Giving the user hints
- The perspective control for mobile vs. desktop
- Links
    - Setting click throughs
    - Animations
    - Interactions with character
- Scene management
    - Animations
    - Reseting
    - Interaction with camera
    - Interaction with character (think how rabbit can hit launch button or rabbit can go down rabbit hole)
- Physics
- Sounds
    - Music
    - Sound effects