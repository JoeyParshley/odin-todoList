import "./styles/style.css";
import { buildProjectList, buildTagList } from "./project.js";
import { setUpTodoFilters } from "./setUpTodoFilters.js";
import { Storage } from "./storage.js";

export const allTags = () => {
    const storedTags = Storage.getTags();
    // Check if the storage is empty or if it doesn't contain valid JSON.
    if (
        !storedTags ||
        typeof storedTags !== "string" ||
        storedTags.trim() === ""
    ) {
        return []; // Return an empty array if no tags are found.
    } else {
        try {
            return JSON.parse(storedTags);
        } catch (e) {
            console.error("Error parsing storedTags JSON from storage:", e);
            return []; // Return an empty array on JSON parsing failure
        }
    }
};

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
            console.error("Error parsing storedProjects JSON from storage:", e);
            return []; // Return an empty array on JSON parsing failure
        }
    }
})();

// console.log("allProjects", allProjects);

setUpTodoFilters();
// build the project list
buildProjectList();
// build the tag list
buildTagList();
