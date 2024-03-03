import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../Controllers/projectController.js";

const router = express.Router();

router.get("/get", getProjects);
router.post("/post", createProject);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

export default router;
