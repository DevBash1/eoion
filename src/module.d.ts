// index.d.ts

declare module "eoion" {
    // Type definitions for the state
    type State = Record<string, any>;

    // Type definitions for the validator function
    type ValidatorFunction = (stateKey: string, value: any) => boolean;

    // Type definitions for the reducer function
    type ReducerFunction<S = any, A = any> = (state: S, action: A) => S;

    // Type for the unsubscribe function
    type UnsubscribeFunction = () => void;

    // Type for the listener function used in subscription
    type ListenerFunction<T> = (state: T) => void;

    // Type for the subscribe function
    interface SubscribeFunction<T> {
        (listener: ListenerFunction<T>): UnsubscribeFunction;
    }

    // Type definitions for the reducer
    interface Reducer<S = any> {
        set(reducer: ReducerFunction<S>): void;
        dispatch<A = any>(action: A): void;
        subscribe(listener: ListenerFunction<S>): UnsubscribeFunction;
    }

    // Type definitions for the store object
    interface Store<S = State> {
        getState<T = any>(stateKey: keyof S): T;
        setState<T = any>(stateKey: keyof S, value: T): void;
        subscribe<T = any>(
            stateKey: keyof S,
            listener: ListenerFunction<T>
        ): UnsubscribeFunction;
        reducer<T = any>(stateKey: keyof S): Reducer<T>;
    }

    // Function to create a store
    export function createStore<S = State>(
        initialState: S,
        validator?: ValidatorFunction
    ): Store<S>;

    // Function to create a persistent store
    export function createPersistentStore<S = State>(
        storeName: string,
        initialState: S,
        validator?: ValidatorFunction
    ): Store<S>;

    // React hook to use a store
    export function useStore<T>(
        subscribeFunction: (
            listener: ListenerFunction<T>
        ) => UnsubscribeFunction
    ): [T, (value: T) => void];
}
