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
  const response = await fetch("http://localhost:4000/project", {
    method: "DELETE",
  });
  const projectArray = await response.json();
  return projectArray;
}
