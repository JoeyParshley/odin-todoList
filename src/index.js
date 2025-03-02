import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";

const todo1 = new Todo(
  "Todo 1",
  "This is todo one.",
  new Date("April 9, 2025"),
  "High",
  "This is a note about todo one.",
  false
);

const todo2 = new Todo(
  "Todo 2",
  "This is the second todo",
  new Date("April, 20, 2025"),
  "Medium",
  "Here is a note regarding Todo number 2.",
  false
);

const project1 = new Project("project1");
project1.addTodo(todo1);
project1.addTodo(todo2);
console.log("project1", project1);

project1.deleteTodoByName("Todo 2");

console.log("project1 after deletion", project1);
