export class TagManager {
  constructor() {
    this.tags = new Set();
  }

  addTag(tag) {
    this.tags.add(tag);
  }

  getTags() {
    return Array.from(this.tags);
  }
}

export const tagManager = new TagManager();
