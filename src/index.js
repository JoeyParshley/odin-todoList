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

export const allProjects = JSON.parse(Storage.getProjects());

// seed the local storage with the projects
// this is only when the projects array in projects.js is modified
// seedLocalStorageWithProjects();

setUpTodoFilters();
// build the project list
buildProjectList();
// build the tag list
buildTagList();
