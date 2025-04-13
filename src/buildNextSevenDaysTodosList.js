import { endOfDay, addDays, isAfter } from "date-fns";
import { allProjects } from ".";
import { buildTodoDetailsDom } from "./buildTodoDetailsDom";
import { toggleCompletedStatus } from "./todo";
import { hideTodoDetails } from "./hideTodoDetails";

/**
 * Builds a list of todos due within the next 7 days and updates the DOM.
 *
 * This function clears the current todo list and sets the project title to "Next 7 Days todos".
 * It iterates through all projects and their todos, checking if the todo's due date is within the next 7 days.
 * If a todo is due within this period, it creates a list item for the todo and appends it to the todo list in the DOM.
 *
 * Dependencies:
 * - hideTodoDetails: Function to hide the details of the current todo.
 * - endOfDay: Function to get the end of the day for a given date.
 * - addDays: Function to add a specified number of days to a date.
 * - isAfter: Function to check if one date is after another.
 * - buildTodoDetailsDom: Function to build the DOM for the todo details.
 *
 * @function
 */

export const buildNextSevenDaysTodosList = () => {
    const projectTitle = document.querySelector("#project-title");
    const todoList = document.querySelector("#todos-wrapper .todo-list");
    hideTodoDetails();
    todoList.innerHTML = "";
    projectTitle.textContent = "";
    projectTitle.textContent = "Next 7 Days todos";
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
            const sevenDaysLater = addDays(today, 7);
            if (
                isAfter(todoDueDate, today) &&
                isAfter(sevenDaysLater, todoDueDate)
            ) {
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
