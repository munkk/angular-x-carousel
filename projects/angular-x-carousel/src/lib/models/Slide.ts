export default class Slide {
    id = null;
    item = null;
    element = null;

    constructor(id, item, element) {
        this.id = id;
        this.item = item;
        this.element = element;
    }
}