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
    const editButton = document.querySelector("#edit-button");

    editButton.addEventListener("click", (e) => {
        toggleEditMode(e, todo);
    });

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
     * TODO: when there is more than one todo associated with the tag the `todo` is undefined in for the first todo in the todo-list
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
};

/**
 * Toggles the edit mode for the todo details section in the UI.
 *
 * @param {Event} e - The event object triggered by the user interaction.
 * @param {Object} todo - The todo object being edited.
 * @param {string} todo.title - The title of the todo item.
 * @param {string} todo.description - The description of the todo item.
 * @param {string} todo.dueDate - The due date of the todo item.
 * @param {string} todo.priority - The priority of the todo item.
 * @param {string} todo.notes - Additional notes for the todo item.
 * @param {Array<string>} todo.tags - Tags associated with the todo item.
 *
 * @returns {void}
 *
 * @description
 * This function toggles the edit mode for the todo details section. When entering edit mode,
 * it hides the edit button, makes the fields editable, and adds "Cancel" and "Save" buttons.
 * When exiting edit mode, it restores the original state by removing the "Cancel" and "Save"
 * buttons, disabling content editing, and showing the edit button again.
 *
 * The "Cancel" button exits edit mode without saving changes, while the "Save" button
 * triggers a placeholder save logic and then exits edit mode.
 */

export const toggleEditMode = (e, todo) => {
    const todoDetails = document.querySelector("#todo-details");
    const editButton = document.querySelector("#edit-button");
    let cancelButton = document.querySelector("#cancel-button");
    let saveButton = document.querySelector("#save-button");
    const isEditing = todoDetails.classList.contains("editing");

    if (isEditing) {
        // Exit edit mode
        todoDetails.classList.remove("editing");
        editButton.classList.remove("hidden");

        // Remove cancel and save buttons
        if (cancelButton) cancelButton.remove();
        if (saveButton) saveButton.remove();

        const editableFields = todoDetails.querySelectorAll(
            "[contenteditable='true']"
        );
        editableFields.forEach((field) => {
            field.removeAttribute("contenteditable");
            // restore the original value
            const originalValue = field.getAttribute("data-original-value");
            field.textContent = originalValue;
            field.removeAttribute("data-original-value");
        });
    } else {
        // Enter edit mode
        todoDetails.classList.add("editing");
        // Hide edit button
        editButton.classList.add("hidden");

        // Create cancel button
        cancelButton = document.createElement("button");
        cancelButton.id = "cancel-button";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => toggleEditMode(e, todo));
        todoDetails.appendChild(cancelButton);

        // Create save button
        saveButton = document.createElement("button");
        saveButton.id = "save-button";
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
            // Save logic here
            console.log("Save changes");
            toggleEditMode(e, todo);
        });
        todoDetails.appendChild(saveButton);

        const fieldsToEdit = [
            "#detail-name",
            "#detail-description",
            "#detail-dueDate",
            "#detail-priority",
            "#detail-notes",
        ];

        fieldsToEdit.forEach((selector) => {
            const field = document.querySelector(selector);
            if (field) {
                // Make the field editable
                field.setAttribute("contenteditable", "true");
                // perist the original value
                // so we can restore it if the user clicks cancel
                field.setAttribute("data-original-value", field.textContent);
                // add click handler to clear the field value
                field.addEventListener("click", (e) => {
                    field.textContent = "";
                });
            }
        });
    }
};
