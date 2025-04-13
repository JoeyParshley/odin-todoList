import "./styles/style.css";
import { buildProjectList, buildTagList } from "./project.js";
import { setUpTodoFilters } from "./setUpTodoFilters.js";
import { Storage } from "./storage.js";
import projects from "./projects.js";

/**
 * @description This function seeds the local storage with the projects. It converts the projects array to a JSON string and then saves it to the local storage.
 * @example
 * seedLocalStorageWithProjects();
 * @returns {void}
 *
 */
function seedLocalStorageWithProjects() {
    const projectsJSON = JSON.stringify(projects);
    Storage.saveProjects(projectsJSON);
}

export const allProjects = (() => {
    const storedProjects = Storage.getProjects();
    // Check if the storage is empty or if it doesn't contain valid JSON.
    if (
        !storedProjects ||
        typeof storedProjects !== "string" ||
        storedProjects.trim() === ""
    ) {
        return []; // Return an empty array if no projects are found.
    } else {
        try {
            return JSON.parse(storedProjects);
        } catch (e) {
            console.error("Error parsing JSON from storage:", e);
            return []; // Return an empty array on JSON parsing failure
        }
    }
})();
// seed the local storage with the projects
// this is only when the projects array in projects.js is modified
// seedLocalStorageWithProjects();

// console.log("allProjects", allProjects);

setUpTodoFilters();
// build the project list
buildProjectList();
// build the tag list
buildTagList();
