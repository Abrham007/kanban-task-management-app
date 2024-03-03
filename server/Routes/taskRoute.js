import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskDetail,
} from "../Controllers/taskController.js";

const router = express.Router();

router.get("/get", getTasks);
router.post("/post", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.put("/detail/:id", updateTaskDetail);

export default router;
