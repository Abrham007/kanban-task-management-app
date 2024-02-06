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

export async function fetchProject() {
  const response = await fetch("http://localhost:4000/project");
  const projectArray = await response.json();
  return projectArray;
}

export async function removeProject(id) {
  const response = await fetch(`http://localhost:4000/project/${id}`, {
    method: "DELETE",
  });
  const deletedProjectId = response.json();
  return deletedProjectId;
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
