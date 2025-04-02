import { toggleCompletedStatus } from "./todo";

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

export const setFieldContent = (element, todo, todoKey) => {
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
