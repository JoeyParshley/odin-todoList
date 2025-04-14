import { generateId } from "./generateId";

export class Tag {
    constructor(name) {
        this.id = generateId();
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}
