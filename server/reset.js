import { db } from "./postgre.js";
import { readFile } from "fs/promises";

db.connect();

async function deleteEverything() {
  try {
    await db.query("DELETE FROM project_subtask");
    await db.query("DELETE FROM project_task");
    await db.query("DELETE FROM project_column");
    await db.query("DELETE FROM project");
    console.log("Successfully deleted everything");
  } catch (error) {
    console.log(`Error deleting everything ${error.message}`);
  }
}

async function reset() {
  console.log("Started deleting");
  await deleteEverything();
  const data = JSON.parse(
    await readFile(new URL("../data.json", import.meta.url))
  );
  await db.query(
    "CREATE TABLE IF NOT EXISTS project (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL); CREATE TABLE IF NOT EXISTS project_column (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE); CREATE TABLE IF NOT EXISTS project_task (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, status VARCHAR(50), column_id INTEGER NOT NULL REFERENCES project_column(id) ON DELETE CASCADE, project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE); CREATE TABLE IF NOT EXISTS project_subtask (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, is_completed BOOLEAN NOT NULL DEFAULT FALSE, task_id INTEGER NOT NULL REFERENCES project_task(id) ON DELETE CASCADE, column_id INTEGER NOT NULL REFERENCES project_column(id) ON DELETE CASCADE, project_id INTEGER NOT NULL REFERENCES project(id) ON DELETE CASCADE);"
  );

  data.boards.forEach(async (board) => {
    let newProjectId;
    let newColumnId;
    let newTaskId;
    let newSubtaskId;
    console.log(`Started creating board ${board.name}`);
    try {
      let newProjectResponse = await db.query(
        "INSERT INTO project (name) VALUES ($1) RETURNING *",
        [board.name]
      );
      newProjectId = newProjectResponse.rows[0].id;

      console.log(`Finished creating board ${newProjectId}`);
    } catch (error) {
      console.log(`Error with creating project ${error.message}`);
    }

    for await (const column of board.columns) {
      try {
        let newColumnResponse = await db.query(
          "INSERT INTO project_column (name, project_id) VALUES ($1, $2) RETURNING *",
          [column.name, newProjectId]
        );
        newColumnId = newColumnResponse.rows[0].id;
        console.log(`Finished creating column ${newColumnId}`);
      } catch (error) {
        console.log(`Error with creating column ${error.message}`);
      }

      for await (const task of column.tasks) {
        try {
          let newTaskResponse = await db.query(
            "INSERT INTO project_task (title, description, status, column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
              task.title,
              task.description,
              task.status,
              newColumnId,
              newProjectId,
            ]
          );
          newTaskId = newTaskResponse.rows[0].id;
          console.log(`Finished creating task ${newTaskId}`);
        } catch (error) {
          console.log(`Error with creating task ${error.message}`);
        }

        for await (const subtask of task.subtasks) {
          try {
            let newSubtaskResponse = await db.query(
              "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
              [
                subtask.title,
                subtask.isCompleted,
                newTaskId,
                newColumnId,
                newProjectId,
              ]
            );
            newSubtaskId = newSubtaskResponse.rows[0].id;
            console.log(`Finished creating column ${newSubtaskId}`);
          } catch (error) {
            console.log(`Error with creating subtask ${error.message}`);
          }
        }
      }
    }
    console.log(`Finished creating board ${board.name}`);
  });
}

await reset();
