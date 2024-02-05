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
  let projectArray = (await db.query("SELECT * FROM project")).rows;
  let columnArray = (await db.query("SELECT * FROM project_column")).rows;

  console.log([projectArray, columnArray]);
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

app.delete("/project", async (req, res) => {
  console.log("server delelte reached");

  const projectResponse = await db.query("DELETE FROM project WHERE id = $1", [req.body.id]);
  const columnResponse = await db.query("DELETE FROM project_column WHERE project_id = $1", [req.body.id]);

  res.status(200).json([]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
