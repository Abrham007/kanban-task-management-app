export async function postProjectAndColumn(newProject) {
  const response = await fetch("http://localhost:4000/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });
  const newProjectJson = await response.json();
  return newProjectJson;
}

export async function fetchProjectAndColumnArray() {
  const response = await fetch("http://localhost:4000/project");
  const projectAndColumnArray = await response.json();
  return projectAndColumnArray;
}
