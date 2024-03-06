import { db } from "../postgre.js";

export async function getProjects(req, res) {
  try {
    let projectArray = (await db.query("SELECT * FROM project ORDER BY id ASC"))
      .rows;
    let columnArray = (
      await db.query("SELECT * FROM project_column ORDER BY id ASC")
    ).rows;

    res.status(200).send([projectArray, columnArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function createProject(req, res) {
  let newProject;
  let newColumnArray = [];
  try {
    let newProjectResponse = await db.query(
      "INSERT INTO project (name) VALUES ($1) RETURNING *",
      [req.body.projectName]
    );
    newProject = newProjectResponse.rows[0];
    let newProjectId = newProjectResponse.rows[0].id;

    if (req.body.columnNames !== 0) {
      for await (const columnName of req.body.columnNames) {
        let newColumnResponse = await db.query(
          "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
          [columnName, newProjectId]
        );
        newColumnArray.push(newColumnResponse.rows[0]);
      }
    }

    res.status(200).send([newProject, newColumnArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateProject(req, res) {
  try {
    let updatedProject;
    let updatedColumnArray = [];
    let updatedResponseArray = await db.query(
      "UPDATE project SET name = ($1) WHERE id = ($2) RETURNING *",
      [req.body.projectName, req.params.id]
    );
    updatedProject = updatedResponseArray.rows[0];

    let sourceColumnList = (
      await db.query("SELECT * FROM project_column WHERE project_id = $1", [
        req.params.id,
      ])
    ).rows;
    let sourceColumnIds = sourceColumnList.map((col) => col.id);
    let currentColumnList = req.body.columnNames;
    let currentColumnIds = currentColumnList.map((col) => col.id);

    for await (const sourceColumnId of sourceColumnIds) {
      if (!currentColumnIds.includes(sourceColumnId)) {
        await db.query("DELETE FROM project_column WHERE id = $1", [
          sourceColumnId,
        ]);
      }
    }

    for await (const columnName of currentColumnList) {
      if (columnName.id) {
        let newColumnResponse = await db.query(
          "UPDATE project_column SET name = $1 WHERE id = $2 RETURNING *",
          [columnName.name, columnName.id]
        );
        updatedColumnArray.push(newColumnResponse.rows[0]);
      } else {
        let newColumnResponse = await db.query(
          "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
          [columnName.name, req.params.id]
        );
        updatedColumnArray.push(newColumnResponse.rows[0]);
      }
    }
    res.status(200).send([updatedProject, updatedColumnArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProject(req, res) {
  try {
    await db.query("DELETE FROM project_subtask WHERE project_id = ($1)", [
      req.params.id,
    ]);
    await db.query("DELETE FROM project_task WHERE project_id = ($1)", [
      req.params.id,
    ]);
    await db.query("DELETE FROM project_column WHERE project_id = ($1)", [
      req.params.id,
    ]);
    const projectResponse = await db.query(
      "DELETE FROM project WHERE id = ($1) RETURNING id",
      [req.params.id]
    );

    res.status(200).send(projectResponse.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
