<div align="center">
  <img src="https://raw.githubusercontent.com/DevBash1/eoion/main/logo.png" />
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

<!-- Why use? -->

## :question: Why Use Eoion?

When compared to other state management solutions like Redux, `eoion` stands out for its simplicity and ease of use, especially for developers who want to avoid complex boilerplate and setup.

### Key Advantages:

### 1. **Minimal Boilerplate**

With `eoion`, you can create and use a store with just a few lines of code, unlike Redux, which requires setting up actions, reducers, and a store.

**Example:**

```javascript
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
```

In contrast, Redux would require defining actions, action creators, reducers, and connecting the component.

### 2. **Easy Integration with React**

The `useStore` hook makes it simple to connect your components to the store without any extra setup.

**Example:**

```javascript
import React from "react";
import { createStore, useStore } from "eoion";

const store = createStore({ theme: "light" });

function ThemeToggler() {
    const [theme, setTheme] = useStore(store.subscribe("theme"));

    return (
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle Theme
        </button>
    );
}
```

No need for `mapStateToProps` or `connect` like in Redux—just use the state directly in your component.

### 3. **Flexibility**

`eoion` supports custom validators, persistent state, and reducers, offering a versatile solution while keeping things simple.

**Custom Validator Example:**

```javascript
const validator = (state, value) => {
    if (state === "age" && (value < 0 || value > 120)) {
        console.error("Invalid age value!");
        return false;
    }
    return true;
};

const store = createStore({ age: 25 }, validator);
```

This level of customization is available without any additional libraries or complex configurations.

### 4. **Performance**

`eoion` is designed with performance in mind, ensuring efficient state updates and avoiding unnecessary re-renders.

**Example:**

```javascript
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
        </div>
    );
}
```

### 5. **Small Learning Curve**

The straightforward API of `eoion` makes it easy to learn, especially for developers who are familiar with React hooks.

**Example:**

```javascript
const store = createStore({ message: "Hello, World!" });

function MessageDisplay() {
    const [message] = useStore(store.subscribe("message"));

    return <p>{message}</p>;
}
```

With `eoion`, you can focus on building your application rather than managing complex state logic.

<!-- Usage -->

## :eyes: Usage

### Basic React Example

store.js

```javascript
import { createStore } from "eoion";

const store = createStore({
    count: 10,
});

export default store;
```

app.js

```javascript
import React from "react";
import { useStore } from "eoion";
import store from "store.js";

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

store.js

```javascript
import { createPersistentStore } from "eoion";

const store = createPersistentStore("mystore", {
    count: 10,
});

export default store;
```

app.js

```javascript
import React from "react";
import { useStore } from "eoion";
import persistentStore from "store.js";

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

store.js

```javascript
import { createPersistentStore } from "eoion";
import store from "store.js";

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

export default store;
```

```javascript
import React from "react";
import { useStore } from "eoion";
import store from "store.js";

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
