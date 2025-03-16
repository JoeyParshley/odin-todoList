import { ta } from "date-fns/locale";
import { allProjects } from "./index.js";
import { Storage } from "./storage";
import { tagManager } from "./tagManager.js";
import { addDays, compareAsc, isAfter, isSameDay, endOfDay } from "date-fns";

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
export function buildTodoDetailsDom(e, project) {
    const target = e.target;
    e.preventDefault();
    if (target.tagName === "A") {
        const todoId = target.getAttribute("data-todo-id");
        document.querySelectorAll(".todo-list li a").forEach((a) => {
            a.classList.remove("active");
        });
        target.classList.add("active");
        const currentTodo = project.todos.find((todo) => {
            return todo.id === parseInt(todoId, 10);
        });
        showTodoDetails(currentTodo, project.projectName);
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
        todoListItemLink.addEventListener("click", (e) =>
            buildTodoDetailsDom(e, project)
        );
        todoListItem.classList.add("todo-item");
        todoListItem.appendChild(todoCheckbox);
        todoListItem.appendChild(todoListItemLink);
        todoList.appendChild(todoListItem);
    });
}

/**
 * Builds and displays a list of all todos from all projects.
 *
 * This function selects the project title element and the todo list wrapper element from the DOM,
 * clears their current content, and sets the project title to "All my todos". It then iterates
 * over all projects and their respective todos, creating and appending list items for each todo
 * to the todo list wrapper. Each todo list item includes a checkbox and a link with event listeners
 * to display the todo details when clicked.
 */
const buildAllTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "All my todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const todoListItem = document.createElement("li");
            const todoListItemLink = document.createElement("a");
            const todoCheckbox = document.createElement("div");
            todoCheckbox.classList.add("checkbox");
            todoListItemLink.href = "#";
            todoListItemLink.classList.add("todo-title");
            todoListItemLink.setAttribute("data-todo-id", todo.id);
            todoListItemLink.setAttribute("data-project-id", project.id);
            todoListItemLink.textContent = todo.title;
            todoListItemLink.addEventListener("click", (e) =>
                buildTodoDetailsDom(e, project)
            );
            todoListItem.classList.add("todo-item");
            todoListItem.appendChild(todoCheckbox);
            todoListItem.appendChild(todoListItemLink);
            todoList.appendChild(todoListItem);
        });
    });
};

/**
 * Builds and displays a list of todos that are past their due date.
 *
 * This function selects the project title element and the todo list wrapper element from the DOM,
 * clears their current content, and sets the project title to "Late todos". It then iterates
 * over all projects and their respective todos, checking if the due date of each todo is before
 * the current date. If a todo is late, it creates and appends a list item for the todo to the
 * todo list wrapper. Each todo list item includes a checkbox and a link with event listeners
 * to display the todo details when clicked.
 */
const buildLateTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Late todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const dueDate = todo.dueDate;
            const dueDateParts = dueDate.split("-");
            const dueDateYear = dueDateParts[0];
            const dueDateMonth = dueDateParts[1] - 1;
            const dueDateDay = dueDateParts[2];
            const todoDueDate = endOfDay(
                new Date(dueDateYear, dueDateMonth, dueDateDay)
            );
            const today = endOfDay(new Date());
            if (isAfter(today, todoDueDate)) {
                const todoListItem = document.createElement("li");
                const todoListItemLink = document.createElement("a");
                const todoCheckbox = document.createElement("div");
                todoCheckbox.classList.add("checkbox");
                todoListItemLink.href = "#";
                todoListItemLink.classList.add("todo-title");
                todoListItemLink.setAttribute("data-todo-id", todo.id);
                todoListItemLink.setAttribute("data-project-id", project.id);
                todoListItemLink.textContent = todo.title;
                todoListItemLink.addEventListener("click", (e) =>
                    buildTodoDetailsDom(e, project)
                );
                todoListItem.classList.add("todo-item");
                todoListItem.appendChild(todoCheckbox);
                todoListItem.appendChild(todoListItemLink);
                todoList.appendChild(todoListItem);
            }
        });
    });
};

const buildCompletedTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Completed";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const todoListItem = document.createElement("li");
            const todoListItemLink = document.createElement("a");
            const todoCheckbox = document.createElement("div");
            todoCheckbox.classList.add("checkbox");
            todoListItemLink.href = "#";
            todoListItemLink.classList.add("todo-title");
            todoListItemLink.setAttribute("data-todo-id", todo.id);
            todoListItemLink.setAttribute("data-project-id", project.id);
            todoListItemLink.textContent = todo.title;
            todoListItemLink.addEventListener("click", (e) =>
                buildTodoDetailsDom(e, project)
            );
            todoListItem.classList.add("todo-item");
            todoListItem.appendChild(todoCheckbox);
            todoListItem.appendChild(todoListItemLink);
            todoList.appendChild(todoListItem);
        });
    });
};

const buildNextSevenDaysTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Next 7 Days todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const dueDate = todo.dueDate;
            const dueDateParts = dueDate.split("-");
            const dueDateYear = dueDateParts[0];
            const dueDateMonth = dueDateParts[1] - 1;
            const dueDateDay = dueDateParts[2];
            const todoDueDate = endOfDay(
                new Date(dueDateYear, dueDateMonth, dueDateDay)
            );
            const today = endOfDay(new Date());
            const sevenDaysLater = addDays(today, 7);
            if (
                isAfter(todoDueDate, today) &&
                isAfter(sevenDaysLater, todoDueDate)
            ) {
                const todoListItem = document.createElement("li");
                const todoListItemLink = document.createElement("a");
                const todoCheckbox = document.createElement("div");
                todoCheckbox.classList.add("checkbox");
                todoListItemLink.href = "#";
                todoListItemLink.classList.add("todo-title");
                todoListItemLink.setAttribute("data-todo-id", todo.id);
                todoListItemLink.setAttribute("data-project-id", project.id);
                todoListItemLink.textContent = todo.title;
                todoListItemLink.addEventListener("click", (e) =>
                    buildTodoDetailsDom(e, project)
                );
                todoListItem.classList.add("todo-item");
                todoListItem.appendChild(todoCheckbox);
                todoListItem.appendChild(todoListItemLink);
                todoList.appendChild(todoListItem);
            }
        });
    });
};

const buildMyDayTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "My Day todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const dueDate = todo.dueDate;
            const dueDateParts = dueDate.split("-");
            const dueDateYear = dueDateParts[0];
            const dueDateMonth = dueDateParts[1] - 1;
            const dueDateDay = dueDateParts[2];
            const todoDueDate = endOfDay(
                new Date(dueDateYear, dueDateMonth, dueDateDay)
            );
            const today = endOfDay(new Date());
            if (isSameDay(todoDueDate, today)) {
                const todoListItem = document.createElement("li");
                const todoListItemLink = document.createElement("a");
                const todoCheckbox = document.createElement("div");
                todoCheckbox.classList.add("checkbox");
                todoListItemLink.href = "#";
                todoListItemLink.classList.add("todo-title");
                todoListItemLink.setAttribute("data-todo-id", todo.id);
                todoListItemLink.setAttribute("data-project-id", project.id);
                todoListItemLink.textContent = todo.title;
                todoListItemLink.addEventListener("click", (e) =>
                    buildTodoDetailsDom(e, project)
                );
                todoListItem.classList.add("todo-item");
                todoListItem.appendChild(todoCheckbox);
                todoListItem.appendChild(todoListItemLink);
                todoList.appendChild(todoListItem);
            }
        });
    });
};

export function setUpTodoFilters() {
    document
        .querySelector("#todo-filter-list")
        .addEventListener("click", showFilteredTodosList());
}

function showFilteredTodosList() {
    return (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.tagName === "A") {
            document.querySelectorAll("a.active").forEach((a) => {
                a.classList.remove("active");
            });
            target.classList.add("active");
        }
        console.log(target.id);
        switch (target.id) {
            case "myDay":
                buildMyDayTodosList();
                break;

            case "nextDays":
                buildNextSevenDaysTodosList();
                break;

            case "allTodos":
                buildAllTodosList();
                break;

            case "lateTodos":
                buildLateTodosList();
                break;

            case "completedTodos":
                buildCompletedTodosList();
                break;
            default:
                break;
        }
    };
}
export function hideTodoDetails() {
    const todoDetails = document.querySelector("#todo-details");
    if (!todoDetails.classList.contains("inactive"))
        todoDetails.classList.add("inactive");
}
