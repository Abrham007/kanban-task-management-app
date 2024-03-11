import { db } from "./postgre.js";
import data from "../data.json" assert { type: "json" };

db.connect();

async function reset() {
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
