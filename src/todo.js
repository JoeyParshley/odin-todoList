import { Storage } from "./storage";
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

/**
 * Displays the details of a todo item in the UI.
 *
 * @param {Object}          todo             The todo item to display.
 * @param {string}          todo.title       The title of the todo item.
 * @param {string}          todo.description The description of the todo item.
 * @param {string}          todo.dueDate     The due date of the todo item.
 * @param {string}          todo.priority    The priority of the todo item.
 * @param {string}          todo.notes       Additional notes for the todo item.
 * @param {Array<string>}   todo.tags        Tags associated with the todo item.
 * @param {string}          projectName      The name of the project the todo item belongs to.
 */
export function showTodoDetails(todo, projectName) {
    const todoDetails = document.querySelector("#todo-details");
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    const todoNameH3 = document.querySelector("#detail-name");
    const todoDescriptionP = document.querySelector("#detail-description");
    const todoDueDateP = document.querySelector("#detail-dueDate");
    const todoPriorityP = document.querySelector("#detail-priority");
    const todoNotesP = document.querySelector("#detail-notes");
    const todoTagsWrapper = document.querySelector("#detail-tags");
    debugger;

    /**
     * TODO: when there is more than todo associated with the tag the `todo` is undefined in for the first todo in the todo-list
     *
     * Need a way to handle, multiple projects/todos when checking the filtered links so can display all project/todo titles associated with the tag
     */
    breadcrumbsElement.textContent = `My Projects > ${projectName}`;
    todoNameH3.textContent = "";
    todoNameH3.textContent = todo.title;
    todoDescriptionP.textContent = "";
    todoDescriptionP.textContent = todo.description;
    todoDueDateP.textContent = "";
    todoDueDateP.textContent = todo.dueDate;
    todoPriorityP.textContent = "";
    todoPriorityP.textContent = todo.priority;
    todoNotesP.textContent = "";
    todoNotesP.textContent = todo.notes;
    todoTagsWrapper.innerHTML = "";
    todo.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.classList.add("tag");
        span.textContent = `#${tag}`;
        todoTagsWrapper.appendChild(span);
    });
    todoDetails.classList.remove("inactive");
}

/**
 * Handles the click event on a todo item link, updates the active state,
 * retrieves the corresponding todo and project details, and displays them.
 *
 * @param {Event} e - The event object from the click event.
 */
export function buildTodoDetailsDom(e) {
    const target = e.target;
    e.preventDefault();
    if (target.tagName === "A") {
        const todoId = target.getAttribute("data-todo-id");
        const projectId = target.getAttribute("data-project-id");
        document.querySelectorAll(".todo-list li a").forEach((a) => {
            a.classList.remove("active");
        });
        target.classList.add("active");
        const currentProject = Storage.getProjectById(projectId);
        const currentTodo = currentProject.todos.find((todo) => {
            return todo.id === parseInt(todoId, 10);
        });
        showTodoDetails(currentTodo, currentProject.projectName);
    }
}

/**
 * Builds a list of todo items for a given project and appends them to the DOM.
 *
 * @param {Object} project - The project object containing todos.
 * @param {Array} project.todos - The array of todo items.
 * @param {string} project.id - The unique identifier for the project.
 *
 * Each todo item in the project.todos array should have the following structure:
 * @param {Object} project.todos[].id - The unique identifier for the todo item.
 * @param {string} project.todos[].title - The title of the todo item.
 */
export function buildTodoList(project) {
    // debugger;
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    todoList.innerHTML = "";
    project.todos.forEach((todo) => {
        const todoListItem = document.createElement("li");
        const todoListItemLink = document.createElement("a");
        const todoCheckbox = document.createElement("div");
        todoCheckbox.classList.add("checkbox");
        todoListItemLink.href = "#";
        todoListItemLink.classList.add("todo-title");
        todoListItemLink.setAttribute("data-todo-id", todo.id);
        todoListItemLink.setAttribute("data-project-id", project.id);
        todoListItemLink.textContent = todo.title;
        todoList.addEventListener("click", buildTodoDetailsDom);
        todoListItem.classList.add("todo-item");
        todoListItem.appendChild(todoCheckbox);
        todoListItem.appendChild(todoListItemLink);
        todoList.appendChild(todoListItem);
    });
}
