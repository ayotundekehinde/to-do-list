const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

let tasks = [];

function renderTasks() {
  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Add one above.</li>';
    return;
  }

  list.innerHTML = tasks
    .map(
      (task, index) => `
        <li class="todo-item">
          <span>${index + 1}. ${task}</span>
          <button type="button" data-index="${index}" class="delete-btn">Delete</button>
        </li>
      `
    )
    .join('');
}

function addTask(text) {
  const cleanText = text.trim();

  if (!cleanText) {
    return;
  }

  tasks.push(cleanText);
  renderTasks();
  form.reset();
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(input.value);
});

list.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-btn');

  if (!deleteButton) {
    return;
  }

  const index = Number(deleteButton.dataset.index);
  tasks.splice(index, 1);
  renderTasks();
});

renderTasks();
