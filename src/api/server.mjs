import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "tasks",
  password: "a1b2r3h4",
  port: 5432,
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/project", async (req, res) => {
  let projectArray = (await db.query("SELECT * FROM project ORDER BY id ASC")).rows;
  let columnArray = (await db.query("SELECT * FROM project_column ORDER BY id ASC")).rows;

  res.json([projectArray, columnArray]);
});

app.post("/project", async (req, res) => {
  let newProject;
  let newColumnArray = [];
  try {
    let newProjectResponse = await db.query("INSERT INTO project (name) VALUES ($1) RETURNING *", [
      req.body.projectName,
    ]);
    newProject = newProjectResponse.rows[0];
    let newProjectId = newProjectResponse.rows[0].id;
    try {
      for await (const columnName of req.body.columnNames) {
        let newColumnResponse = await db.query(
          "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
          [columnName, newProjectId]
        );
        newColumnArray.push(newColumnResponse.rows[0]);
      }
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }

  res.json([newProject, newColumnArray]);
});

app.put("/project/:id", async (req, res) => {
  let updatedProject;
  let updatedColumnArray = [];
  let updatedResponseArray = await db.query("UPDATE project SET name = ($1) WHERE id = ($2) RETURNING *", [
    req.body.projectName,
    req.params.id,
  ]);
  updatedProject = updatedResponseArray.rows[0];

  let sourceColumnList = (await db.query("SELECT * FROM project_column WHERE project_id = $1", [req.params.id])).rows;
  let sourceColumnIds = sourceColumnList.map((col) => col.id);
  let currentColumnList = req.body.columnNames;
  let currentColumnIds = currentColumnList.map((col) => col.id);

  for await (const sourceColumnId of sourceColumnIds) {
    if (!currentColumnIds.includes(sourceColumnId)) {
      await db.query("DELETE FROM project_column WHERE id = $1", [sourceColumnId]);
    }
  }

  for await (const columnName of currentColumnList) {
    if (columnName.id) {
      let newColumnResponse = await db.query("UPDATE project_column SET name = $1 WHERE id = $2 RETURNING *", [
        columnName.name,
        columnName.id,
      ]);
      updatedColumnArray.push(newColumnResponse.rows[0]);
    } else {
      let newColumnResponse = await db.query(
        "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
        [columnName.name, req.params.id]
      );
      updatedColumnArray.push(newColumnResponse.rows[0]);
    }
  }

  console.log([updatedProject, updatedColumnArray]);

  res.json([updatedProject, updatedColumnArray]);
});

app.delete("/project/:id", async (req, res) => {
  await db.query("DELETE FROM project_subtask WHERE project_id = ($1)", [req.params.id]);
  await db.query("DELETE FROM project_task WHERE project_id = ($1)", [req.params.id]);
  await db.query("DELETE FROM project_column WHERE project_id = ($1)", [req.params.id]);
  const projectResponse = await db.query("DELETE FROM project WHERE id = ($1) RETURNING id", [req.params.id]);

  res.status(200).json(projectResponse.rows[0]);
});

app.get("/task", async (req, res) => {
  let taskArray = (await db.query("SELECT * FROM project_task ORDER BY id ASC")).rows;
  let subtaskArray = (await db.query("SELECT * FROM project_subtask ORDER BY id ASC")).rows;

  res.json([taskArray, subtaskArray]);
});

app.post("/task", async (req, res) => {
  let newTaskArray;
  let newSubtaskArray = [];
  try {
    let newTaskResponse = await db.query(
      "INSERT INTO project_task (title, description, status, column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.body.title, req.body.description, req.body.status, req.body.column_id, req.body.project_id]
    );
    newTaskArray = newTaskResponse.rows;
    let newTaskId = newTaskResponse.rows[0].id;
    try {
      for await (const subtask of req.body.subtasks) {
        let newSubtaskResponse = await db.query(
          "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [subtask.title, subtask.is_completed, newTaskId, req.body.column_id, req.body.project_id]
        );
        newSubtaskArray.push(newSubtaskResponse.rows[0]);
      }
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }

  res.json([newTaskArray, newSubtaskArray]);
});

app.put("/task/:id", async (req, res) => {
  let updatedTaskArray;
  let updatedSubtaskArray = [];
  let updatedResponseArray = await db.query(
    "UPDATE project_task SET title = $1, description = $2, status = $3, column_id = $4, project_id = $5 WHERE id = $6 RETURNING *",
    [req.body.title, req.body.description, req.body.status, req.body.column_id, req.body.project_id, req.params.id]
  );
  updatedTaskArray = updatedResponseArray.rows[0];

  let sourceSubtaskList = (await db.query("SELECT * FROM project_subtask WHERE task_id = $1", [req.params.id])).rows;
  let sourceSubtaskIds = sourceSubtaskList.map((substask) => substask.id);
  let currentSubtaskList = req.body.subtasks;
  let currentSubtaskIds = currentSubtaskList.map((substask) => substask.id);

  for await (const sourceSubtaskId of sourceSubtaskIds) {
    if (!currentSubtaskIds.includes(sourceSubtaskId)) {
      await db.query("DELETE FROM project_subtask WHERE id = $1", [sourceSubtaskId]);
    }
  }

  for await (const subtask of currentSubtaskList) {
    if (subtask.id) {
      let newSubtaskResponse = await db.query(
        "UPDATE project_subtask SET title = $1, column_id = $2 WHERE id = $3 RETURNING *",
        [subtask.title, req.body.column_id, subtask.id]
      );
      updatedSubtaskArray.push(newSubtaskResponse.rows[0]);
    } else {
      let newSubtaskResponse = await db.query(
        "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [subtask.title, subtask.is_completed, req.params.id, req.body.column_id, req.body.project_id]
      );
      updatedSubtaskArray.push(newSubtaskResponse.rows[0]);
    }
  }

  res.json([updatedTaskArray, updatedSubtaskArray]);
});

app.delete("/task/:id", async (req, res) => {
  await db.query("DELETE FROM project_subtask WHERE task_id = ($1)", [req.params.id]);
  const taskResponse = await db.query("DELETE FROM project_task WHERE id = ($1) RETURNING id", [req.params.id]);

  res.status(200).json(taskResponse.rows[0]);
});

app.put("/detail/:id", async (req, res) => {
  let updatedSubtaskArray = [];
  const taskResponse = await db.query("UPDATE project_task SET status = $1, column_id = $2 WHERE id = $3 RETURNING *", [
    req.body.status,
    req.body.column_id,
    req.params.id,
  ]);
  let updatedTask = taskResponse.rows[0];
  for await (let subtask of req.body.subtasks) {
    const subtaskResponse = await db.query(
      "UPDATE project_subtask SET is_completed = $1, column_id = $2 WHERE id = $3 RETURNING *",
      [subtask.is_completed, subtask.column_id, subtask.id]
    );
    updatedSubtaskArray.push(subtaskResponse.rows[0]);
  }

  res.json([updatedTask, updatedSubtaskArray]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
