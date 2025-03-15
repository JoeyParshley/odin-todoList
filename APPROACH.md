# Set up Webpack

-   Follow steps [here](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page)
    -   This uses [this](https://www.theodinproject.com/lessons/javascript-webpack)
    -   Follow that tutorial using this current project as a guide
-   Play with factory functions to create projects (todoItems)

## Journal

### Description

This section is used to track the work done on this project. I started it when I was mostyly finished with the UI. It is in reverse chornologocal order and its purpose is to track my work and thoughts so
i can track my work an thoughts.

#### 15MAR2025

#### Status

-   The `My Projects` and `My Tags` sections of the `Side Navigation` are functional
-   The `All My Todos` filter in the `Side Navigation` is hooked up.
-   Added the `Late Todos` filter in the `Side Navigation`

#### Todos

-   [x] Add `Completed Todos` filter to `Side Navigation`
-   [x] Set Up `Late Todos` filter
-   [ ] Implement `Late Todos` filter
-   [x] Set Up `Next 7 days` filter
-   [ ] Implement `Next 7 days` filter
-   [x] Set Up `My Day` filter
-   [ ] Implement `My Day` filter
-   [x] Set Up `Completed` filter
-   [ ] Implement `Completed` filter
-   [ ] Implement checkbox - completed behavior
-   [ ] add edit views

#### Notes

The functions called from the `click` eventListeners

| function               | file location | called in:        | located in | called from           |
| ---------------------- | ------------- | ----------------- | ---------- | --------------------- |
| buildProjectDetailsDom | project.js    | buildProjectList  | index.js   | load                  |
| buildTodoDetailsDom    | project.js    | buildAllTodosList | project.js | showFilteredTodosList |
| buildProjectsByTag     | project.js    | buildTagList      | index.js   | load                  |
| showFilteredTodosList  | project.js    | setUpTodoFilters  | index.js   | load                  |
| buildTodoDetailsDom    | todo.js       | buildTodoList     | project.js | showProjectDetails    |

## Project Fields

-   title
-   description
-   priority
-   Notes
-   when - date (someday)
-   Deadline Date
-   Is complete
-   tags
-   Todo list

## Todo Fields

-   title
-   priority
-   description
-   notes
-   due date
-   deadline
-   tags
-   when - date (someday)
-   check list
-   is complete
-   which project or list ist belongs to

## When object

-   When text

## Tag

-   Tagname
-   TagColor

```js
function createTodoItem(title, description, dueDate, priority, notes, isComplete) {
  return {
    name: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    notes: notes,
    isComplete, isComplete,
    greet: function () {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    },
  };
}

const todo1 = createTodoItem(...);
console.log(todo1); // Output: Hello, my name is Alice and I am 30 years old.
```

Projects are lists of todos. Kinda like categories. Default project shows all todos.
Users can

-   create projects
-   add todos to projects
-   create todos
-   set todo properties
-   set todos as complete
-   change todo priority

# Inspiration

-   <https://app.any.do/myday>
-   <https://culturedcode.com/things/support/articles/2803581/#ihqkf>
-   <https://app.todoist.com/app/today>

# Deployment

Follow the steps in the `Deployment` secion on this page [here](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page)

# Playground

```js
const projectNames = taggedProjects.reduce((projectNames, project) => {
    if (!projectNames.includes(project.projectName)) {
        projectNames.push(project.projectName);
    }
    return projectNames;
}, []);
const taggedTodoTitles = taggedTodos.reduce((todoTitles, todo) => {
    if (!todoTitles.includes(todo.title)) {
        todoTitles.push(todo.title);
    }
    return todoTitles;
}, []);
```
