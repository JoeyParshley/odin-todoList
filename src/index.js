import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";
import { Storage } from "./storage.js";

// const projectsJSON = JSON.stringify(projects);
// Storage.saveProjects(projectsJSON);

const allProjects = JSON.parse(Storage.getProjects());

function showProjectDetails(project) {
    const projectTitleH3 = document.querySelector("#project-title");
    const projectTitle = project.projectName;
    const todosWrapper = document.querySelector("#todos-wrapper");
    const todosH3 = document.createElement("h3");
    todosH3.textContent = "Todos";
    // clear the todos wrapper
    todosWrapper.innerHTML = "";
    // append the h3 to the todos wrapper
    todosWrapper.appendChild(todosH3);
    projectTitleH3.textContent = projectTitle;

    debugger;
    const projectTodos = project.todos;

    projectTodos.forEach((todo) => {
        const todoItemDiv = document.createElement("div");
        todoItemDiv.classList.add("todo-item");
        const todoCheckbox = document.createElement("div");
        todoCheckbox.classList.add("checkbox");
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todo-title");
        todoTitle.textContent = todo.title;
        todoItemDiv.setAttribute("data-todo-id", todo.id);
        todoItemDiv.setAttribute("data-todo-description", todo.description);
        todoItemDiv.setAttribute("data-todo-due-date", todo.dueDate);
        todoItemDiv.setAttribute("data-todo-priority", todo.priority);
        todoItemDiv.setAttribute("data-todo-tags", todo.tags.join(", "));
        todoItemDiv.appendChild(todoCheckbox);
        todoItemDiv.appendChild(todoTitle);

        // append the div to the todos wrapper
        todosWrapper.appendChild(todoItemDiv);
    });
}

function handleProjectClick(e) {
    e.preventDefault();
    const projectId = e.target.getAttribute("data-project-id");
    const project = Storage.getProjectById(projectId);
    showProjectDetails(project);
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
