import { allProjects } from "./index.js";
import { tagManager } from "./tagManager.js";
import { addDays, isAfter, isSameDay, endOfDay } from "date-fns";
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
export function showTodoDetails(todo, project) {
    const todoDetails = document.querySelector("#todo-details");
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    const todoNameH3 = document.querySelector("#detail-name");
    const todoDescriptionP = document.querySelector("#detail-description");
    const todoDueDateP = document.querySelector("#detail-dueDate");
    const todoPriorityP = document.querySelector("#detail-priority");
    const todoNotesP = document.querySelector("#detail-notes");
    const todoTagsWrapper = document.querySelector("#detail-tags");
    const todoCheckbox = document.querySelector(".details.checkbox");

    todoCheckbox.addEventListener("click", (e) =>
        toggleCompletedStatus(e, project.id, todo.id)
    );
    if (todo.isCompleted) {
        if (!todoCheckbox.classList.contains("completed"))
            todoCheckbox.classList.add("completed");
    } else {
        if (todoCheckbox.classList.contains("completed"))
            todoCheckbox.classList.remove("completed");
    }

    /**
     * TODO: when there is more than todo associated with the tag the `todo` is undefined in for the first todo in the todo-list
     *
     * Need a way to handle, multiple projects/todos when checking the filtered links so can display all project/todo titles associated with the tag
     */
    breadcrumbsElement.textContent = `My Projects > ${project.projectName}`;

    setFieldContent(todoNameH3, todo, "title");
    setFieldContent(todoDescriptionP, todo, "description");
    setFieldContent(todoDueDateP, todo, "dueDate");
    setFieldContent(todoPriorityP, todo, "priority");
    setFieldContent(todoNotesP, todo, "notes");

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
 * Sets the content of a specified element based on a todo object's property and makes it editable on click.
 *
 * @param {HTMLElement} element - The DOM element whose content is to be set.
 * @param {Object} todo - The todo object containing the data.
 * @param {string} todoKey - The key of the todo object whose value is to be set as the element's content.
 */
const setFieldContent = (element, todo, todoKey) => {
    element.textContent = "";
    element.textContent = todo[todoKey];
    console.log(todo[todoKey]);

    element.addEventListener("click", (e) => {
        e.target.setAttribute("contenteditable", "true");
    });
    element.addEventListener("blur", (e) => {
        e.target.removeAttribute("contenteditable");
        console.log(`todo[${todoKey}] = ${todo[todoKey]}`);
    });
};

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
        showTodoDetails(currentTodo, project);
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
    project.todos.map((todo) => {
        const todoListItem = document.createElement("li");
        const todoListItemLink = document.createElement("a");
        const todoCheckbox = document.createElement("div");
        todoCheckbox.classList.add("checkbox");
        todoCheckbox.addEventListener("click", (e) =>
            toggleCompletedStatus(e, project.id, todo.id)
        );
        if (todo.isCompleted) {
            if (!todoCheckbox.classList.contains("completed"))
                todoCheckbox.classList.add("completed");
        } else {
            if (todoCheckbox.classList.contains("completed"))
                todoCheckbox.classList.remove("completed");
        }
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
            todoCheckbox.addEventListener("click", (e) =>
                toggleCompletedStatus(e, project.id, todo.id)
            );
            if (todo.isCompleted) {
                if (!todoCheckbox.classList.contains("completed"))
                    todoCheckbox.classList.add("completed");
            } else {
                if (todoCheckbox.classList.contains("completed"))
                    todoCheckbox.classList.remove("completed");
            }
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
                todoCheckbox.addEventListener("click", (e) =>
                    toggleCompletedStatus(e, project.id, todo.id)
                );
                if (todo.isCompleted) {
                    if (!todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.add("completed");
                } else {
                    if (todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.remove("completed");
                }
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
            if (todo.isCompleted) {
                const todoListItem = document.createElement("li");
                const todoListItemLink = document.createElement("a");
                const todoCheckbox = document.createElement("div");
                todoCheckbox.classList.add("checkbox");
                todoCheckbox.addEventListener("click", (e) =>
                    toggleCompletedStatus(e, project.id, todo.id)
                );
                if (todo.isCompleted) {
                    if (!todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.add("completed");
                } else {
                    if (todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.remove("completed");
                }
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

/**
 * Builds a list of todos due within the next 7 days and updates the DOM.
 *
 * This function clears the current todo list and sets the project title to "Next 7 Days todos".
 * It iterates through all projects and their todos, checking if the todo's due date is within the next 7 days.
 * If a todo is due within this period, it creates a list item for the todo and appends it to the todo list in the DOM.
 *
 * Dependencies:
 * - hideTodoDetails: Function to hide the details of the current todo.
 * - endOfDay: Function to get the end of the day for a given date.
 * - addDays: Function to add a specified number of days to a date.
 * - isAfter: Function to check if one date is after another.
 * - buildTodoDetailsDom: Function to build the DOM for the todo details.
 *
 * @function
 */
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
                todoCheckbox.addEventListener("click", (e) =>
                    toggleCompletedStatus(e, project.id, todo.id)
                );
                if (todo.isCompleted) {
                    if (!todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.add("completed");
                } else {
                    if (todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.remove("completed");
                }
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

/**
 * Builds and displays the list of todos due today.
 *
 * This function clears the current todo list and sets the project title to "My Day todos".
 * It iterates through all projects and their todos, checking if the todo's due date is today.
 * If a todo is due today, it creates a list item for the todo and appends it to the todo list.
 *
 * @function
 */
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
                todoCheckbox.addEventListener("click", (e) =>
                    toggleCompletedStatus(e, project.id, todo.id)
                );
                if (todo.isCompleted) {
                    if (!todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.add("completed");
                } else {
                    if (todoCheckbox.classList.contains("completed"))
                        todoCheckbox.classList.remove("completed");
                }
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

/**
 * Sets up event listeners for the todo filters.
 * Adds a click event listener to the element with the ID "todo-filter-list"
 * that triggers the showFilteredTodosList function.
 */
export function setUpTodoFilters() {
    document
        .querySelector("#todo-filter-list")
        .addEventListener("click", showFilteredTodosList());
}

/**
 * Returns an event handler function that filters and displays a list of todos based on the clicked link.
 * The event handler prevents the default action, updates the active link, and calls the appropriate function
 * to build the filtered todos list.
 *
 * @returns {Function} An event handler function for filtering and displaying todos.
 */
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

/**
 * Hides the todo details section by adding the "inactive" class
 * if it is not already present.
 */
export function hideTodoDetails() {
    const todoDetails = document.querySelector("#todo-details");
    if (!todoDetails.classList.contains("inactive"))
        todoDetails.classList.add("inactive");
}

/**
 * Toggles the completed status of a todo item and updates the UI
 * @param {Event} e - The event object
 * @param {number} projectId - ID of the project containing the todo
 * @param {number} todoId - ID of the todo to change
 */
function toggleCompletedStatus(e, projectId, todoId) {
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
