import { db } from "../postgre.js";

export async function getTasks(req, res) {
  try {
    let taskArray = (
      await db.query("SELECT * FROM project_task ORDER BY id ASC")
    ).rows;
    let subtaskArray = (
      await db.query("SELECT * FROM project_subtask ORDER BY id ASC")
    ).rows;

    res.status(200).send([taskArray, subtaskArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function createTask(req, res) {
  try {
    let newTaskArray;
    let newSubtaskArray = [];
    let newTaskResponse = await db.query(
      "INSERT INTO project_task (title, description, status, column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        req.body.title,
        req.body.description,
        req.body.status,
        req.body.column_id,
        req.body.project_id,
      ]
    );
    newTaskArray = newTaskResponse.rows;
    let newTaskId = newTaskResponse.rows[0].id;

    if (req.body.substasks !== 0) {
      for await (const subtask of req.body.subtasks) {
        let newSubtaskResponse = await db.query(
          "INSERT INTO project_subtask (title, is_completed, task_id , column_id, project_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [
            subtask.title,
            subtask.is_completed,
            newTaskId,
            req.body.column_id,
            req.body.project_id,
          ]
        );
        newSubtaskArray.push(newSubtaskResponse.rows[0]);
      }
    }

    res.status(200).send([newTaskArray, newSubtaskArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateTask(req, res) {
  try {
    let updatedTaskArray;
    let updatedSubtaskArray = [];
    let updatedResponseArray = await db.query(
      "UPDATE project_task SET title = $1, description = $2, status = $3, column_id = $4, project_id = $5 WHERE id = $6 RETURNING *",
      [
        req.body.title,
        req.body.description,
        req.body.status,
        req.body.column_id,
        req.body.project_id,
        req.params.id,
      ]
    );
    updatedTaskArray = updatedResponseArray.rows[0];

    let sourceSubtaskList = (
      await db.query("SELECT * FROM project_subtask WHERE task_id = $1", [
        req.params.id,
      ])
    ).rows;
    let sourceSubtaskIds = sourceSubtaskList.map((substask) => substask.id);
    let currentSubtaskList = req.body.subtasks;
    let currentSubtaskIds = currentSubtaskList.map((substask) => substask.id);

    for await (const sourceSubtaskId of sourceSubtaskIds) {
      if (!currentSubtaskIds.includes(sourceSubtaskId)) {
        await db.query("DELETE FROM project_subtask WHERE id = $1", [
          sourceSubtaskId,
        ]);
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
          [
            subtask.title,
            subtask.is_completed,
            req.params.id,
            req.body.column_id,
            req.body.project_id,
          ]
        );
        updatedSubtaskArray.push(newSubtaskResponse.rows[0]);
      }
    }

    res.status(200).send([updatedTaskArray, updatedSubtaskArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteTask(req, res) {
  try {
    await db.query("DELETE FROM project_subtask WHERE task_id = ($1)", [
      req.params.id,
    ]);
    const taskResponse = await db.query(
      "DELETE FROM project_task WHERE id = ($1) RETURNING id",
      [req.params.id]
    );

    res.status(200).send(taskResponse.rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateTaskDetail(req, res) {
  try {
    let updatedSubtaskArray = [];
    const taskResponse = await db.query(
      "UPDATE project_task SET status = $1, column_id = $2 WHERE id = $3 RETURNING *",
      [req.body.status, req.body.column_id, req.params.id]
    );
    let updatedTask = taskResponse.rows[0];
    if (req.body.substasks !== 0) {
      for await (let subtask of req.body.subtasks) {
        const subtaskResponse = await db.query(
          "UPDATE project_subtask SET is_completed = $1, column_id = $2 WHERE id = $3 RETURNING *",
          [subtask.is_completed, subtask.column_id, subtask.id]
        );
        updatedSubtaskArray.push(subtaskResponse.rows[0]);
      }
    }

    res.status(200).send([updatedTask, updatedSubtaskArray]);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
