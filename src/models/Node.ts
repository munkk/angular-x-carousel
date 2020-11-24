export default class Node {
    value;
    prev;
    next;

    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}