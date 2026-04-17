const state = {
  filter: "all"
};

const elements = {
  totalCount: document.getElementById("totalCount"),
  doneCount: document.getElementById("doneCount"),
  todoCount: document.getElementById("todoCount"),
  completionRate: document.getElementById("completionRate"),
  taskList: document.getElementById("taskList"),
  statusText: document.getElementById("statusText"),
  filterButtons: Array.from(document.querySelectorAll(".filter-button"))
};

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    state.filter = button.dataset.filter || "all";
    syncFilterButtons();
    await loadScreen();
  });
});

await loadScreen();

async function loadScreen() {
  setStatus(`Loading ${state.filter} tasks...`);

  const [summary, tasks] = await Promise.all([fetchSummary(), fetchTasks(state.filter)]);
  renderSummary(summary);
  renderTasks(tasks.items);

  const suffix = tasks.items.length === 1 ? "task" : "tasks";
  setStatus(`Showing ${tasks.items.length} ${suffix} for filter "${state.filter}".`);
}

async function fetchSummary() {
  const response = await fetch("/api/summary");
  return response.json();
}

async function fetchTasks(filter) {
  const response = await fetch(`/api/tasks?status=${encodeURIComponent(filter)}`);
  return response.json();
}

async function toggleTask(taskId) {
  setStatus("Updating task...");

  await fetch(`/api/tasks/${taskId}/toggle`, {
    method: "POST"
  });

  await loadScreen();
}

function renderSummary(summary) {
  elements.totalCount.textContent = String(summary.total);
  elements.doneCount.textContent = String(summary.done);
  elements.todoCount.textContent = String(summary.todo);
  elements.completionRate.textContent = `${summary.completionRate}%`;
}

function renderTasks(tasks) {
  elements.taskList.innerHTML = "";

  if (tasks.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-state";
    item.textContent = "No tasks match the selected filter.";
    elements.taskList.append(item);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-card";
    item.dataset.status = task.status;

    const header = document.createElement("div");
    header.className = "task-header";

    const titleBlock = document.createElement("div");

    const title = document.createElement("h2");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("p");
    meta.className = "task-meta";
    meta.textContent = `${task.owner} • ${task.id}`;

    const tierChip = document.createElement("span");
    tierChip.className = "tier-chip";
    tierChip.textContent = task.memoryTier;

    titleBlock.append(title, meta, tierChip);

    const badge = document.createElement("span");
    badge.className = "status-badge";
    badge.textContent = task.status;

    header.append(titleBlock, badge);

    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description;

    const button = document.createElement("button");
    button.className = "toggle-button";
    button.textContent = task.status === "done" ? "Mark as todo" : "Mark as done";
    button.addEventListener("click", () => toggleTask(task.id));

    item.append(header, description, button);
    elements.taskList.append(item);
  });
}

function syncFilterButtons() {
  elements.filterButtons.forEach((button) => {
    const active = button.dataset.filter === state.filter;
    button.classList.toggle("active", active);
  });
}

function setStatus(message) {
  elements.statusText.textContent = message;
}
