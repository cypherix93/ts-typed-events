/** The basic interface for combined events */
export interface IEvents {
    /** lookup event by name */
    [eventName: string]: Event<any>;
}
/** A typed event, given a type will emit values of that type to listeners */
export declare class Event<T extends any = undefined> {
    /** All the current listeners for this event */
    private listeners;
    /**
     * Attaches a listener to trigger on all emits for this event
     * @param callback the callback to invoke on all emits
     */
    on(callback: (data: T) => any): void;
    /**
     * Attaches a listener to trigger on only the first emit for this event.
     * After that event is emitted this callback will automatically be removed.
     * @param callback the callback to invoke only the next time this event
     * emits, then that callback is removed from this event
     */
    once(callback: (arg: T) => any): void;
    /**
     * Attaches a listener to trigger on only the first emit for this event.
     *
     * Returns a promise that resolves with the arg the next time this event
     * is triggered (only once).
     * @returns a promise that resolves with the arg the next time this event
     * is triggered (only once)
     */
    once(): Promise<T>;
    /**
     * Removes a callback from the listeners on this event, regardless of once vs on.
     *
     * Returns true if a callback was removed, false otherwise.
     * @param callback the callback to remove
     * @returns true if a callback was removed, false otherwise
     */
    off(listener: ((arg: T) => any) | Promise<T>): boolean;
    /**
     * Removes ALL callbacks from this event, regardless of once vs on.
     *
     * Returns the number of listeners removed.
     * @returns the number of listeners removed
     */
    offAll(): number;
    /**
     * Emits a value to all the listeners, triggering their callbacks.
     *
     * Returns true if the event had listeners, false otherwise.
     * @param arg the argument to emit to all listeners as their argument.
     * @returns true if the event had listeners, false otherwise
     */
    emit(arg: T): boolean;
}
/** A utility function that creates a grouping of events and can manipulate those events */
export interface IEventsFunction {
    /**
     * Creates a handy interface object of event names for combining linked events.
     *
     * Returns  a the group object now frozen for easy TS lookups.
     * @param group an object of events used to group the event by name
     * @returns a the group object now frozen for easy TS lookups
     */
    <T>(group: T): Readonly<T & IEvents>;
    /**
     * Combines two events objects into one, while creating a TS interface for type checking.
     *
     * Returns a new frozen object that is the two lists combined, with B taking precedent over A for conflicts.
     * @param eventsA the first object of events to combine with B
     * @param eventsB the second object of events to combine with A
     * @returns a new frozen object that is the two lists combined, with B taking precedent over A for conflicts
     */
    concat: <T extends IEvents, S extends IEvents>(eventsA: T, eventsB: S) => Readonly<T & S>;
}
/**
 * Creates a handy interface object of event names for combining linked events.
 *
 * Returns a frozen object of events for easy grouping.
 * @param group an object of events used to group the event by name
 * @returns a frozen object of events for easy grouping
 */
export declare const events: IEventsFunction;
