export class Storage {
  static saveTodo(todo) {
    localStorage.setItem(todo.title, JSON.stringify(todo));
  }

  static deleteTodo(todo) {
    localStorage.removeItem(todo.title);
  }

  static saveProject(project) {
    localStorage.setItem(project.name, JSON.stringify(project));
  }

  static deleteProject(project) {
    localStorage.removeItem(project.name);
  }
}
