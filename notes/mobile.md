# Joystick
Checkout out https://www.npmjs.com/package/react-joystick-component
Basically exactly what I'm looking for and will link right in with my current movement controls

The Joystick's direction.angle will give a string representing the direction has the joystick
- "up"
- "down"
- "right"
- "left"

# Using Joystick like Keyboard controls
Joystick provides places to put callback functions. This approach feels too couply for me. I'd rather have Joystick behave like Keyboard controls where I can use the hook `useKeyboardControls` in Rabbit and get access to it's state. 

I think I can accomplish that by extending Joystick, and creating a hook that returns something similar to keyboard controls. Then if I make the outputs of keyboard controls and the extended joystick similar enough, I won't have to change the rabbit control section too much to account for the mobile controls. Polymorphism for the win.

# Refactoring Rabbit for mobile and keyboard controls
Decision needs to be made whether to take inputs from mobile or from keyboard

After that, a common identifier for the choice of direction should be used to keep the code reusable. 

# Interupting physics engine?
When I move the rabbit with the mobile UI, it glithces through the floor. My only guess is that the mobile ui is interupting the physics engine somehow. The physics debug view glitches off when I interact with it. That's all I got.

Found this fix: ![alt text](image-7.png)