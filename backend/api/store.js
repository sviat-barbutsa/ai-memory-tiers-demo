const tasks = [
  {
    id: "task-1",
    title: "Map the overall system",
    owner: "Docs",
    memoryTier: "Tier 1",
    status: "done",
    description: "Read the global memory first so the agent understands the architecture before opening source files."
  },
  {
    id: "task-2",
    title: "Review backend-wide context",
    owner: "Backend",
    memoryTier: "Tier 2",
    status: "todo",
    description: "Load the backend-wide memory before touching a specific service."
  },
  {
    id: "task-3",
    title: "Review frontend-wide context",
    owner: "Frontend",
    memoryTier: "Tier 2",
    status: "done",
    description: "Load the frontend-wide memory before changing UI behavior."
  },
  {
    id: "task-4",
    title: "Inspect API service details",
    owner: "Backend",
    memoryTier: "Tier 3",
    status: "todo",
    description: "Only deep-dive into the API service after Tier 1 and Tier 2 have narrowed the search."
  },
  {
    id: "task-5",
    title: "Update the web task cards",
    owner: "Frontend",
    memoryTier: "Tier 3",
    status: "todo",
    description: "Change UI rendering only after the specific web app memory file has been loaded."
  },
  {
    id: "task-6",
    title: "Use raw code as the final source of truth",
    owner: "Demo",
    memoryTier: "Code",
    status: "done",
    description: "Open the real files only after the memory tiers have already focused the problem."
  }
];

export function listTasks(status = "all") {
  if (status === "all") {
    return tasks.map(cloneTask);
  }

  return tasks.filter((task) => task.status === status).map(cloneTask);
}

export function getTask(taskId) {
  const task = tasks.find((entry) => entry.id === taskId);
  return task ? cloneTask(task) : null;
}

export function toggleTask(taskId) {
  const task = tasks.find((entry) => entry.id === taskId);

  if (!task) {
    return null;
  }

  task.status = task.status === "done" ? "todo" : "done";
  return cloneTask(task);
}

export function getSummary() {
  const total = tasks.length;
  const done = tasks.filter((task) => task.status === "done").length;
  const todo = total - done;

  return {
    total,
    done,
    todo,
    completionRate: total === 0 ? 0 : Math.round((done / total) * 100)
  };
}

function cloneTask(task) {
  return { ...task };
}
