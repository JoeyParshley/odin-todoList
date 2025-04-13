import { endOfDay, isSameDay } from "date-fns";
import { allProjects } from ".";
import { toggleCompletedStatus } from "./todo";
import { hideTodoDetails } from "./hideTodoDetails";
import { buildTodoDetailsDom } from "./buildTodoDetailsDom";

/**
 * Builds and displays the list of todos due today.
 *
 * This function clears the current todo list and sets the project title to "My Day todos".
 * It iterates through all projects and their todos, checking if the todo's due date is today.
 * If a todo is due today, it creates a list item for the todo and appends it to the todo list.
 *
 * @function
 */

export const buildMyDayTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "My Day todos";
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
            if (isSameDay(todoDueDate, today)) {
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
