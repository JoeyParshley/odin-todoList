import { buildTodoDetailsDom } from "./buildTodoDetailsDom";
import { toggleCompletedStatus } from "./todo";

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
        todoListItemLink.setAttribute("title", todo.title);
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
