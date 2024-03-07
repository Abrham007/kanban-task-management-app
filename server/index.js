import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import { db } from "./postgre.js";
import projectRoute from "./Routes/projectRoute.js";
import taskRoute from "./Routes/taskRoute.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
db.connect();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/project", projectRoute);
app.use("/api/task", taskRoute);

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
