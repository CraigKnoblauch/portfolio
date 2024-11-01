 Building a simpler SPA
To reduce the scope of this project, and to get something delivered, I'm going to reign in the scope a ton. Instead of doing a full blown game for this release, I'm going to do a much simpler SPA. This is still going to hit my goals of having a portfolio on the web - my own corner of the internet - but it's also going to free me up to do much more things until I want to come back to implementing the full game. Or maybe I'll ignore all this once I've refactored my components for testing. Maybe by then it won't seem like such an arduous task. 

Recall the funcitonal components I laid out in the redesigning for testing document:

## Functional modules that make up the project
Here's all the functional components I can think of in this project
- The front page
- The camera control
    - Routing
    - Moving with scroll wheel
- The model management
    - Loading
    - Placing
- The rabbit
    - Animation
    - Movement (not by player)
- Textures
    - Loading
    - Applying
- Shaders
    - Defining
    - Applyiing
- Scene management
    - Animations
    - Reseting
- Physics
- Sounds
    - Music
    - Sound effects
- The html elements
    - buttons
    - fun css stuff (I know so little about this I barely know how to write about it)
- Links
    - Actions that happen off of them 
    - Pages loaded off of them, not sure how that looks

## Terminology
Some helpful terms that might help me organize some things (https://gameprogrammingpatterns.com/component.html)

**Decorations**: Textured models that are not included in scenes.

**Props**: Textured models that are included in scenes

**Sensors**: Invisible entities that can be interacted with to trigger an event.

**Scenes**: Collections of textured models and their animations. Ideally this is a self contained component that has all of the things a user would __see__ in a particular sectoin of the website. Whether it's the full app or the simple SPA, this idea would work for either.

## Everything about a Scene
A scene shall contain textured models.
Models can have animations associated with them.
Animations can be always running.
Animations can be triggered by a user event.
A scene can be reset by time
A scene can be reset by event
All the components of a scene need to decide how they respond to a reset
Sound effects can play during a scene. Triggered by a user event or by time
Scenes will have 1 to many cameras.
Cameras can be animated (their position, rotation, other attributes)
Cameras can be switched to another camera in the scene

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

### Animations
I was thinking that some base level of entity would have animations defined, but actually I think it makes more sense for the Scene, the highest level, to define animations. Or, in ECS land, to have several animation components. All an animation is is changing the state of an entity on each frame. So there's not much reason that the different elements of the animation would get out of sync. 

Then, if you have the animation components at the top level, you can have an event manager component decide when to trigger them. And that event system can do all that without knowing that it is triggering an animation. All it knows is it's making a callback on an event.

## Reading list
Read about Entity-Component-System (ECS) architecture. From the little I researched on this subject that looks like it may be a good way to go. 
### Data-Oriented Design: https://www.dataorienteddesign.com/dodbook/

See below. The data of objects can be shared right, but you shouldn't couple objects to make that share. If you start with the assumption of separating **data** instead of **responsibility**, then you can add **responsibiilty** where needed later.
```
 This is where it gets a bit philosophical. Each system has an idea of the data it needs in order to function, and even though they will overlap, they will not share all data. Consider what it is that a serialisation system needs to know about a character. It is unlikely to care about the current state of the animation system, but it will care about inventory. The rendering system will care about position and animation, but won't care about the current amount of ammo. The UI rendering code won't even care about where the player is, but will care about inventory and their health and damage. This difference of interest is at the heart of why putting all the data in one class isn't a good long-term solution.

The functionality of a class, or an object, comes from how the internal state is interpreted, and how the changes to state over time are interpreted too. The relationship between facts is part of the problem domain and could be called meaning, but the facts are only raw data. This separation of fact from meaning is not possible with an object-oriented approach, which is why every time a fact acquires a new meaning, the meaning has to be implemented as part of the class containing the fact. Dissolving the class, extracting the facts and keeping them as separate components, has given us the chance to move away from classes that instill permanent meaning at the expense of occasionally having to look up facts via less direct methods. Rather than store all the possibly associated data by meaning, we choose to only add meaning when necessary. We add meaning when it is part of the immediate problem we are trying to solve. 
```

If you can define the behavior of a class with a collection of components, you no longer need the class. In our project, we could decompose the problems enough where a Scene could contain a bunch of components defining the behaviors and data. Then a new scene would be defined simply as a collection of those components.

### Entity Component Systems and You: They're Not Just For Game Developers
https://www.youtube.com/watch?v=SFKR5rZBu-8
https://secretlab.institute/

Lol diamond problem: https://youtu.be/SFKR5rZBu-8?t=554

Dungeon Siege pioneered ECS. Follwed by Operation Flashpoint: Dragon Rising. Dev Adam Martin maintains a good blog: 
- https://www.protopage.com/a-d-a-m 
- https://new.t-machine.org/index.php/category/entity-systems/

Entities have IDs. An entity is an object in the software. An identifier, no logic.
Components have data
Systems have logic

Will have to watch again, but left off at 32:54




