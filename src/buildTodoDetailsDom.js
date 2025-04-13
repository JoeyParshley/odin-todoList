import { showTodoDetails } from "./showTodoDetails";

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
            return todo.id === todoId;
        });
        showTodoDetails(currentTodo, project);
    }
}
