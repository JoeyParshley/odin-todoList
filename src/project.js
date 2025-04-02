import { allProjects } from ".";
import { Storage } from "./storage";
import { hideTodoDetails } from "./hideTodoDetails";
import { buildTodoList } from "./buildTodoList";

export class Project {
    constructor(name, todos = []) {
        this.name = name;
        this.todos = todos;
    }

    getName() {
        return this.name;
    }

    getTodos() {
        return this.todos;
    }

    setName(name) {
        this.name = name;
    }

    setTodos(newTodos) {
        this.todos = [...newTodos];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodoByName(name) {
        this.todos = this.todos.filter((todo) => todo.title !== name);
    }

    moveTodoToProject(todoToMove, newProject) {
        this.todos = this.todos.filter(
            (todo) => todo.title !== todoToMove.title
        );
        newProject.todos.push(todoToMove);
    }
}

/**
 * @param {*} e
 * @description This function handles the click event on the project list. It gets the project id from the data-project-id attribute and then gets the project from the storage. It then calls the showProjectDetails function to display the project details in the ui.
 * @example
 * handleProjectClick(e);
 * @returns {void}
 * TODO: refactor this function to use the project id to get the project from the storage and then call the showProjectDetails function to display the project details in the ui.
 */
export function buildProjectDetailsDom(e) {
    e.preventDefault();
    const target = e.target;
    if (target.tagName === "A") {
        const projectId = target.getAttribute("data-project-id");
        // remove the active class from all the projects
        document.querySelectorAll("a.active").forEach((a) => {
            a.classList.remove("active");
        });
        // add the active class to the clicked project
        target.classList.add("active");
        const project = Storage.getProjectById(projectId);
        showProjectDetails(project);
    }
}

/**
 * Builds and displays projects filtered by a specific tag.
 *
 * This function is triggered by an event, typically a click event on a tag link.
 * It prevents the default action of the event, identifies the target element,
 * and then filters the projects and their associated todos based on the tag
 * present in the target element's ID. The filtered todos are then used to
 * build a new project object which is displayed using the `showProjectDetails` function.
 *
 * @param {Event} e - The event object triggered by the user interaction.
 */
export function buildProjectsByTag(e) {
    e.preventDefault();
    const target = e.target;
    let taggedProject = {};
    let taggedTodos = [];
    let taggedProjects = [];
    let tag = "";
    if (e.target.tagName === "A") {
        // get the projects associated with this tag
        // map through the projects to get the todos, map though the todos to get the tags
        allProjects.map((project) => {
            const todos = project.todos;
            todos.map((todo) => {
                const tags = todo.tags;
                tags.map((currentTag) => {
                    if (currentTag === e.target.id) {
                        // we have the project object, the todo object, and the tag
                        // now build the todolits ui
                        if (!taggedTodos.includes(todo)) {
                            tag = currentTag;
                            taggedProject = structuredClone(project);
                            taggedProjects.push(taggedProject);
                            taggedTodos.push(todo);
                        }
                    }
                });
            });
        });

        taggedProject.projectName = taggedProjects
            .reduce((projectName, project) => {
                return projectName + project.projectName + ", ";
            }, "")
            .slice(0, -2);

        taggedProject.todos = taggedTodos;

        showProjectDetails(taggedProject);
        // populate the ui with the todos from that project using the existing display function
        // toggle the active classes.
        document.querySelectorAll("a.active").forEach((a) => {
            a.classList.remove("active");
        });
        target.classList.add("active");
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
export function buildProjectList() {
    allProjects.forEach((project) => {
        const projectList = document.querySelector(".project-list");
        // create a new li element
        const projectListItem = document.createElement("li");
        // create a new a element
        const projectListItemLink = document.createElement("a");
        projectListItemLink.setAttribute("data-project-id", project.id);
        projectListItemLink.href = "#";
        projectList.addEventListener("click", buildProjectDetailsDom);
        projectListItemLink.textContent = project.projectName;
        projectListItem.appendChild(projectListItemLink);
        projectList.appendChild(projectListItem);
    });
}

/**
 * Gets all the tags from the projects
 * @returns {Array} allTags
 * @description This function loops through the projects and creates a new array of all the tags in the projects. It then returns the array.
 * @example
 * const allTags = getAllTagsFromProjects();
 */
export function getAllTagsFromProjects() {
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
export function buildTagList() {
    const allTags = getAllTagsFromProjects();
    const tagList = document.querySelector(".tag-list");
    allTags.forEach((tag) => {
        const tagListLi = document.createElement("li");
        const tagListLink = document.createElement("a");
        tagListLink.href = "#";
        tagListLink.setAttribute("id", tag);
        tagListLink.classList.add("tag-list-item");
        tagListLink.textContent = tag;
        tagListLi.appendChild(tagListLink);
        tagList.addEventListener("click", buildProjectsByTag);
        tagList.appendChild(tagListLi);
    });
}
/**
 *
 * @param {*} project
 * @description This function takes a project object and displays the project details in the ui. It also clears the todos wrapper and appends the todos to the todos wrapper.
 * @example
 * showProjectDetails(project);
 * @returns {void}
 * TODO: refactor this function to use the project id to get the project from the storage and then call the showProjectDetails function to display the project details in the ui.
 */

export function showProjectDetails(project) {
    const projectTitleH3 = document.querySelector("#project-title");
    const projectTitle = project.projectName;
    const todosWrapper = document.querySelector("#todos-wrapper");
    const todosH3 = document.createElement("h3");
    const todosList = document.createElement("ul");
    const projectTodos = project.todos;

    projectTitleH3.textContent = projectTitle;
    todosList.classList.add("todo-list");
    // clear the todos wrapper
    todosWrapper.innerHTML = "";
    hideTodoDetails();
    // append the h3 to the todos wrapper
    todosH3.textContent = "Todos";
    todosWrapper.appendChild(todosH3);
    todosWrapper.appendChild(todosList);

    buildTodoList(project);
}
