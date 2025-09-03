const input = document.getElementById("new-task");
const list = document.getElementById("todo-list");

// Charger les tâches sauvegardées
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

function addTask() {
  const task = input.value.trim();
  if (task) {
    todos.push({ text: task, done: false });
    input.value = "";
    saveAndRender();
  }
}

function toggleTask(index) {
  todos[index].done = !todos[index].done;
  saveAndRender();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${i})">${todo.text}</span>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

