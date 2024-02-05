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
  console.log("server reached");
  let projectArray = (await db.query("SELECT * FROM project")).rows;
  let columnArray = (await db.query("SELECT * FROM project_column")).rows;

  console.log([projectArray, columnArray]);
  res.json([projectArray, columnArray]);
});

app.post("/project", async (req, res) => {
  console.log("sever reached");
  let newProject;
  let newColumns = [];
  try {
    let newProjectResponse = await db.query("INSERT INTO project (name) VALUES ($1) RETURNING *", [
      req.body.projectName,
    ]);
    newProject = newProjectResponse.rows[0];
    try {
      Object.values(req.body.columnNames).forEach(async (columnName) => {
        let newColumnResponse = await db.query(
          "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
          [columnName, newProject.id]
        );
        newColumns.push(newColumnResponse.rows[0]);
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }

  res.json([newProject, newColumns]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
