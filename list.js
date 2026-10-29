const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList'); 

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    {text: "Task 1", done: false},
    {text: "Task 2", done: false},
    {text: "Task 3", done: false}
];
  
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        li.innerHTML = `
            <span class="task-text ${task.done? 'done' : ''}" onclick="toggleDone(${index})">${task.text}</span>
            <div class="btn-group">
                <button class="btn" onclick="deleteTask(${index})">Delete</button>
                <button class="btn" onclick="editTask(${index})">Edit</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    tasks.push({text: taskText, done: false});
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const li = taskList.children[index];
    const currentText = tasks[index].text;

    li.innerHTML = `
        <input type="text" class="edit-input" value="${currentText}" id="editInput${index}">
        <div class="btn-group">
            <button class="btn" onclick="saveEdit(${index})">Save</button>
            <button class="btn" onclick="renderTasks()">Cancel</button>
        </div>
    `;
    document.getElementById(`editInput${index}`).focus();
}

function saveEdit(index) {
    const newText = document.getElementById(`editInput${index}`).value.trim();
    if (newText === '') return;
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
}

function toggleDone(index) {
    tasks[index].done =!tasks[index].done;
    saveTasks();
    renderTasks();
}

// Events
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();