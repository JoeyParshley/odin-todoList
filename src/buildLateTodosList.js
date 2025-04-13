import { endOfDay, isAfter } from "date-fns";
import { allProjects } from ".";
import { buildTodoDetailsDom } from "./buildTodoDetailsDom";
import { toggleCompletedStatus } from "./todo";
import { hideTodoDetails } from "./hideTodoDetails";

/**
 * Builds and displays a list of todos that are past their due date.
 *
 * This function selects the project title element and the todo list wrapper element from the DOM,
 * clears their current content, and sets the project title to "Late todos". It then iterates
 * over all projects and their respective todos, checking if the due date of each todo is before
 * the current date. If a todo is late, it creates and appends a list item for the todo to the
 * todo list wrapper. Each todo list item includes a checkbox and a link with event listeners
 * to display the todo details when clicked.
 */

export const buildLateTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Late todos";
    allProjects.map((project) => {
        project.todos.map((todo) => {
            const dueDate = todo.dueDate;
            const dueDateParts = dueDate.split("-");
            const dueDateYear = dueDateParts[0];
            const dueDateMonth = dueDateParts[1] - 1;
            const dueDateDay = dueDateParts[2];
            const todoDueDate = endOfDay(
                new Date(dueDateYear, dueDateMonth, dueDateDay)
            );
            const today = endOfDay(new Date());
            if (isAfter(today, todoDueDate)) {
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
                todoListItemLink.setAttribute("title", todo.title);
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
