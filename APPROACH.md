# Set up Webpack

- Follow steps [here](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page)
  - This uses [this](https://www.theodinproject.com/lessons/javascript-webpack)
  - Follow that tutorial using this current project as a guide
- Play with factory functions to create projects (todoItems)

# Notes

## Project Fields

- title
- description
- priority
- Notes
- when - date (someday)
- Deadline Date
- Is complete
- tags
- Todo list

## Todo Fields

- title
- priority
- description
- notes
- due date
- deadline
- tags
- when - date (someday)
- check list
- is complete
- which project or list ist belongs to

## When object

- When text

## Tag

- Tagname
- TagColor

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

- create projects
- add todos to projects
- create todos
- set todo properties
- set todos as complete
- change todo priority

# Inspiration

- https://app.any.do/myday
- https://culturedcode.com/things/support/articles/2803581/#ihqkf
- https://app.todoist.com/app/today

# Deployment

Follow the steps in the `Deployment` secion on this page [here](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page)
