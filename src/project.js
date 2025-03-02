export class Project {
  constructor(name, todos) {
    this.name = name;
    this.todos = [];
  }

  getName() {
    return this.name;
  }

  getTodos() {
    return this.todos;
  }

  setName(name) {
    this.name = name;
  }

  setTodos(newTodos) {
    this.todos = [...newTodos];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodoByName(name) {
    this.todos = this.todos.filter((todo) => todo.title !== name);
  }
}
