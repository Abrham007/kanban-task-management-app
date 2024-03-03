let HOST = "http://localhost:4000";
export async function fetchProject() {
  const response = await fetch(HOST + "/api/project/get");
  const projectArray = await response.json();
  return projectArray;
}

export async function postProject(newProject) {
  const response = await fetch(HOST + "/api/project/post", {
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
  const response = await fetch(HOST + `/api/project/update/${id}`, {
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
  const response = await fetch(HOST + `/api/project/delete/${id}`, {
    method: "DELETE",
  });
  const deletedProjectId = response.json();
  return deletedProjectId;
}

export async function fetchTask() {
  const response = await fetch(HOST + "/api/task/get");
  const taskArray = await response.json();
  return taskArray;
}

export async function postTask(newTask) {
  const response = await fetch(HOST + "/api/task/post", {
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
  const response = await fetch(HOST + `/api/task/update/${id}`, {
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
  const response = await fetch(HOST + `/api/task/delete/${id}`, {
    method: "DELETE",
  });
  const deletedTaskId = response.json();
  return deletedTaskId;
}

export async function updateTaskDetail(id, newTaskDetail) {
  const response = await fetch(HOST + `api/task/detail/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskDetail),
  });

  const updatedTaskArray = response.json();
  return updatedTaskArray;
}
