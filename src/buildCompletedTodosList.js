import { allProjects } from ".";
import { buildTodoDetailsDom } from "./buildTodoDetailsDom";
import { toggleCompletedStatus } from "./todo";
import { hideTodoDetails } from "./hideTodoDetails";

export const buildCompletedTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Completed";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            if (todo.isCompleted) {
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
            }
        });
    });
};
