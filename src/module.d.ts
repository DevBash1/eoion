// Define the type for the methods in defaultMethods
type DefaultMethods = {
    [key: string]: (...args: any[]) => any;
};

type SpreadKeys<T> = {
    [K in keyof T]: T[K];
};

/**
 * Creates a store with a unique ID and default state values.
 * @param defaultStore - An object representing the initial state of the store.
 * @param defaultMethods - An object containing methods to manage state changes.
 * @param validator - A function to validate state changes before they are applied.
 * @returns An object containing methods to manage and subscribe to store changes.
 * @throws Will throw an error if defaultStore is not a non-null object, defaultMethods is not an object, or validator is not a function.
 */
declare function createStore<T extends Record<string, any>>(
    defaultStore: T,
    defaultMethods?: DefaultMethods,
    validator?: (stateName: keyof T, stateValue: any) => boolean
): {
    /**
     * Gets the current value of a specific state property from the store.
     * @param state - The name of the state property to retrieve.
     * @returns The current value of the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    getState<K extends keyof T>(state: K): T[K];

    /**
     * Gets the current values of all state properties in the store.
     * @returns An object representing the current state of the entire store.
     */
    getStates(): T;

    /**
     * Subscribes to changes in a specific state property in the store.
     * @param name - The name of the state property to subscribe to.
     * @returns An object containing the store ID, store, onChange function, and the current state value.
     * @throws Will throw an error if name is not a valid string.
     */
    subscribe(name: keyof T): {
        storeId: string;
        store: T;
        onChange: (state: keyof T, value: T[keyof T]) => void;
        state: [keyof T, T[keyof T]];
        getState: <K extends keyof T>(state: K) => T[K];
        getStates: () => T;
        on: (name: string, cb: (value: T[keyof T]) => void) => void;
        off: (name: string, cb?: (value: T[keyof T]) => void) => void;
    };

    /**
     * Reducer to listen for specific state updates in the store.
     * @param state - The name of the state to listen for updates.
     * @returns An object containing methods to manage reducers, including `set` and `dispatch`.
     * @throws Will throw an error if state is not a valid string.
     */
    reducer(state: keyof T): {
        /**
         * Subscribes to updates of a specific state property.
         * @param cb - The callback function to be executed when the state updates.
         * @returns A function to unsubscribe the listener.
         * @throws Will throw an error if cb is not a function.
         */
        subscribe(cb: (value: T[keyof T]) => void): () => void;

        /**
         * Sets a custom reducer function for the specified state.
         * @param func - The reducer function that will manage the state updates.
         * @throws Will throw an error if func is not a function.
         */
        set(func: (state: T[keyof T], action: any) => T[keyof T]): void;

        /**
         * Dispatches an action to the reducer to update the state.
         * @param action - The action object containing the information to update the state.
         * @throws Will throw an error if action is not an object or if no reducer is set for handling the dispatch.
         */
        dispatch(action: any): void;
    };
};

/**
 * Creates a store with a unique ID and default state values.
 * The store's state is persisted in localStorage.
 * @param storeId - A unique identifier for the store.
 * @param defaultStore - An object representing the initial state of the store.
 * @param defaultMethods - An object containing methods to manage state changes.
 * @param validator - A function to validate state changes before they are applied.
 * @returns An object containing methods to manage and subscribe to store changes.
 * @throws Will throw an error if storeId is not a valid string, defaultStore is not a non-null object, or validator is not a function.
 */
declare function createPersistentStore<T extends Record<string, any>>(
    storeId: string,
    defaultStore: T,
    defaultMethods?: DefaultMethods,
    validator?: (stateName: keyof T, stateValue: any) => boolean
): {
    /**
     * Gets the current value of a specific state property from the store.
     * @param state - The name of the state property to retrieve.
     * @returns The current value of the specified state property.
     * @throws Will throw an error if state is not a valid string.
     */
    getState<K extends keyof T>(state: K): T[K];

    /**
     * Gets the current values of all state properties in the store.
     * @returns An object representing the current state of the entire store.
     */
    getStates(): T;

    /**
     * Subscribes to changes in a specific state property in the store.
     * @param name - The name of the state property to subscribe to.
     * @returns An object containing the store ID, store, onChange function, and the current state value.
     * @throws Will throw an error if name is not a valid string.
     */
    subscribe(name: keyof T): {
        storeId: string;
        store: T;
        onChange: (state: keyof T, value: T[keyof T]) => void;
        state: [keyof T, T[keyof T]];
        getState: <K extends keyof T>(state: K) => T[K];
        getStates: () => T;
        on: (name: string, cb: (value: T[keyof T]) => void) => void;
        off: (name: string, cb?: (value: T[keyof T]) => void) => void;
    } & DefaultMethods;

    /**
     * Reducer to listen for specific state updates in the store.
     * @param state - The name of the state to listen for updates.
     * @returns An object containing methods to manage reducers, including `set` and `dispatch`.
     * @throws Will throw an error if state is not a valid string.
     */
    reducer(state: keyof T): {
        /**
         * Subscribes to updates of a specific state property.
         * @param cb - The callback function to be executed when the state updates.
         * @returns A function to unsubscribe the listener.
         * @throws Will throw an error if cb is not a function.
         */
        subscribe(cb: (value: T[keyof T]) => void): () => void;

        /**
         * Sets a custom reducer function for the specified state.
         * @param func - The reducer function that will manage the state updates.
         * @throws Will throw an error if func is not a function.
         */
        set(func: (state: T[keyof T], action: any) => T[keyof T]): void;

        /**
         * Dispatches an action to the reducer to update the state.
         * @param action - The action object containing the information to update the state.
         * @throws Will throw an error if action is not an object or if no reducer is set for handling the dispatch.
         */
        dispatch(action: any): void;
    };
};

/**
 * Custom React hook to manage the state of a store and subscribe to updates.
 * @param eoion - An object returned from the createStore function containing the store and subscription information.
 * @param initialValue - An optional initial value to override the store's default value.
 * @returns An array containing the current state and a function to update it.
 * @throws Will throw an error if eoion is invalid or eoion.state is not an array.
 */
declare function useStore<T>(
    eoion: {
        storeId: string;
        store: T;
        onChange: (state: keyof T, value: T[keyof T]) => void;
        state: [keyof T, T[keyof T]];
        getState: <K extends keyof T>(state: K) => T[K];
        getStates: () => T;
        on: (name: string, cb: (value: T[keyof T]) => void) => void;
        off: (name: string, cb?: (value: T[keyof T]) => void) => void;
    },
    initialValue?: T[keyof T]
): [T[keyof T], (value: T[keyof T]) => void];

/**
 * Exported utility types and functions.
 */
export { createStore, createPersistentStore, useStore };
