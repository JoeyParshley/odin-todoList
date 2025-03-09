import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";
import { Storage } from "./storage.js";

// const projectsJSON = JSON.stringify(projects);
// Storage.saveProjects(projectsJSON);

const allProjects = JSON.parse(Storage.getProjects());

function showProjectDetails(project) {
    const projectName = document.querySelector(".project-name");
    const projectDescription = document.querySelector(".project-description");
}

function handleProjectClick(e) {
    e.preventDefault();
    const projectId = e.target.getAttribute("data-project-id");
    const project = Storage.getProjectById(projectId);
    console.log("project", project);
}

/**
 * Builds the project list in the ui
 * @returns {void}
 * @description This function loops through the projects and creates a new li element for each project. It then appends the li element to the project list.
 * @example
 * buildProjectList();
 */
function buildProjectList() {
    allProjects.forEach((project) => {
        const projectList = document.querySelector(".project-list");
        // create a new li element
        const projectListLi = document.createElement("li");
        // create a new a element
        const projectListLink = document.createElement("a");
        projectListLink.setAttribute("data-project-id", project.id);
        projectListLink.href = "#";
        projectListLink.addEventListener("click", handleProjectClick);
        projectListLink.textContent = project.projectName;
        projectListLi.appendChild(projectListLink);
        projectList.appendChild(projectListLi);
    });
}

/**
 * Gets all the tags from the projects
 * @returns {Array} allTags
 * @description This function loops through the projects and creates a new array of all the tags in the projects. It then returns the array.
 * @example
 * const allTags = getAllTagsFromProjects();
 */
function getAllTagsFromProjects() {
    const allTags = [];
    allProjects.forEach((project) => {
        project.todos.forEach((todo) => {
            todo.tags.forEach((tag) => {
                if (!allTags.includes(tag)) {
                    allTags.push(tag);
                }
            });
        });
    });
    return allTags;
}

function buildTagList() {
    const allTags = getAllTagsFromProjects();
    const tagList = document.querySelector(".tag-list");
    allTags.forEach((tag) => {
        const tagListLi = document.createElement("li");
        const tagListLink = document.createElement("a");
        tagListLink.href = "#";
        tagListLink.textContent = tag;
        tagListLi.appendChild(tagListLink);
        tagList.appendChild(tagListLi);
    });
}

// build the project list
buildProjectList();
buildTagList();
