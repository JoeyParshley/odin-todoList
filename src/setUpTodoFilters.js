import { showFilteredTodosList } from "./showFilteredTodosList";

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
