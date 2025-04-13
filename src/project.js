import { allProjects } from ".";
import { Storage } from "./storage";
import { hideTodoDetails } from "./hideTodoDetails";
import { buildTodoList } from "./buildTodoList";
import { fi } from "date-fns/locale";
import { generateId } from "./generateId";
import { Todo } from "./todo";

export class Project {
    constructor(projectName, todos = []) {
        this.projectName = projectName;
        this.todos = todos;
        this.id = generateId();
    }

    getName() {
        return this.projectName;
    }

    getTodos() {
        return this.todos;
    }

    setName(name) {
        this.projectName = name;
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

document.querySelector("#add-project").addEventListener("click", (e) => {
    // create modal to add a new project
    // Create backdrop element
    const container = document.querySelector(".container");
    // create modal backdrop
    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");
    // create modal container
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal");
    // create modal header
    const modalHeader = document.createElement("div");
    const modalHeaderH3 = document.createElement("h3");
    modalHeaderH3.textContent = "Add New Project";
    modalHeader.classList.add("modal-header");
    modalHeader.appendChild(modalHeaderH3);
    // create modal body
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    // create modal body elements
    const formInputDiv = document.createElement("div");
    formInputDiv.classList.add("form-list");
    const projectNameInput = document.createElement("input");
    const projectNameLabel = document.createElement("label");
    projectNameLabel.textContent = "Project Name";
    projectNameInput.setAttribute("type", "text");
    projectNameInput.setAttribute("placeholder", "Enter project name");
    projectNameInput.setAttribute("name", "project-name");
    projectNameLabel.setAttribute("for", "project-name");
    projectNameInput.setAttribute("placeholder", "Enter project name");
    formInputDiv.appendChild(projectNameLabel);
    formInputDiv.appendChild(projectNameInput);
    modalBody.appendChild(formInputDiv);
    // create modal footer
    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("cancel-button");
    cancelButton.addEventListener("click", () => {
        backdrop.remove();
        modalContainer.remove();
    });
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    saveButton.addEventListener("click", () => {
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            const newProject = new Project(projectName);
            try {
                allProjects.push(newProject);
                Storage.saveProjects(JSON.stringify(allProjects));
                console.log(`New project added: ${projectName}`);
            } catch (error) {
                console.error("Error adding new project:", error);
            }
            backdrop.remove();
            modalContainer.remove();
            addProjectToProjectList(newProject);
        }
    });
    const buttonWrapperDiv = document.createElement("div");
    buttonWrapperDiv.classList.add("button-wrapper");
    buttonWrapperDiv.appendChild(cancelButton);
    buttonWrapperDiv.appendChild(saveButton);
    modalFooter.appendChild(buttonWrapperDiv);
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalBody);
    modalContainer.appendChild(modalFooter);
    backdrop.appendChild(modalContainer);
    container.appendChild(backdrop);
});

document.querySelector("#add-tag").addEventListener("click", (e) => {
    console.log("Add tag button clicked");
});

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

export function addProjectToProjectList(project) {
    const projectList = document.querySelector(".project-list");
    // create a new li element
    const projectListItem = document.createElement("li");
    // create a new a element
    const projectListItemLink = document.createElement("a");
    projectListItemLink.setAttribute("data-project-id", project.id);
    projectListItemLink.href = "#";
    projectListItemLink.textContent = project.projectName;
    projectListItem.appendChild(projectListItemLink);
    projectList.appendChild(projectListItem);
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
    const todosNameSpan = document.createElement("span");
    const addTodoLink = document.createElement("a");
    const todoDetails = document.querySelector("#todo-details");
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    breadcrumbsElement.textContent = `My Projects > ${project.projectName}`;
    const editButton = document.querySelector("#edit-button");
    let cancelButton = document.querySelector("#cancel-button");
    let saveButton = document.querySelector("#save-button");

    const projectTodos = project.todos;
    const fieldsToEdit = [
        "#detail-name",
        "#detail-description",
        "#detail-dueDate",
        "#detail-priority",
        "#detail-notes",
    ];

    projectTitleH3.textContent = projectTitle;
    todosList.classList.add("todo-list");
    // clear the todos wrapper
    todosWrapper.innerHTML = "";
    hideTodoDetails();
    // append the h3 to the todos wrapper
    todosNameSpan.textContent = "Todos";
    addTodoLink.href = "#";
    addTodoLink.textContent = "+";
    addTodoLink.addEventListener("click", (e) => {
        e.preventDefault();
        fieldsToEdit.forEach((field) => {
            const fieldElement = document.querySelector(field);
            const defaultValue = field.split("#")[1].split("-")[1];
            fieldElement.textContent = `Enter ${
                defaultValue.charAt(0).toUpperCase() + defaultValue.slice(1)
            }`;
            fieldElement.setAttribute(
                "data-original-value",
                fieldElement.textContent
            );
            fieldElement.toggleAttribute("contenteditable");
            fieldElement.addEventListener("click", (e) => {
                e.stopPropagation();
                e.target.textContent = "";
            });
            fieldElement.addEventListener("focus", (e) => {
                e.target.textContent = "";
            });
            fieldElement.addEventListener("blur", (e) => {
                if (e.target.textContent.trim() === "") {
                    e.target.textContent = `Enter ${
                        defaultValue.charAt(0).toUpperCase() +
                        defaultValue.slice(1)
                    }`;
                }
            });
        });

        // Create cancel button
        cancelButton = document.createElement("button");
        cancelButton.id = "cancel-button";
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", () => {
            fieldsToEdit.forEach((field) => {
                const fieldElement = document.querySelector(field);
                const originalValue = fieldElement.getAttribute(
                    "data-original-value"
                );
                fieldElement.textContent = originalValue;
                fieldElement.toggleAttribute("contenteditable", false);
            });
            cancelButton.remove();
            saveButton.remove();
            todoDetails.classList.add("inactive");
            editButton.classList.remove("hidden");
        });

        // Create save button
        saveButton = document.createElement("button");
        saveButton.id = "save-button";
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", () => {
            console.log(
                "save button click handler in showProjectDetails in project.js"
            );

            // gather new todo field values for name, description, dueDate, priority, notes, tags
            const newTodoTitle =
                document.querySelector("#detail-name").textContent;
            const newTodoDescription = document.querySelector(
                "#detail-description"
            ).textContent;
            const newTodoDueDate =
                document.querySelector("#detail-dueDate").textContent;
            const newTodoPriority =
                document.querySelector("#detail-priority").textContent;
            const newTodoNotes =
                document.querySelector("#detail-notes").textContent;
            const newTodoTags = [];
            const newTodo = new Todo(
                newTodoTitle,
                newTodoDescription,
                newTodoDueDate,
                newTodoPriority,
                newTodoNotes,
                false,
                newTodoTags
            );
            // add todo to the UI
            buildTodoList(project);
            // Add new todo to the project
            project.todos.push(newTodo);
            // update project in allProjects
            allProjects.map((proj) => {
                if (proj.projectName === project.projectName) {
                    proj.todos.push(newTodo);
                }
            });
            // save project to storage
            Storage.saveProjects(JSON.stringify(allProjects));
            // hide save and cancel buttons and show edit button
            cancelButton.remove();
            saveButton.remove();
            todoDetails.classList.remove("inactive");
            editButton.classList.remove("hidden");
        });
        // Hide edit button
        editButton.classList.add("hidden");
        // Append cancel and save buttons
        todoDetails.appendChild(cancelButton);
        todoDetails.appendChild(saveButton);
        todoDetails.classList.remove("inactive");
    });

    todosH3.appendChild(todosNameSpan);
    todosH3.appendChild(addTodoLink);
    todosWrapper.appendChild(todosH3);
    todosWrapper.appendChild(todosList);

    buildTodoList(project);
}
