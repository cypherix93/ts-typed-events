"use strict";
/** This is a very simple strongly typed event emitter class, see README.md for more details */
Object.defineProperty(exports, "__esModule", { value: true });
/** A typed event, given a type will emit values of that type to listeners */
class Event {
    constructor() {
        /** All the current listeners for this event */
        this.listeners = [];
    }
    /**
     * Attaches a listener to trigger on all emits for this event
     * @param callback the callback to invoke on all emits
     */
    on(callback) {
        this.listeners.push({
            once: false,
            callback,
        });
    }
    /**
     * Attaches a listener to trigger on only the first emit for this event.
     *
     * This version either takes a callback or returns a promise.
     * @param callback optional callback, if specified invokes the callback
     * only once when the event is triggered, then removes it.
     * Otherwise returns a promise that resolves with the value the next time
     * this event is triggered
     */
    once(callback) {
        if (!callback) {
            // then they want us to return the promise
            const promise = new Promise((resolve, reject) => {
                // this will invoke the version that has a callback, so resolve can be used as the callback
                this.once(resolve);
            });
            // attach the promise we just made to the listener (it was pushed on
            // the end via this.once() above)
            this.listeners[this.listeners.length - 1].promise = promise;
            return promise;
        }
        // else we were sent a normal callback, so attach it
        this.listeners.push({
            once: true,
            callback,
        });
    }
    /**
     * Removes a callback from the listeners on this event, regardless of once vs on.
     *
     * Returns true if a callback was removed, false otherwise.
     * @param callback the callback to remove
     * @returns true if a callback was removed, false otherwise
     */
    off(listener) {
        const originalLength = this.listeners.length;
        // remove all listeners that have the same callback as this one
        this.listeners = this.listeners.filter((l) => {
            return listener !== l.callback && (!l.promise || listener !== l.promise);
        });
        return this.listeners.length !== originalLength;
    }
    /**
     * Removes ALL callbacks from this event, regardless of once vs on.
     *
     * Returns the number of listeners removed.
     * @returns the number of listeners removed
     */
    offAll() {
        const originalLength = this.listeners.length;
        this.listeners.length = 0;
        return originalLength;
    }
    /**
     * Emits a value to all the listeners, triggering their callbacks.
     *
     * Returns true if the event had listeners, false otherwise.
     * @param arg the argument to emit to all listeners as their argument.
     * @returns true if the event had listeners, false otherwise
     */
    emit(arg) {
        const hadListeners = this.listeners.length > 0;
        for (const listener of this.listeners) {
            listener.callback(arg);
        }
        // remove all listeners that only wanted to listen once
        this.listeners = this.listeners.filter((l) => !l.once);
        return hadListeners;
    }
}
exports.Event = Event;
/**
 * Creates a handy interface object of event names for combining linked events.
 *
 * Returns a frozen object of events for easy grouping.
 * @param group an object of events used to group the event by name
 * @returns a frozen object of events for easy grouping
 */
exports.events = (function groupEvents(group) {
    return Object.freeze(group);
}); // any because it lacks the contact function below,
// and there is no easy way in TS to hook that up right now
/**
 * Combines two events objects into one, while creating a TS interface for type checking.
 *
 * Returns a frozen object that is the two lists combined, with B taking precedent over A for conflicts
 * @param eventsA the first object of events to combine with B
 * @param eventsB the second object of events to combine with A
 * @returns a frozen object that is the two lists combined, with B taking precedent over A for conflicts
 */
exports.events.concat = (eventsA, eventsB) => {
    return Object.freeze(Object.assign({}, eventsA, eventsB));
};
/** old style exports for those using them */
module.exports = { Event, events: exports.events };
//# sourceMappingURL=event.js.map