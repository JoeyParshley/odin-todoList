import { allProjects } from ".";
import { Storage } from "./storage";

/**
 * Toggles the isCompleted property of a todo in a project, updates allProjects with that change, and updates local storage.
 * @param {number} projectId - The ID of the project containing the todo.
 * @param {number} todoId - The ID of the todo to toggle.
 */
function toggleTodoCompletion(projectId, todoId) {
    // Find the project that contains the todo
    const project = allProjects.find((project) => project.id === projectId);

    // handle the project with ID not existing
    if (!project) {
        console.error(`Project with ID ${projectId} not found.`);
        return;
    }

    // find the todo within the project
    const todo = project.todos.find((todo) => todo.id === todoId);
    // handle the todo with ID not existing
    if (!todo) {
        console.error(
            `Tod with ID ${todoId} not found in project ${projectId}.`
        );
        return;
    }

    // Toggle the isCompleted property of the todo
    todo.isCompleted = !todo.isCompleted;

    // Update allProjects with the modified project
    const projectIndex = allProjects.find(
        (project) => project.id === projectId
    );
    allProjects[projectIndex] = project;

    // save the updated allProjects to local storage
    Storage.saveProjects(JSON.stringify(allProjects));

    // log the success
    console.log(
        `Todo with ID ${todoId} in project ${projectId} has been updated.`
    );
}

export { toggleTodoCompletion };
