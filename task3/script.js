const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn">
                    ✓
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        li.querySelector(".complete-btn")
            .addEventListener("click", () => {

                task.completed = !task.completed;

                saveTasks();
                renderTasks();

            });

        li.querySelector(".delete-btn")
            .addEventListener("click", () => {

                tasks = tasks.filter(
                    t => t.id !== task.id
                );

                saveTasks();
                renderTasks();

            });

        li.querySelector(".edit-btn")
            .addEventListener("click", () => {

                const updatedTask =
                    prompt("Edit Task", task.text);

                if (
                    updatedTask !== null &&
                    updatedTask.trim() !== ""
                ) {
                    task.text = updatedTask.trim();

                    saveTasks();
                    renderTasks();
                }

            });

        taskList.appendChild(li);

    });
}

addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        addTaskBtn.click();
    }

});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        renderTasks();

    });

});

renderTasks();
