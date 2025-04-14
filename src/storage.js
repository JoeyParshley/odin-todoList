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

    static saveTags(tags) {
        localStorage.setItem("tags", JSON.stringify(tags));
    }

    static getTags() {
        const tagsJSON = localStorage.getItem("tags");
        return tagsJSON ? JSON.parse(tagsJSON) : [];
    }

    static getTagByName(name) {
        const tags = Storage.getTags();
        return tags.find((tag) => {
            return tag.name === name;
        });
    }

    static deleteTag(tag) {
        const tags = Storage.getTags();
        const updatedTags = tags.filter((tag) => tag.id !== tag.id);
        Storage.saveTags(updatedTags);
    }

    static getTagById(id) {
        const tags = Storage.getTags();
        return tags.find((tag) => {
            return tag.id === id;
        });
    }

    static getProjects() {
        const projectsJSON = localStorage.getItem("projects");
        return projectsJSON ? JSON.parse(projectsJSON) : [];
    }

    static getProjectById(id) {
        const projects = Storage.getProjects();
        const parsedProjects = JSON.parse(projects);
        return parsedProjects.find((project) => {
            return project.id === id;
        });
    }

    static getProjectByName(name) {
        const projects = Storage.getProjects();
        const parsedProjects = JSON.parse(projects);
        return parsedProjects.find((project) => {
            return project.projectName === name;
        });
    }
}
