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
  let updatedProjectArray;
  let updatedColumnArray = [];
  let updatedResponseArray = await db.query("UPDATE project SET name = ($1) WHERE id = ($2) RETURNING *", [
    req.body.projectName,
    req.params.id,
  ]);
  updatedProjectArray = updatedResponseArray.rows;
  await db.query("DELETE FROM project_column WHERE project_id = ($1)", [req.params.id]);

  for await (const columnName of Object.values(req.body.columnNames)) {
    let newColumnResponse = await db.query(
      "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
      [columnName, req.params.id]
    );
    updatedColumnArray.push(newColumnResponse.rows[0]);
  }

  res.json([updatedProjectArray, updatedColumnArray]);
});

app.delete("/project/:id", async (req, res) => {
  console.log("server delelte reached");
  const columnResponse = await db.query("DELETE FROM project_column WHERE project_id = ($1)", [req.params.id]);
  const projectResponse = await db.query("DELETE FROM project WHERE id = ($1) RETURNING id", [req.params.id]);

  res.status(200).json(projectResponse.rows);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
