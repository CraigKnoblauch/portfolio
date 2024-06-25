In teh beta, I threw stuff together. AS I move towards a v1 release, there's probably a bunch o fcleanring and such that I have to do.

# Rules of React
During review, go through and see if any are violated

https://react.dev/reference/rules

# Components. What they are really and what their scope should be
Components are meant to be kept pure. Given the same input, always the same output. Components are not meant to modify their inputs. I'm probably doing that quite a bit.

Expanding on the above, if a components state or props don't change, it shouldn't re-render. I see my areas re-render all the time. I see the console.log(nodes) fire off a bunch on just the career area. A refactor should address that problem. I think this is in my tasks list.

Re-renders happen when there's a change in the state of their state or props. 

Comonents should **never nest definitions of other components**. I.e. this:
```jsx
function Profile () {
    // ...
}

export default function Gallery() {
    return <>
        <Profile />
    </>
}
```
not this:
```jsx
export default function Gallery() {

    function Profile () {
        // ...
    }

    return <>
        <Profile />
    </>
}
```
I know I do quite a bit of that. The second example in this case will render a different Profile component if the state of Profile changes. That means the state of Profile will be destroyed and recreated from start.

Anything that needs to happen our change outside of a React render, i.e. moving meshes or moving the rabbit or clicking somehting, etc. need to be handled by event handlers. These can be defined inside the component, but don't need to be pure. In these cases, `useEffect` should be a last resort. It tells react to execute this after rendering. I should exhaust other options of implementing the behavior before using a `useEffect`. 

# UI Tree
Components are in a tree relationship. I'm not sure what that really means for my app. Didn't understand this section too much

# Interactivity
Any variables that need to maintain state should be declared with the `useState` hook. I would think that would maintain the state between renders. My components could probably use those quite a bit more. 

## Event handlers
Event handler functions are usually defined **inside** the component. Seems like for reuse there should be a way to do that outside. 

You can also pass an event handler as a prop. This means I'll have to do some thinking on where the event handler should live in the component tree. This is necessarily because components are arranged in a hiarchal relationship. 

Events will propogate **up the component tree**. To stop this propogation, catch the callback's event property and call `stopPropagation()`. i.e.
```jsx
<button onClick={e => {
    e.stopPropagation();
    onClick();
}}>
```
 You can use `e.preventDefault()` to stop default events from occurring. This might help with the enter button causing a dozen tabs to open problem you're seeing in the beta.


## Managing state in a component. 
Pick up from here: https://react.dev/learn/state-a-components-memory



## Render and commit

## Re-rendering after setting state
Something like:
```jsx
const [score, setScore] = useState(0);

function increment() {
    setScore(score + 1);
}
```

But the following will. Inside the setScore call, an updater is being used.
```jsx
const [score, setScore] = useState(0);

function increment() {
    setScore(s => s + 1);
}
```

If updating the state of an object, you can't do it directly. Check out: https://react.dev/learn/updating-objects-in-state

# Managing state
Interested in:
- How to share the state of the rabbits in a scalable way where the rabbit isn't coupled and those that consume the rabbit aren't able to modify the rabbit.
- How to share and control the state of the active camera so I can implement my camera pathing.
- How to effectively manage the state of scenes in a scalable way. The only scene I have for v1 is the rocket launch scene, but in the future that could change.
- How to share the state of the controls such that they're not as coupled and there's no lag between the user acting and the rabbit reacting

You can _lift state up_, where you take the state that you want to share between components, and pass it down the tree through props. 

When you share state through props, you know that when the state changes, a re-render will occur in response to the prop changing.

I think you can think of a re-render as refreshing the internal state of the app. I'm not sure it's necessarily a ui render. 

Reducers can be used when you have a lot of different states to update. An arbitrary action can be interpreted to change all relevant related state variables. I would be aware though that state that has nothing to do with each other shouldn't be grouped into the same reducer. A reducer might be a good fit for all the states of the launch scene.

A context can be used to pass state deep into a component tree. Any component in a tree under a context parent can access the state from the context.

You can combine contexts and reducers together to manage the state of a complex group. Again I would think the launch scene as fitting this. 

Don't put props **into** state unless you want to prevent updates

## Designing the state
It might be good to create a state diagram of our complex systems. Just to have as documentation.

Here's a question, when should I use _state_ and when should I use a _ref_?

## Lifting state
In the case where you lift state up, you should try to design it such that only one component is responsible for altering that state. Even if the state is shared among multiple children components.

## Preserving and resetting state
React ties state to a position in the render tree, rather than an individual component. In the example below, each counter retains its own state as long as the components are drawn in the same place. As soon as that's not the case, the state is destroyed. This is a little counter intuitive to me becauase I would see those as being the same components.
```jsx
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

**QUESTION** This is confusing. The docs show both a situation like this:
```jsx
<div>
  {counter}
  {counter}
</div?
```
and this
```jsx
<div>
  <Counter />
  <Counter />
</div
```
and talk about them like they're the same thing. I would think the states would be independent in the second code snippet but the same in the first.


React holds the state associated with the component, not the other way around. React tracks the state for the component by the literal position of the component in the render tree.


In order for two components of the same type to be independent, they either need to be rendered in different positions, or be rendered with a unique key. In my case, I have some conditional meshes, If a mesh is there on one condition and not on the other, who knows which mesh state it will actually preserve. For my case it's propably easiest to just **pass a key prop** to each component that has the potential to render in the same place as another (which is a ton of them).

NOTE keys only specify postion **within the parent**. 

## State logic with reducers
Use a reducer to refactor complex states where a lot of state is shared and modified in similar ways.

Check out use-Immer for concise reducers

## Contexts
Pass state down a render try an arbitrary amount of levels. Probably the solution that I want for:
- Complex animation scenes
- Control inputs (maybe)
- Rabbit position (there's probably a better way to handle that rather than sharing this state with EVERYTHING ((especially since a change in the rabbit's position shouldn't trigger a react re-render. In fact I'm not sure any of the mesh changes should)))

## Refs, Effects
Use `useRef` when you want to track and alter state **without** triggering a re-render.
Use `useEffect` to synchronize non-react components and external systems. Probably perfect for our use cases.

Effects are triggered by the render itself, rather than a particular event. Odd that I use them at all if that's the case. I would think I would have very few React renders. Effects run at the end fo a commit after the screen updates. 

Think of the component code. You have the stuff you do before the return, then the return itself. The react renderer finalizes a commit of the return, then runs stuff in `useEffect`.

If you have something that needs to happen outside the rendering calculation, meaning somehting that isn't pure, you move it into a `useEffect`.

You can add dependencies to an array as the last argument of `useEffect`. That will make sure that the code doesn't run if the dependency hasn't changed. 

React calls effect code twice on a mount, in development only.

**Specifying no dependency will have the effect run only on mount (when the component appears)**

Don't use refs to hold state so that you can use it as a conditional in your effect. Think how you woul have proper clean up and dependencies instead.

Clean up of an effect should reset things to their initial state.

## Knowing if you need an Effect
Refer to this section of the documentation if you want to go through your uses of Effects and see where you can have other solutions or where you might be doing it correctly.

Not for user events. Use event handlers for that
Not for updating state. State updates trigger a re-render, then the commit triggers an Effect, then the state change triggers a re-render, on and on.

**Use effects to syncronize with external systems**

Use an Effect **because a component is showed to a user**. Not because the user caused an event.

Use `useSyncExternalStore` for syncing with stores rather than doing that in an Effect

## Custom hooks
Moves functionality that you might have in a useEffect, that you want to share among other componentnts, into its own hook.

If a function doesn't use a hook, it doesn't need to be a hook.

Use hooks to share stateful logic, but not state itself.

Hooks re-run when the component renders.







