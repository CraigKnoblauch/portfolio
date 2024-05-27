/**
 * Responsible for managing a FIFO queue of elements.
 * "Elements" can be any type of object.
 */
export default class FifoQueue {
    constructor(maxSize) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    /**
     * Adds an element to the end of the queue.
     * @param {any} element - The element to be added.
     * @returns {any} - If the queue exceeds its maximum size, the oldest element is removed and returned.
     */
    enqueue(element) {
        this.queue.push(element);
        if (this.queue.length > this.maxSize) {
            return this.queue.shift();
        }
    }

    shift() {
        return this.queue.shift();
    }

    /**
     * FifoQueue's iterator
     */
    [Symbol.iterator]() {
        let index = -1;
        return {
            next: () => ({ value: this.queue[++index], done: index >= this.queue.length })
        };
    }

}