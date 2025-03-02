import "./styles/style.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { TagManager } from "./tagManager.js";

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

document
  .getElementById("add-single-item-to-ls")
  .addEventListener("click", (e) => {
    localStorage.setItem("name", "Joey Parshley");
    updateUI();
  });

document
  .getElementById("add-another-item-to-ls")
  .addEventListener("click", (e) => {
    localStorage.setItem(
      "users",
      JSON.stringify({ name: "Andrea Parshley", food: "pizza" })
    );
    updateUI();
  });

document
  .getElementById("get-single-item-from-ls")
  .addEventListener("click", (e) => {
    const user = JSON.parse(localStorage.getItem("users"));
    document.getElementById("ls-currently").textContent = user.name;
  });
document
  .getElementById("remove-single-item-from-ls")
  .addEventListener("click", (e) => {
    localStorage.removeItem("name");
    updateUI();
  });
document.getElementById("remove-all-from-ls").addEventListener("click", (e) => {
  localStorage.clear();
  updateUI();
});

function updateUI() {
  let values = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  while (i--) {
    values.push(localStorage.getItem([keys[i]]));
  }

  document.getElementById("ls-currently").textContent = values;
}
