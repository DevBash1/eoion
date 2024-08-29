import { useEffect, useState } from "react";

/**
 * Generates a random string to be used as a store ID.
 * @param {number} length - The desired length of the generated ID string. Must be a positive integer.
 * @returns {string} A randomly generated string of specified length.
 * @throws Will throw an error if the length is not a positive integer.
 */
const getStoreId = (length = 5) => {
    if (
        typeof length !== "number" ||
        length <= 0 ||
        !Number.isInteger(length)
    ) {
        throw new Error("Invalid length: must be a positive integer.");
    }

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const listeners = {};
const reducers = {};
const stateReducers = {};

/**
 * Default validator function for store state changes.
 * @param {string} stateName - The name of the state property being validated.
 * @param {*} stateValue - The value of the state property being validated.
 * @returns {boolean} `true` if the state change is valid, otherwise `false`.
 */
const defaultValidator = (stateName, stateValue) => {
    return true;
};

/**
 * Creates a store with a unique ID and default state values.
 * @param {Object} defaultStore - An object representing the initial state of the store.
 * @param {Function} validator - A function to validate state changes before they are applied.
 * @returns {Object} An object containing methods to manage and subscribe to store changes.
 * @throws Will throw an error if defaultStore is not a non-null object.
 */
const createStore = (defaultStore = {}, validator = defaultValidator) => {
    if (typeof defaultStore !== "object" || defaultStore === null) {
        throw new Error("Invalid defaultStore: must be a non-null object.");
    }

    if (typeof validator !== "function") {
        throw new Error("Invalid validator: must be a function.");
    }

    const storeId = getStoreId();
    const store = { ...defaultStore };

    /**
     * Updates the store's state and triggers an event to notify subscribers of the change.
     * @param {string} state - The name of the state property to update.
     * @param {*} value - The new value for the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    const onChange = (state, value) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }

        const valid = validator(state, value);

        if (valid) {
            store[state] = value;
            if (listeners[`${storeId}-UPDATE-${state}`]) {
                listeners[`${storeId}-UPDATE-${state}`].forEach((cb) =>
                    cb(value)
                );
            }
            if (reducers[state]) {
                reducers[state].forEach((cb) => cb(value));
            }
        }
    };

    /**
     * Gets the current value of a specific state property from the store.
     * @param {string} state - The name of the state property to retrieve.
     * @returns {*} The current value of the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    const getState = (state) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }
        return store[state];
    };

    /**
     * Gets the current values of all state properties in the store.
     * @returns {Object} An object representing the current state of the entire store.
     */
    const getStates = () => {
        return store;
    };

    /**
     * Adds a listener for a specific state update event.
     * @param {string} name - The name of the event to listen for.
     * @param {Function} cb - The callback function to be executed when the event is triggered.
     * @throws Will throw an error if name is not a valid string or cb is not a function.
     */
    const on = (name, cb) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        if (typeof cb !== "function") {
            throw new Error("Invalid callback: must be a function.");
        }

        if (!listeners[name]) {
            listeners[name] = [];
        }
        listeners[name].push(cb);
    };

    /**
     * Removes a listener for a specific state update event.
     * @param {string} name - The name of the event to stop listening for.
     * @param {Function} [cb] - The specific callback function to remove. If not provided, all listeners for this event are removed.
     * @throws Will throw an error if name is not a valid string.
     */
    const off = (name, cb) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        if (!listeners[name]) return;

        if (cb) {
            if (typeof cb !== "function") {
                throw new Error("Invalid callback: must be a function.");
            }
            listeners[name] = listeners[name].filter(
                (listener) => listener !== cb
            );
        } else {
            delete listeners[name];
        }
    };

    /**
     * Subscribes to changes in a specific state property in the store. If the name is not in the store,
     * it initializes that state property with `undefined`.
     * @param {string} name - The name of the state property to subscribe to.
     * @returns {Object} An object containing the store ID, store, onChange function, and the current state value.
     * @throws Will throw an error if name is not a valid string.
     */
    const subscribe = (name) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        // If the state property doesn't exist in the store, initialize it with undefined.
        if (!(name in store)) {
            store[name] = undefined;
        }

        return {
            storeId,
            store,
            onChange,
            state: [name, store[name]],
            getState,
            getStates,
            on,
            off,
        };
    };

    /**
     * Reducer to listen for specific state updates in the store.
     * @param {string} state - The name of the state to listen for updates.
     * @returns {Object} An object containing methods to manage reducers, including `set` and `dispatch`.
     * @throws Will throw an error if state is not a valid string.
     */
    const reducer = (state) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }

        return {
            /**
             * Subscribes to updates of a specific state property.
             * @param {Function} cb - The callback function to be executed when the state updates.
             * @returns {Function} A function to unsubscribe the listener.
             * @throws Will throw an error if cb is not a function.
             */
            subscribe: (cb) => {
                if (typeof cb !== "function") {
                    throw new Error("Invalid callback: must be a function.");
                }

                if (!reducers[state]) {
                    reducers[state] = [];
                }
                reducers[state].push(cb);

                return () => {
                    const index = reducers[state].indexOf(cb);
                    if (index > -1) {
                        reducers[state].splice(index, 1);
                    }
                };
            },
            /**
             * Sets a custom reducer function for the specified state.
             * @param {Function} func - The reducer function that will manage the state updates.
             * @throws Will throw an error if func is not a function.
             */
            set: (func) => {
                if (typeof func !== "function") {
                    throw new Error("Invalid function: must be a function.");
                }
                stateReducers[state] = func;
            },
            /**
             * Dispatches an action to the reducer to update the state.
             * @param {Object} action - The action object containing the information to update the state.
             * @throws Will throw an error if action is not an object or if no reducer is set for handling the dispatch.
             */
            dispatch: (action) => {
                if (stateReducers[state]) {
                    const value = store[state];

                    try {
                        const newValue = stateReducers[state](value, action);
                        onChange(state, newValue);
                    } catch (error) {
                        throw new Error(
                            `Reducer function error: ${error.message}`
                        );
                    }
                } else {
                    throw new Error("No reducer for handling dispatch!");
                }
            },
        };
    };

    return {
        subscribe,
        reducer,
        getState,
        getStates,
    };
};

/**
 * Creates a store with a unique ID and default state values.
 * The store's state is persisted in localStorage.
 * @param {string} storeId - A unique identifier for the store.
 * @param {Object} defaultStore - An object representing the initial state of the store.
 * @param {Function} validator - A function to validate state changes before they are applied.
 * @returns {Object} An object containing methods to manage and subscribe to store changes.
 * @throws Will throw an error if storeId is not a valid string or defaultStore is not a non-null object.
 */
const createPersistentStore = (
    storeId = getStoreId(),
    defaultStore = {},
    validator = defaultValidator
) => {
    if (typeof storeId !== "string" || !storeId) {
        throw new Error("Invalid storeId: must be a non-empty string.");
    }

    if (typeof defaultStore !== "object" || defaultStore === null) {
        throw new Error("Invalid defaultStore: must be a non-null object.");
    }

    if (typeof validator !== "function") {
        throw new Error("Invalid validator: must be a function.");
    }

    const store = { ...defaultStore };

    // Load store from localStorage
    const storedData = localStorage.getItem(storeId);
    if (storedData) {
        try {
            Object.assign(store, JSON.parse(storedData));
        } catch (error) {
            console.error(
                "Failed to parse stored data from localStorage:",
                error
            );
        }
    }

    /**
     * Updates the store's state and triggers an event to notify subscribers of the change.
     * @param {string} state - The name of the state property to update.
     * @param {*} value - The new value for the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    const onChange = (state, value) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }

        const valid = validator(state, value);

        if (valid) {
            store[state] = value;
            localStorage.setItem(storeId, JSON.stringify(store));
            if (listeners[`${storeId}-UPDATE-${state}`]) {
                listeners[`${storeId}-UPDATE-${state}`].forEach((cb) =>
                    cb(value)
                );
            }
            if (reducers[state]) {
                reducers[state].forEach((cb) => cb(value));
            }
        }
    };

    /**
     * Gets the current value of a specific state property from the store.
     * @param {string} state - The name of the state property to retrieve.
     * @returns {*} The current value of the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    const getState = (state) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }
        return store[state];
    };

    /**
     * Gets the current values of all state properties in the store.
     * @returns {Object} An object representing the current state of the entire store.
     */
    const getStates = () => {
        return store;
    };

    /**
     * Adds a listener for a specific state update event.
     * @param {string} name - The name of the event to listen for.
     * @param {Function} cb - The callback function to be executed when the event is triggered.
     * @throws Will throw an error if name is not a valid string or cb is not a function.
     */
    const on = (name, cb) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        if (typeof cb !== "function") {
            throw new Error("Invalid callback: must be a function.");
        }

        if (!listeners[name]) {
            listeners[name] = [];
        }
        listeners[name].push(cb);
    };

    /**
     * Removes a listener for a specific state update event.
     * @param {string} name - The name of the event to stop listening for.
     * @param {Function} [cb] - The specific callback function to remove. If not provided, all listeners for this event are removed.
     * @throws Will throw an error if name is not a valid string.
     */
    const off = (name, cb) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        if (!listeners[name]) return;

        if (cb) {
            if (typeof cb !== "function") {
                throw new Error("Invalid callback: must be a function.");
            }
            listeners[name] = listeners[name].filter(
                (listener) => listener !== cb
            );
        } else {
            delete listeners[name];
        }
    };

    /**
     * Subscribes to changes in a specific state property in the store. If the name is not in the store,
     * it initializes that state property with `undefined`.
     * @param {string} name - The name of the state property to subscribe to.
     * @returns {Object} An object containing the store ID, store, onChange function, and the current state value.
     * @throws Will throw an error if name is not a valid string.
     */
    const subscribe = (name) => {
        if (typeof name !== "string" || !name) {
            throw new Error("Invalid name: must be a non-empty string.");
        }

        // If the state property doesn't exist in the store, initialize it with undefined.
        if (!(name in store)) {
            store[name] = undefined;
        }

        return {
            storeId,
            store,
            onChange,
            state: [name, store[name]],
            getState,
            getStates,
            on,
            off,
        };
    };

    /**
     * Reducer to listen for specific state updates in the store.
     * @param {string} state - The name of the state to listen for updates.
     * @returns {Object} An object containing methods to manage reducers, including `set` and `dispatch`.
     * @throws Will throw an error if state is not a valid string.
     */
    const reducer = (state) => {
        if (typeof state !== "string" || !state) {
            throw new Error("Invalid state: must be a non-empty string.");
        }

        return {
            /**
             * Subscribes to updates of a specific state property.
             * @param {Function} cb - The callback function to be executed when the state updates.
             * @returns {Function} A function to unsubscribe the listener.
             * @throws Will throw an error if cb is not a function.
             */
            subscribe: (cb) => {
                if (typeof cb !== "function") {
                    throw new Error("Invalid callback: must be a function.");
                }

                if (!reducers[state]) {
                    reducers[state] = [];
                }
                reducers[state].push(cb);

                return () => {
                    const index = reducers[state].indexOf(cb);
                    if (index > -1) {
                        reducers[state].splice(index, 1);
                    }
                };
            },
            /**
             * Sets a custom reducer function for the specified state.
             * @param {Function} func - The reducer function that will manage the state updates.
             * @throws Will throw an error if func is not a function.
             */
            set: (func) => {
                if (typeof func !== "function") {
                    throw new Error("Invalid function: must be a function.");
                }
                stateReducers[state] = func;
            },
            /**
             * Dispatches an action to the reducer to update the state.
             * @param {Object} action - The action object containing the information to update the state.
             * @throws Will throw an error if action is not an object or if no reducer is set for handling the dispatch.
             */
            dispatch: (action) => {
                if (stateReducers[state]) {
                    const value = store[state];

                    try {
                        const newValue = stateReducers[state](value, action);
                        onChange(state, newValue);
                    } catch (error) {
                        throw new Error(
                            `Reducer function error: ${error.message}`
                        );
                    }
                } else {
                    throw new Error("No reducer for handling dispatch!");
                }
            },
        };
    };

    return {
        subscribe,
        reducer,
        getState,
        getStates,
    };
};

/**
 * Custom React hook to manage the state of a store and subscribe to updates.
 * @param {Object} eoion - An object returned from the createStore function containing the store and subscription information.
 * @param {*} initialValue - An optional initial value to override the store's default value.
 * @returns {Array} An array containing the current state and a function to update it.
 * @throws Will throw an error if eoion is invalid or eoion.state is not an array.
 */
const useStore = (eoion, initialValue) => {
    if (!eoion || typeof eoion !== "object" || !Array.isArray(eoion?.state)) {
        throw new Error(
            "Invalid eoion: must be an object with a valid state array."
        );
    }

    const [state, setState] = useState(() => {
        const [name, defaultValue] = eoion.state;
        return initialValue !== undefined ? initialValue : defaultValue;
    });

    useEffect(() => {
        const [name, defaultValue] = eoion.state;

        if (initialValue !== undefined) {
            eoion.onChange(name, initialValue);
        }

        const handleStateChange = (newValue) => {
            setState(newValue);
        };

        eoion.on(`${eoion.storeId}-UPDATE-${name}`, handleStateChange);

        return () => {
            eoion.off(`${eoion.storeId}-UPDATE-${name}`, handleStateChange);
        };
    }, []);

    useEffect(() => {
        const [name] = eoion.state;

        eoion.onChange(name, state);
    }, [state]);

    return [state, setState];
};

export { createStore, createPersistentStore, useStore };
