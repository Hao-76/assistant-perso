async function loadTasks() {
  const res = await fetch("tasks.json");
  const tasks = await res.json();
  const list = document.getElementById("task-list");

  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const div = document.createElement("div");
    div.className = "task" + (task.done ? " done" : "");
    div.innerHTML = `
      <input type="checkbox" id="task-${i}" ${task.done ? "checked" : ""}>
      <label for="task-${i}">${task.title}</label>
    `;
    list.appendChild(div);

    div.querySelector("input").addEventListener("change", () => {
      task.done = !task.done;
      saveTasks(tasks);
    });
  });
}

function saveTasks(tasks) {
  // ⚠️ Sur GitHub Pages on ne peut pas écrire dans un fichier
  // mais plus tard, on pourra utiliser LocalStorage :
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();

