const input = document.getElementById("new-task");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Confetti canvas
const canvas = document.getElementById("confetti");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let confettis = [];

function Confetti(x,y){
  this.x = x;
  this.y = y;
  this.size = Math.random()*8+4;
  this.speedY = Math.random()*3+2;
  this.color = `hsl(${Math.random()*360},70%,60%)`;
}
Confetti.prototype.update = function(){ this.y += this.speedY; };
Confetti.prototype.draw = function(){
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,this.size,this.size);
}

function spawnConfetti(){
  for(let i=0;i<30;i++){
    confettis.push(new Confetti(Math.random()*canvas.width,0));
  }
}

function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettis.forEach((c,i)=>{
    c.update(); c.draw();
    if(c.y>canvas.height) confettis.splice(i,1);
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

function addTask() {
  const task = input.value.trim();
  if(task){
    todos.push({ text: task, done: false });
    input.value = "";
    saveAndRender();
  }
}

function toggleTask(index){
  todos[index].done = !todos[index].done;
  if(todos[index].done) spawnConfetti();
  saveAndRender();
}

function deleteTask(index){
  todos.splice(index,1);
  saveAndRender();
}

function saveAndRender(){
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function renderTodos(){
  list.innerHTML = "";
  todos.forEach((todo,i)=>{
    const li = document.createElement("li");
    li.className = todo.done ? "done added" : "added";

    // Avatar qui change selon l'état
    const happy = ["🐶","🐱","🦊","🐰","🐻"];
    const sleepy = ["😴","🐶💤","🐱💤","🐻💤"];
    const avatar = todo.done ? sleepy[Math.floor(Math.random()*sleepy.length)] : happy[Math.floor(Math.random()*happy.length)];

    li.innerHTML = `
      <span onclick="toggleTask(${i})"><span class="avatar">${avatar}</span>${todo.text}</span>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

