In teh beta, I threw stuff together. AS I move towards a v1 release, there's probably a bunch o fcleanring and such that I have to do.

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
I know I do quite a bit of that

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


I
