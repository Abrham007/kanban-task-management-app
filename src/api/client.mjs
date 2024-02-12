export async function fetchProject() {
  const response = await fetch("http://localhost:4000/project");
  const projectArray = await response.json();
  return projectArray;
}

export async function postProject(newProject) {
  const response = await fetch("http://localhost:4000/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });
  const newProjectArray = await response.json();

  return newProjectArray;
}

export async function updateProject(id, project) {
  const response = await fetch(`http://localhost:4000/project/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  const updatedProjectArray = response.json();
  return updatedProjectArray;
}

export async function removeProject(id) {
  const response = await fetch(`http://localhost:4000/project/${id}`, {
    method: "DELETE",
  });
  const deletedProjectId = response.json();
  return deletedProjectId;
}

export async function fetchTask() {
  const response = await fetch("http://localhost:4000/task");
  const taskArray = await response.json();
  return taskArray;
}

export async function postTask(newTask) {
  const response = await fetch("http://localhost:4000/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  const newTaskArray = await response.json();
  return newTaskArray;
}

export async function updateTask(id, task) {
  const response = await fetch(`http://localhost:4000/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const updatedTaskArray = response.json();
  return updatedTaskArray;
}

export async function removeTask(id) {
  const response = await fetch(`http://localhost:4000/task/${id}`, {
    method: "DELETE",
  });
  const deletedTaskId = response.json();
  return deletedTaskId;
}

export async function updateTaskDetail(id, newTaskDetail) {
  const response = await fetch(`http://localhost:4000/detail/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskDetail),
  });

  const updatedTaskArray = response.json();
  return updatedTaskArray;
}
