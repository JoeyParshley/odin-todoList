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

    static saveProjects(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    static getProjects() {
        const projectsJSON = localStorage.getItem("projects");
        return projectsJSON ? JSON.parse(projectsJSON) : [];
    }
}
