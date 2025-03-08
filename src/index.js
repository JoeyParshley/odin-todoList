import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";
import { Storage } from "./storage.js";

// const projectsJSON = JSON.stringify(projects);
// Storage.saveProjects(projectsJSON);

const allProjects = JSON.parse(Storage.getProjects());

// populate project list in the ui
allProjects.forEach((project) => {
    const projectList = document.querySelector(".project-list");
    // create a new li element
    const projectListLi = document.createElement("li");
    // create a new a element
    const projectListLink = document.createElement("a");
    projectListLink.href = "#";
    projectListLink.textContent = project.projectName;
    projectListLi.appendChild(projectListLink);
    projectList.appendChild(projectListLi);
});
