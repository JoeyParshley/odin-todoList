import { tagManager } from "./tagManager.js";

export class Todo {
  constructor(title, description, dueDate, priority, notes, tags = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isComplete = false;
    this.tags = [];
    this.checklist = [];
    tags.forEach((tag) => this.addTag(tag));
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getDueDate() {
    return this.dueDate;
  }

  getPriority() {
    return this.priority;
  }

  getNotes() {
    return this.notes;
  }

  getIsComplete() {
    return this.isComplete;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setNotes(notes) {
    this.notes = notes;
  }

  setIsComplete(isComplete) {
    this.isComplete = isComplete;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      tagManager.addTag(tag);
    }
  }

  addCheckListItem(item) {
    this.checklist.push({ item, completed: false });
  }

  toggleChecklistItem(index) {
    if (this.checklist[index]) {
      this.checklist[index].completed = !this.checklist[index].completed;
    }
  }

  save() {
    localStorage.setItem(this.title, JSON.stringify(this));
  }
}
