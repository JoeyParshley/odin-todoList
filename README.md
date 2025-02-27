# odin-todoList

Todo List project from Node Path of theodinproject

## Assignment

1. The `Todos` are going to be objects created dynamically, which means using either `factories` or `constructors/classes` to generate them
2. Determine what kind of properties the `todo-items` are going to have. At the very minimum they should have a `title`, `description`, `dueDate`, `priority` may want to include `notes` or a `checklist`
3. The todo list should have `projects` or separate lists of `todos`. When a user opens the app, there should be some sort of 'default' project to which all of their todos are put. Users should be able to create new projects and choose which projects their todos go into.
4. Separate application logic (i.e creating new todos, setting todos as complete, changing todo priority etc.) from the DOM related stuff, so keep all those things in separate modules.
5. The User Interface should be able to do the following:
   1. View all Projects.
   2. View all Todos in each project (just a title and a duedate) maybe change color for different priorities.
   3. Expand a single todo to see its details.
   4. Delete a todo.
6. Check out the following for inspiration:
   1. [Todoist](https://en.todoist.com/)
   2. [Things](https://culturedcode.com/things/)
   3. [any.do](https://www.any.do/)
7. Since using webpack, consider using the following library(s)
   1. [date-fns](https://github.com/date-fns/date-fns) for formatting dates and times.
8. Add some peristance to the TODO app useing the Web Storage API
   1. [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) allows you to save data to the users computer. The data is ONLY accessible on the computer that it was created on. Set up a function that saves the projects (and TODOS) to localStorage every time a new project (or Todo) is created, and another function that looks for that data in localStorage when your app is first loaded.
   - Make sure app does not crash is there is no data in localStorage
   - Use `DevTools` > `Application` > `Local Storage` > `Storage` to inspect saved data
   - Local storage uses JSON so send and store data. **Cannot store functions in JSON** so need to figure out how to add methods back to your object properties once you fetch them.
