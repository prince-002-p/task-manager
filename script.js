let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (filter === "completed" && !task.done) return;
        if (filter === "pending" && task.done) return;

        let li = document.createElement("li");

        let text = document.createElement("span");
        text.textContent = task.text;
        text.className = "task-text";

        if (task.done) text.classList.add("done");

        /* Buttons */
        let btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";

        let doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.className = "btn done-btn";

        doneBtn.onclick = () => {
    if (task.done) return; // 

    task.done = true;
    saveTasks();
    renderTasks();
};

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn edit-btn";

        editBtn.onclick = () => {
            let newText = prompt("Edit task:", task.text);
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn delete-btn";

        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        btnGroup.appendChild(doneBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(text);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });
}

function addTask() {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        done: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function filterTasks(type) {
    renderTasks(type);
}
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});
function addTask() {
    let value = taskInput.value.trim();
    if (value === "") return;

    tasks.push({
        text: value,
        done: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}
renderTasks();