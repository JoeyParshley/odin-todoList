export class Todo {
  constructor(title, description, dueDate, priority, notes, isComplete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isComplete = false;
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
}
