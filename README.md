<div align="center">
  <img src="https://raw.githubusercontent.com/DevBash1/eoion/main/logo.png" />
    <h1>eoion</h1>

[![npm version](https://img.shields.io/npm/v/eoion.svg)](https://www.npmjs.com/package/eoion)
[![license](https://img.shields.io/npm/l/eoion.svg)](https://github.com/DevBash1/eoion/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dt/eoion.svg)](https://www.npmjs.com/package/eoion)
[![issues](https://img.shields.io/github/issues/DevBash1/eoion.svg)](https://github.com/DevBash1/eoion/issues)

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
</p>
</div>

> **Eoion** is a lightweight, flexible, and easy-to-use state management library for React applications. It offers both simple and persistent state management solutions with minimal boilerplate, making it an excellent choice for developers seeking simplicity and efficiency.

---

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Getting Started](#getting-started)
    -   [Creating a Simple Store](#creating-a-simple-store)
    -   [Creating a Persistent Store](#creating-a-persistent-store)
    -   [Using the `useStore` Hook](#using-the-usestore-hook)
-   [API Reference](#api-reference)
    -   [`createStore`](#createstore)
    -   [`createPersistentStore`](#createpersistentstore)
    -   [`useStore`](#usestore)
    -   [Store Methods](#store-methods)
    -   [Reducers](#reducers)
    -   [Custom Validators](#custom-validators)
    -   [Custom Methods](#custom-methods)
-   [Examples](#examples)
    -   [Counter Example](#counter-example)
    -   [Theme Toggler Example](#theme-toggler-example)
    -   [Asynchronous Initial State Example](#asynchronous-initial-state-example)
-   [Comparison with Other Libraries](#comparison-with-other-libraries)
    -   [Eoion vs. Redux](#eoion-vs-redux)
    -   [Eoion vs. Context API](#eoion-vs-context-api)
    -   [Eoion vs. Zustand](#eoion-vs-zustand)
    -   [Eoion vs. Recoil](#eoion-vs-recoil)
-   [Contributing](#contributing)
-   [License](#license)
-   [Contact](#contact)

---

## Features

-   **Lightweight and Simple:** Minimal setup and easy-to-understand API.
-   **Flexible State Management:** Supports both simple and persistent stores.
-   **React Integration:** Seamless integration with React through custom hooks.
-   **Customizable:** Allows custom validators and methods for enhanced control.
-   **Reducer Support:** Built-in support for reducers to manage complex state transitions.
-   **Asynchronous Initial State:** Supports asynchronous functions for initializing state.
-   **TypeScript Support:** Fully typed for better developer experience.
-   **No External Dependencies:** Pure JavaScript implementation without any external dependencies.

---

## Installation

You can install **Eoion** via npm or yarn:

```bash
# Using npm
npm install eoion

# Using yarn
yarn add eoion
```

---

## Getting Started

This section will guide you through the basics of using **Eoion** in your React projects.

### Creating a Simple Store

```javascript
import { createStore } from "eoion";

// Define the initial state
const defaultStore = {
    count: 0,
    user: {
        name: "John Doe",
        age: 30,
    },
};

// Create the store
const store = createStore(defaultStore);
```

### Creating a Persistent Store

A persistent store saves its state to `localStorage`, allowing state persistence across browser sessions.

```javascript
import { createPersistentStore } from "eoion";

// Define the initial state
const defaultStore = {
    theme: "light",
    language: "en",
};

// Create the persistent store with a unique ID
const persistentStore = createPersistentStore("appStore", defaultStore);
```

### Using the `useStore` Hook

The `useStore` hook connects your React components to the store, providing real-time updates and state management.

```javascript
import React from "react";
import { useStore } from "eoion";

// Assuming you have already created a store
const Counter = () => {
    const [count, setCount] = useStore(store.subscribe("count"));

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;
```

---

## API Reference

### `createStore`

Creates a simple, non-persistent store.

**Syntax:**

```javascript
createStore(defaultStore, defaultMethods, validator);
```

**Parameters:**

-   `defaultStore` (Object): The initial state of the store.
-   `defaultMethods` (Object, optional): Custom methods to manipulate the store state.
-   `validator` (Function, optional): A function to validate state changes.

**Returns:**  
An object with the following methods:

-   `subscribe(name)`
-   `reducer(state)`
-   `getState(name)`
-   `getStates()`

**Example:**

```javascript
const store = createStore({
    isAuthenticated: false,
    user: null,
});
```

### `createPersistentStore`

Creates a persistent store that saves its state to `localStorage`.

**Syntax:**

```javascript
createPersistentStore(storeId, defaultStore, defaultMethods, validator);
```

**Parameters:**

-   `storeId` (String): Unique identifier for the store in `localStorage`.
-   `defaultStore` (Object): The initial state of the store.
-   `defaultMethods` (Object, optional): Custom methods to manipulate the store state.
-   `validator` (Function, optional): A function to validate state changes.

**Returns:**  
An object with the following methods:

-   `subscribe(name)`
-   `reducer(state)`
-   `getState(name)`
-   `getStates()`

**Example:**

```javascript
const persistentStore = createPersistentStore("userStore", {
    token: null,
    preferences: {},
});
```

### `useStore`

Custom React hook to manage and subscribe to store state.

**Syntax:**

```javascript
useStore(eoion, initialValue);
```

**Parameters:**

-   `eoion` (Object): The object returned by `store.subscribe(name)`.
-   `initialValue` (\*, optional): Overrides the store's default value for the subscribed state.

**Returns:**  
An array `[state, setState]`.

**Example:**

```javascript
const [theme, setTheme] = useStore(persistentStore.subscribe("theme"), "dark");
```

### Store Methods

When you subscribe to a state, you get access to several methods:

-   `storeId`: The unique identifier of the store.
-   `store`: The entire store object.
-   `onChange(state, value)`: Manually trigger a state change.
-   `getState(name)`: Get the current value of a specific state.
-   `getStates()`: Get the current values of all states.
-   `on(name, callback)`: Add a listener for a specific state update event.
-   `off(name, callback)`: Remove a listener for a specific state update event.

**Example:**

```javascript
const eoion = store.subscribe("user");

eoion.on("store-UPDATE-user", (newUser) => {
    console.log("User updated:", newUser);
});
```

### Reducers

Reducers allow you to manage complex state transitions.

**Setting a Reducer:**

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
```

\*\*

Dispatching Actions:\*\*

```javascript
store.reducer("count").dispatch({ type: "INCREMENT" });
```

**Subscribing to Reducer Updates:**

```javascript
const unsubscribe = store.reducer("count").subscribe((newCount) => {
    console.log("Count updated:", newCount);
});

// To unsubscribe
unsubscribe();
```

### Custom Validators

Validators allow you to enforce rules on state changes.

**Example:**

```javascript
const validator = (stateName, stateValue) => {
    if (stateName === "age" && (stateValue < 0 || stateValue > 120)) {
        console.error("Invalid age value!");
        return false;
    }
    return true;
};

const store = createStore({ age: 25 }, {}, validator);
```

### Custom Methods

You can define custom methods to manipulate state in a controlled manner.

**Defining Custom Methods:**

```javascript
const methods = {
    increment: (value, amount = 1) => value + amount,
    decrement: (value, amount = 1) => value - amount,
};

const store = createStore({ count: 0 }, methods);

const counter = store.subscribe("count");

counter.increment(); // Increments count by 1
counter.decrement(2); // Decrements count by 2
```

---

## Examples

### Counter Example

**Store Setup:**

```javascript
import { createStore } from "eoion";

const methods = {
    increment: (value) => value + 1,
    decrement: (value) => value - 1,
};

const store = createStore({ count: 0 }, methods);
```

**React Component:**

```javascript
import React from "react";
import { useStore } from "eoion";

const Counter = () => {
    const [count, setCount] = useStore(store.subscribe("count"));

    const increment = () => setCount(store.increment);
    const decrement = () => setCount(store.decrement);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;
```

### Theme Toggler Example

**Persistent Store Setup:**

```javascript
import { createPersistentStore } from "eoion";

const store = createPersistentStore("themeStore", { theme: "light" });

store.reducer("theme").set((state) => (state === "light" ? "dark" : "light"));
```

**React Component:**

```javascript
import React from "react";
import { useStore } from "eoion";

const ThemeToggler = () => {
    const [theme, toggleTheme] = useStore(store.subscribe("theme"));

    return (
        <div>
            <h1>Current Theme: {theme}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

export default ThemeToggler;
```

### Asynchronous Initial State Example

**Persistent Store Setup with Async Initialization:**

```javascript
import { createPersistentStore } from "eoion";

const defaultStore = {
    user: async () => {
        // Simulate async data fetching
        const response = await fetch("/api/user");
        const data = await response.json();
        return data;
    },
};

const store = createPersistentStore("userStore", defaultStore);
```

**React Component:**

```javascript
import React, { useEffect, useState } from "react";
import { useStore } from "eoion";

const UserProfile = () => {
    const [user, setUser] = useStore(store.subscribe("user"));

    useEffect(() => {
        const unsubscribe = store.reducer("user").subscribe((state) => {
            console.log({ state });
        });

        return () => unsubscribe();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Age: {user.age}</p>
        </div>
    );
};

export default UserProfile;
```

---

## Comparison with Other Libraries

| Feature               | Eoion             | Redux                     | Zustand           | Recoil                   |
| --------------------- | ----------------- | ------------------------- | ----------------- | ------------------------ |
| **Ease of Use**       | ⭐⭐⭐⭐⭐        | ⭐⭐⭐                    | ⭐⭐⭐⭐          | ⭐⭐⭐⭐                 |
| **Boilerplate**       | Minimal           | High                      | Minimal           | Moderate                 |
| **Bundle Size**       | Very Small        | Moderate                  | Very Small        | Moderate                 |
| **React Integration** | Seamless          | Requires Additional Setup | Seamless          | Seamless                 |
| **State Structure**   | Flexible          | Centralized Store         | Flexible          | Atom-based               |
| **Async State**       | Simple with Hooks | Complex (Thunk/Saga)      | Simple with Hooks | Built-in Async Selectors |
| **Community Support** | Growing           | Large                     | Growing           | Growing                  |

### Eoion vs. Redux

-   **Learning Curve:** Eoion is much easier to learn and use compared to Redux, which requires understanding concepts like actions, reducers, and middleware.
-   **Boilerplate:** Eoion requires significantly less boilerplate, making it faster to set up and use.
-   **State Persistence:** Eoion offers built-in persistent state management without the need for external libraries.

### Eoion vs. Context API

-   **Ease of Use:** Eoion provides a more straightforward and structured approach to state management compared to the Context API, which can become complex in large applications.
-   **Reusability:** Eoion’s store methods and custom hooks enhance reusability and separation of concerns.
-   **Performance:** Eoion’s subscription model can offer better performance in large applications by minimizing unnecessary re-renders.

### Eoion vs. Zustand

-   **Simplicity:** Eoion focuses on simplicity and ease of use, similar to Zustand, but with built-in support for reducers and state persistence.
-   **API Structure:** Eoion provides a more structured API, making it easier to manage complex state and reducers.
-   **React Integration:** Eoion’s `useStore` hook offers a familiar and intuitive way to integrate state management into React components.

### Eoion vs. Recoil

-   **Learning Curve:** Eoion is easier to learn and use compared to Recoil, which has a steeper learning curve due to its more complex API.
-   **Flexibility:** Eoion provides flexibility with custom validators and methods, while Recoil is more opinionated in its approach to state management.
-   **State Persistence:** Eoion offers state persistence out-of-the-box, whereas Recoil requires additional setup or third-party libraries for persistence.

---

## Contributing

Contributions are welcome! Please check out the [issues](https://github.com/DevBash1/eoion/issues) page to see what needs help.

---

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/DevBash1/eoion/blob/main/LICENSE) file for details.

---

## Contact

For any inquiries or issues, you can reach out via [email](mailto:ikorosamuel1@gmail.com) or connect with me on [Twitter](https://twitter.com/DevBash1).

---

**Eoion** - _Lightweight state management made easy._

---
