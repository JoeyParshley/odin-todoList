import { generateId } from "./generateId.js";
import { toggleTodoCompletion } from "./toggleTodoCompletion.js";

export class Todo {
    constructor(
        title,
        description,
        dueDate,
        priority,
        notes,
        isCompleted,
        tags = []
    ) {
        this.id = generateId();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isCompleted = isCompleted;
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

    getIsCompleted() {
        return this.isCompleted;
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

    setIsCompleted(isComplete) {
        this.isCompleted = isComplete;
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
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

/**
 * Toggles the completed status of a todo item and updates the UI
 * @param {Event} e - The event object
 * @param {number} projectId - ID of the project containing the todo
 * @param {number} todoId - ID of the todo to change
 */
export function toggleCompletedStatus(e, projectId, todoId) {
    // Toggle the isCompleted property of the todo in the project and udpate allProjects and local storage.
    debugger;
    toggleTodoCompletion(projectId, todoId);

    // update the UI
    const completedClassName = "completed";
    const target = e.target;
    target.classList.contains(completedClassName)
        ? target.classList.remove(completedClassName)
        : target.classList.add(completedClassName);
}
