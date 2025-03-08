const projects = [
    {
        id: 1,
        projectName: "Personal",
        todos: [
            {
                id: 1,
                title: "Buy groceries",
                description: "Milk, Bread, Eggs, Butter",
                dueDate: "2025-03-10",
                priority: "High",
                tags: ["shopping", "urgent"],
            },
            {
                id: 2,
                title: "Clean the house",
                description: "Vacuum, Dust, Mop",
                dueDate: "2025-03-12",
                priority: "Medium",
                tags: ["chores"],
            },
            {
                id: 3,
                title: "Read a book",
                description: "Finish reading 'The Great Gatsby'",
                dueDate: "2025-03-15",
                priority: "Low",
                tags: ["leisure"],
            },
        ],
    },
    {
        id: 2,
        projectName: "Work",
        todos: [
            {
                id: 4,
                title: "Finish report",
                description: "Complete the quarterly financial report",
                dueDate: "2025-03-09",
                priority: "High",
                tags: ["work", "urgent"],
            },
            {
                id: 5,
                title: "Team meeting",
                description: "Discuss project milestones",
                dueDate: "2025-03-11",
                priority: "Medium",
                tags: ["meeting"],
            },
            {
                id: 6,
                title: "Code review",
                description: "Review code for the new feature",
                dueDate: "2025-03-13",
                priority: "Low",
                tags: ["development"],
            },
        ],
    },
    {
        id: 3,
        projectName: "Fitness",
        todos: [
            {
                id: 7,
                title: "Morning run",
                description: "Run 5 kilometers",
                dueDate: "2025-03-08",
                priority: "High",
                tags: ["exercise"],
            },
            {
                id: 8,
                title: "Yoga session",
                description: "Attend online yoga class",
                dueDate: "2025-03-10",
                priority: "Medium",
                tags: ["exercise", "wellness"],
            },
            {
                id: 9,
                title: "Gym workout",
                description: "Strength training at the gym",
                dueDate: "2025-03-14",
                priority: "Low",
                tags: ["exercise"],
            },
        ],
    },
];

export default projects;
