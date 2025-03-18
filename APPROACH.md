# Set up Webpack

-   Follow steps [here](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page)
    -   This uses [this](https://www.theodinproject.com/lessons/javascript-webpack)
    -   Follow that tutorial using this current project as a guide
-   Play with factory functions to create projects (todoItems)

## Journal

### Description

This section is used to track the work done on this project. I started it when I was mostyly finished with the UI. It is in reverse chornologocal order and its purpose is to track my work and thoughts so
i can track my work an thoughts.

---

#### 17MAR2025

#### Todos

-   [x] Have checkbox toggle `isCompleted` state
-   [x] see how AI would perist the `isCompleted` changes.
-   [x] make `#detail-name` H3 tag editable when `click`ed
-   [ ] make `#detail-name` H3 tag save its change when `blur`red
-   [ ] Add the `click` and `blur` handlers to all `todo-detail` text elements.
-   [ ] Have `Edit` button make all fields editable and focus on Title
-   [ ] Add `Save` button that is visible when any fields are editable.
-   [ ] create default/empty project view
-   [ ] set `My Day` to be selected by default
-   [ ] Add control to `create new project`

#### Status

-   Saving `completed` state has been implemented
-   `BUG` once change the `completed` state get following error when refreshing the page

#### contenteditable

-   going to try to use the `contenteditanble` on the text elements when you click on one it will become editanle. When you remove focus you will save the change.
-   the `contenteditable` [global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) is an enumerated attribute indicating if the element should be editable.
    -   the attribute must take `true`|`""` which indicates that the element is editable, `false` or `plaintext-only` which indicates that the element's raw text is editable but rich terxt formatting is dsiabled. It the attribute is givven without a value it value is treated as an `""`
    -   if the attribute is missing or its value is invalid its value is _inherited_ from its parent element.
    -   you can set the color used to draw the text insertion [caret](https://developer.mozilla.org/en-US/docs/Glossary/Caret) with the CSS [caret-color](https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color) property

#### error 2

##### current error

```
Uncaught SyntaxError: Unexpected token 'o', "[object Obj"... is not valid JSON
    at JSON.parse (<anonymous>)
    at eval (index.js:21:8)
    at ./src/index.js (main.js:366:1)
    at __webpack_require__ (main.js:459:32)
    at main.js:1530:37
    at main.js:1532:12
```

##### Explanation

The error message `Uncaught SyntaxError: Unexpected token 'o', "[object Obj"... is not valid JSON` indicates that the `JSON.parse()` function is attempting to parse a string that is not valid JSON. Specifically, the string it's trying to parse appears to start with `"[object Obj"`, which suggests that an `object is being converted to a string using the default toString() method instead of JSON.stringify()`. This often occurs when you try to` directly store a JavaScript object in localStorage without first converting it to a JSON string`, and then try to parse it back into an object. The `Storage.getProjects()` function is likely returning a value that is not a valid JSON string, which then fails when parsed by `JSON.parse()` in the code `export const allProjects = JSON.parse(Storage.getProjects())`;.

##### Fix

Set `getProjects()` to just return the JSON. why did this work before saving changes I think I may be changing the JSON when saving the `completed` state.

TODO See what AI suggests for saving the project.

#### error 1

##### old error

```
Uncaught SyntaxError: "[object Object]" is not valid JSON
    at JSON.parse (<anonymous>)
    at eval (index.js:21:8)
    at ./src/index.js (main.js:366:1)
    at __webpack_require__ (main.js:459:32)
    at main.js:1530:37
    at main.js:1532:12
```

##### Explanation

The code in questions is:

```
export const allProjects = JSON.parse(Storage.getProjects());
```

It looks like when the change in `completed` state tries to save to the local storage. Its saving the `current` project and not `allProjects`

So something is up when getting the list of projects from `local storage`.

It was passing in `currentProject` instead of `allProjects` to the `Storage.save(project)`

#### 16MAR2025

#### Status

-   `Side Navigation` filters are functional
-   Checkboxes reflect `isCompleted` state in UI
-   Added the `Late Todos` filter in the `Side Navigation`

#### Todos

-   [x] Add `Completed Todos` filter to `Side Navigation`
-   [x] Set Up `Late Todos` filter
-   [x] Implement `Late Todos` filter
-   [x] Set Up `Next 7 days` filter
-   [x] Implement `Next 7 days` filter
-   [x] Set Up `My Day` filter
-   [x] Implement `My Day` filter
-   [x] Set Up `Completed` filter
-   [x] add completed style to checkboxes
-   [x] Implement `Completed` filter
-   [ ] Add click handler to checkboxes
-   [ ] add edit views
-   [ ] create default/empty project view
-   [ ] set `My Day` to be selected by default
-   [ ] Add control to `create new project`
-   [ ] Have checkbox toggle `isCompleted` state

---

#### 15MAR2025

#### Status

-   The `My Projects` and `My Tags` sections of the `Side Navigation` are functional
-   The `All My Todos` filter in the `Side Navigation` is hooked up.
-   Added the `Late Todos` filter in the `Side Navigation`

#### Todos

-   [x] Add `Completed Todos` filter to `Side Navigation`
-   [x] Set Up `Late Todos` filter
-   [x] Implement `Late Todos` filter
-   [x] Set Up `Next 7 days` filter
-   [x] Implement `Next 7 days` filter
-   [x] Set Up `My Day` filter
-   [x] Implement `My Day` filter
-   [x] Set Up `Completed` filter
-   [x] add completed style to checkboxes
-   [x] Implement `Completed` filter
-   [ ] Implement checkbox - completed behavior
-   [ ] add edit views
-   [ ] create default/empty project view
-   [ ] set `My Day` to be selected by default
-   [ ] Add control to `create new project`
-   [ ] Have checkbox toggle `isCompleted` state

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
function createTodoItem(title, description, dueDate, priority, notes, isCompleted) {
  return {
    name: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    notes: notes,
    isCompleted, isCompleted,
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
