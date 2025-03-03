import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";
import { Storage } from "./storage.js";

const todo1 = new Todo(
  "Todo 1",
  "This is todo one.",
  new Date("April 9, 2025"),
  "High",
  "This is a note about todo one.",
  ["tag1"]
);

const todo2 = new Todo(
  "Todo 2",
  "This is the second todo",
  new Date("April, 20, 2025"),
  "Medium",
  "Here is a note regarding Todo number 2.",
  ["tag1"]
);

const todo3 = new Todo(
  "Todo 3",
  "This is the third todo",
  new Date("July, 4, 2025"),
  "Medium",
  "Here is a note regarding the third todo.",
  ["tag1"]
);

const todo4 = new Todo(
  "Todo 4",
  "This is the fourth todo",
  new Date("October 28, 2025"),
  "Medium",
  "Here is a note regarding about the fourth todo.",
  ["tag1"]
);

const allTodos = new Project("All Todos", [todo1, todo2, todo3, todo4]);

Storage.saveTodo(todo1);
Storage.saveTodo(todo2);
Storage.saveTodo(todo3);
Storage.saveTodo(todo4);
Storage.saveProject(allTodos);

Storage.deleteTodo(todo3);
Storage.deleteProject(allTodos);
