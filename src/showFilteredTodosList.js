import { buildNextSevenDaysTodosList } from "./buildNextSevenDaysTodosList";
import { buildCompletedTodosList } from "./buildCompletedTodosList";
import { buildLateTodosList } from "./buildLateTodosList";
import { buildAllTodosList } from "./buildAllTodosList";
import { buildMyDayTodosList } from "./buildMyDayTodosList";

/**
 * Returns an event handler function that filters and displays a list of todos based on the clicked link.
 * The event handler prevents the default action, updates the active link, and calls the appropriate function
 * to build the filtered todos list.
 *
 * @returns {Function} An event handler function for filtering and displaying todos.
 */
export function showFilteredTodosList() {
    return (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.tagName === "A") {
            document.querySelectorAll("a.active").forEach((a) => {
                a.classList.remove("active");
            });
            target.classList.add("active");
        }
        console.log(target.id);
        switch (target.id) {
            case "myDay":
                buildMyDayTodosList();
                break;

            case "nextDays":
                buildNextSevenDaysTodosList();
                break;

            case "allTodos":
                buildAllTodosList();
                break;

            case "lateTodos":
                buildLateTodosList();
                break;

            case "completedTodos":
                buildCompletedTodosList();
                break;
            default:
                break;
        }
    };
}
