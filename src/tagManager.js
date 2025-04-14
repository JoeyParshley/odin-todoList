import { Tag } from "./tag.js";

export class TagManager {
    constructor() {
        this.tags = new Set();
    }

    createTag(name) {
        const tag = new Tag(name);
        this.tags.add(tag);
        this.saveTags();
        return tag;
    }

    addTag(tag) {
        this.tags.add(tag);
        this.saveTags();
    }

    getTags() {
        return Array.from(this.tags);
    }

    saveTags() {
        const tagsArray = this.getTags();
        const tagsToSave = tagsArray.map((tag) => ({
            id: tag.id,
            name: tag.name,
        }));
        localStorage.setItem("tags", JSON.stringify(tagsToSave));
    }
}

export const tagManager = new TagManager();
