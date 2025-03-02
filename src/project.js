export class Project {
  constructor(name, todos) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodoByName(name) {
    this.todos = this.todos.filter((todo) => todo.title !== name);
  }
}
