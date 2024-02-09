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
  console.log("server get project reached");
  let projectArray = (await db.query("SELECT * FROM project ORDER BY id ASC")).rows;
  let columnArray = (await db.query("SELECT * FROM project_column ORDER BY project_id ASC")).rows;

  res.json([projectArray, columnArray]);
});

app.post("/project", async (req, res) => {
  console.log("sever post project reached");
  let newProjectArray;
  let newColumnArray = [];
  try {
    let newProjectResponse = await db.query("INSERT INTO project (name) VALUES ($1) RETURNING *", [
      req.body.projectName,
    ]);
    newProjectArray = newProjectResponse.rows;
    let newProjectId = newProjectResponse.rows[0].id;
    try {
      for await (const columnName of Object.values(req.body.columnNames)) {
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

  res.json([newProjectArray, newColumnArray]);
});

app.put("/project/:id", async (req, res) => {
  console.log("sever put project reached");
  let updatedProject;
  let updatedColumnArray = [];
  let updatedResponseArray = await db.query("UPDATE project SET name = ($1) WHERE id = ($2) RETURNING *", [
    req.body.projectName,
    req.params.id,
  ]);
  updatedProject = updatedResponseArray.rows[0];
  await db.query("DELETE FROM project_column WHERE project_id = ($1)", [req.params.id]);

  for await (const columnName of Object.values(req.body.columnNames)) {
    let newColumnResponse = await db.query(
      "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
      [columnName, req.params.id]
    );
    updatedColumnArray.push(newColumnResponse.rows[0]);
  }

  res.json([updatedProject, updatedColumnArray]);
});

app.delete("/project/:id", async (req, res) => {
  console.log("server delelte project reached");
  const columnResponse = await db.query("DELETE FROM project_column WHERE project_id = ($1)", [req.params.id]);
  const projectResponse = await db.query("DELETE FROM project WHERE id = ($1) RETURNING id", [req.params.id]);

  res.status(200).json(projectResponse.rows[0]);
});

app.get("/task", async (req, res) => {
  console.log("server get task reached");
  let taskArray = (await db.query("SELECT * FROM project_task ORDER BY id ASC")).rows;
  let subtaskArray = (await db.query("SELECT * FROM project_subtask ORDER BY id ASC")).rows;

  res.json([taskArray, subtaskArray]);
});

app.post("/task", async (req, res) => {
  console.log("sever post task reached");
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
      for await (const subtask of Object.values(req.body.subtasks)) {
        let newSubtaskResponse = await db.query(
          "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [subtask.content, subtask.isCompleted, newTaskId, req.body.column_id, req.body.project_id]
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
  console.log("sever put task reached");
  let updatedTaskArray;
  let updatedSubtaskArray = [];
  let updatedResponseArray = await db.query(
    "UPDATE project_task SET title = $1, description = $2, status = $3, column_id = $4, project_id = $5 WHERE id = $6 RETURNING *",
    [req.body.title, req.body.description, req.body.status, req.body.column_id, req.body.project_id, req.params.id]
  );
  updatedTaskArray = updatedResponseArray.rows[0];
  await db.query("DELETE FROM project_subtask WHERE task_id = ($1)", [req.params.id]);

  for await (const subtask of Object.values(req.body.subtasks)) {
    let newSubtaskResponse = await db.query(
      "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [subtask.content, subtask.isCompleted, req.params.id, req.body.column_id, req.body.project_id]
    );
    updatedSubtaskArray.push(newSubtaskResponse.rows[0]);
  }

  res.json([updatedTaskArray, updatedSubtaskArray]);
});

app.delete("/task/:id", async (req, res) => {
  console.log("server delelte task reached");
  const subtaskResponse = await db.query("DELETE FROM project_subtask WHERE task_id = ($1)", [req.params.id]);
  const taskResponse = await db.query("DELETE FROM project_task WHERE id = ($1) RETURNING id", [req.params.id]);

  res.status(200).json(taskResponse.rows[0]);
});

app.put("/detail", async (req, res) => {
  console.log("server put detail reached");
  let updatedSubtaskArray = [];
  let updatedTask;

  for await (const subtask of req.body.subtasks) {
    let subtaskResponse = await db.query("UPDATE project_subtask SET is_completed = $1 WHERE id = $2 RETURNING *", [
      subtask.is_completed,
      subtask.id,
    ]);
    updatedSubtaskArray.push(subtaskResponse.rows[0]);
  }

  let taskResponse = await db.query("UPDATE project_task SET status = $1, column_id = $2 WHERE id = $3 RETURNING *", [
    req.body.status,
    req.body.column_id,
    req.body.task_id,
  ]);
  updatedTask = taskResponse.rows[0];

  res.json([updatedTask, updatedSubtaskArray]);
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
