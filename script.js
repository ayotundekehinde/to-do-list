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
        <li class="todo-item${task.completed ? ' completed' : ''}">
          <label class="task-label">
            <input type="checkbox" class="complete-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''} />
            <span class="task-text">${index + 1}. ${task.text}</span>
          </label>
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

  tasks.push({ text: cleanText, completed: false });
  renderTasks();
  form.reset();
  input.focus();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(input.value);
});

list.addEventListener('change', (event) => {
  const checkbox = event.target.closest('.complete-checkbox');

  if (!checkbox) {
    return;
  }

  const index = Number(checkbox.dataset.index);
  tasks[index].completed = checkbox.checked;
  renderTasks();
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
