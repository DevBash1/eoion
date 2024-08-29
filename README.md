<div align="center">
  <img src="https://tmpfiles.org/dl/11955587/icon.png" />
  <h1>eoion</h1>
  
  <p>
    A versatile state management library that works seamlessly with React!
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/DevBash1/eoion/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/DevBash1/eoion" alt="contributors" />
  </a>
  <a href="https://github.com/DevBash1/eoion/commits/main">
    <img src="https://img.shields.io/github/last-commit/DevBash1/eoion" alt="last update" />
  </a>
  <a href="https://github.com/DevBash1/eoion/network/members">
    <img src="https://img.shields.io/github/forks/DevBash1/eoion" alt="forks" />
  </a>
  <a href="https://github.com/DevBash1/eoion/stargazers">
    <img src="https://img.shields.io/github/stars/DevBash1/eoion" alt="stars" />
  </a>
  <a href="https://github.com/DevBash1/eoion/issues/">
    <img src="https://img.shields.io/github/issues/DevBash1/eoion" alt="open issues" />
  </a>
  <a href="https://github.com/DevBash1/eoion/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/DevBash1/eoion.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/DevBash1/eoion/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/DevBash1/eoion">Documentation</a>
  <span> · </span>
    <a href="https://github.com/DevBash1/eoion/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/DevBash1/eoion/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

-   [About the Project](#star2-about-the-project)
    -   [Tech Stack](#space_invader-tech-stack)
    -   [Features](#dart-features)
-   [Getting Started](#toolbox-getting-started)
    -   [Installation](#gear-installation)
    -   [Usage](#eyes-usage)
-   [Contributing](#wave-contributing)
    -   [Code of Conduct](#scroll-code-of-conduct)
-   [License](#warning-license)
-   [Contact](#handshake-contact)
-   [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

`eoion` is a lightweight, framework-agnostic state management library that integrates smoothly with React. It allows developers to manage application state efficiently without the need for complex boilerplate.

<!-- TechStack -->

### :space_invader: Tech Stack

This package supports integration with:

-   React

<!-- Features -->

### :dart: Features

-   Simple API with minimal boilerplate.
-   Efficient and performant.
-   Supports custom validators and initial state.
-   Seamless integration with React.
-   Persistent state management with localStorage support.

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Installation -->

### :gear: Installation

Install `eoion` via npm or yarn:

```bash
npm install eoion
```

or

```bash
yarn add eoion
```

<!-- Usage -->

## :eyes: Usage

### Basic React Example

```javascript
import React from "react";
import { createStore, useStore } from "eoion";

const store = createStore({ count: 0 });

function Counter() {
    const [count, setCount] = useStore(store.subscribe("count"));

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default Counter;
```

### Persistent State Example

```javascript
import React from "react";
import { createPersistentStore, useStore } from "eoion";

const persistentStore = createPersistentStore("counterStore", { count: 0 });

function PersistentCounter() {
    const [count, setCount] = useStore(persistentStore.subscribe("count"));

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default PersistentCounter;
```

### Using Reducers Example

```javascript
import React from "react";
import { createPersistentStore, useStore } from "eoion";

const store = createPersistentStore("reducerStore", { count: 0 });

store.reducer("count").set((state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
});

function CounterWithReducer() {
    const [count] = useStore(store.subscribe("count"));

    return (
        <div>
            <p>{count}</p>
            <button
                onClick={() =>
                    store.reducer("count").dispatch({ type: "INCREMENT" })
                }
            >
                Increment
            </button>
            <button
                onClick={() =>
                    store.reducer("count").dispatch({ type: "DECREMENT" })
                }
            >
                Decrement
            </button>
        </div>
    );
}

export default CounterWithReducer;
```

### Reducer Subscription Example

```javascript
import React from "react";
import { createPersistentStore, useStore } from "eoion";

const store = createPersistentStore("reducerSubscribeStore", { count: 0 });

store.reducer("count").set((state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
});

function CounterWithReducerSubscribe() {
    const [count, setCount] = React.useState(store.getState("count"));

    React.useEffect(() => {
        const unsubscribe = store.reducer("count").subscribe((state) => {
            setCount(state);
        });

        // setCount(store.getState("count"));

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <p>{`Count: ${count}`}</p>
            <button
                onClick={() =>
                    store.reducer("count").dispatch({ type: "INCREMENT" })
                }
            >
                Increment
            </button>
            <button
                onClick={() =>
                    store.reducer("count").dispatch({ type: "DECREMENT" })
                }
            >
                Decrement
            </button>
        </div>
    );
}

export default CounterWithReducerSubscribe;
```

### Custom Validator Example

```javascript
import React from "react";
import { createStore, useStore } from "eoion";

const validator = (state, value) => {
    if (state === "age" && (value < 0 || value > 120)) {
        console.error("Invalid age value!");
        return false;
    }
    return true;
};

const store = createStore({ age: 25 }, validator);

function AgeValidator() {
    const [age, setAge] = useStore(store.subscribe("age"));

    return (
        <div>
            <p>Age: {age}</p>
            <button onClick={() => setAge(age + 1)}>Increment Age</button>
            <button onClick={() => setAge(age - 1)}>Decrement Age</button>
        </div>
    );
}

export default AgeValidator;
```

<!-- Contributing -->

## :wave: Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

### :scroll: Code of Conduct

Please read the [Code of Conduct](https://github.com/DevBash1/eoion/blob/main/CODE_OF_CONDUCT.md).

<!-- License -->

## :warning: License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Contact -->

## :handshake: Contact

Dev Bash - [@DevBash1](https://twitter.com/DevBash1) - ikorosamuel1@gmail.com

Project Link: [https://github.com/DevBash1/eoion](https://github.com/DevBash1/eoion)

<!-- Acknowledgements -->

## :gem: Acknowledgements

-   [Shields.io](https://shields.io/)
-   [Awesome README](https://github.com/matiassingers/awesome-readme)
-   [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#travel--places)
-   [Readme Template](https://github.com/othneildrew/Best-README-Template)

---
