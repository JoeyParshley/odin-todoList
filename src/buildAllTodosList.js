import { allProjects } from ".";
import { buildTodoDetailsDom } from "./buildTodoDetailsDom";
import { toggleCompletedStatus } from "./todo";
import { hideTodoDetails } from "./hideTodoDetails";

/**
 * Builds and displays a list of all todos from all projects.
 *
 * This function selects the project title element and the todo list wrapper element from the DOM,
 * clears their current content, and sets the project title to "All my todos". It then iterates
 * over all projects and their respective todos, creating and appending list items for each todo
 * to the todo list wrapper. Each todo list item includes a checkbox and a link with event listeners
 * to display the todo details when clicked.
 */

export const buildAllTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "All my todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const todoListItem = document.createElement("li");
            const todoListItemLink = document.createElement("a");
            const todoCheckbox = document.createElement("div");
            todoCheckbox.classList.add("checkbox");
            todoCheckbox.addEventListener("click", (e) =>
                toggleCompletedStatus(e, project.id, todo.id)
            );
            if (todo.isCompleted) {
                if (!todoCheckbox.classList.contains("completed"))
                    todoCheckbox.classList.add("completed");
            } else {
                if (todoCheckbox.classList.contains("completed"))
                    todoCheckbox.classList.remove("completed");
            }
            todoListItemLink.href = "#";
            todoListItemLink.classList.add("todo-title");
            todoListItemLink.setAttribute("data-todo-id", todo.id);
            todoListItemLink.setAttribute("data-project-id", project.id);
            todoListItemLink.textContent = todo.title;
            todoListItemLink.addEventListener("click", (e) =>
                buildTodoDetailsDom(e, project)
            );
            todoListItem.classList.add("todo-item");
            todoListItem.appendChild(todoCheckbox);
            todoListItem.appendChild(todoListItemLink);
            todoList.appendChild(todoListItem);
        });
    });
};
