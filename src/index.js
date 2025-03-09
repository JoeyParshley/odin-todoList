import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";
import { Storage } from "./storage.js";

// const projectsJSON = JSON.stringify(projects);
// Storage.saveProjects(projectsJSON);

const allProjects = JSON.parse(Storage.getProjects());

/**
 *
 * @param {*} project
 * @description This function takes a project object and displays the project details in the ui. It also clears the todos wrapper and appends the todos to the todos wrapper.
 * @example
 * showProjectDetails(project);
 * @returns {void}
 * TODO: refactor this function to use the project id to get the project from the storage and then call the showProjectDetails function to display the project details in the ui.
 */
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

/**
 * @param {*} e
 * @description This function handles the click event on the project list. It gets the project id from the data-project-id attribute and then gets the project from the storage. It then calls the showProjectDetails function to display the project details in the ui.
 * @example
 * handleProjectClick(e);
 * @returns {void}
 * TODO: refactor this function to use the project id to get the project from the storage and then call the showProjectDetails function to display the project details in the ui.
 */
function handleProjectClick(e) {
    e.preventDefault();
    const target = e.target;
    if (target.tagName === "A") {
        const projectId = target.getAttribute("data-project-id");
        // remove the active class from all the projects
        document.querySelectorAll(".project-list li a").forEach((a) => {
            a.classList.remove("active");
        });
        // add the active class to the clicked project
        target.classList.add("active");
        const project = Storage.getProjectById(projectId);
        showProjectDetails(project);
    }
}

/**
 * Builds the project list in the ui
 * @returns {void}
 * @description This function loops through the projects and creates a new li element for each project. It then appends the li element to the project list.
 * @example
 * buildProjectList();
 * @returns {void}
 *
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
        projectList.addEventListener("click", handleProjectClick);
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

/**
 * Builds the tag list in the ui
 * @returns {void}
 * @description This function loops through the tags and creates a new li element for each tag. It then appends the li element to the tag list.
 * @example
 * buildTagList();
 */
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
// build the tag list
buildTagList();
