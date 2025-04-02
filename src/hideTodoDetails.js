/**
 * Hides the todo details section by adding the "inactive" class
 * if it is not already present.
 */

export function hideTodoDetails() {
    const todoDetails = document.querySelector("#todo-details");
    if (!todoDetails.classList.contains("inactive"))
        todoDetails.classList.add("inactive");
}
