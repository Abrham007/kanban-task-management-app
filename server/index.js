import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import { db } from "./postgre.js";
import projectRoute from "./Routes/projectRoute.js";
import taskRoute from "./Routes/taskRoute.js";

const app = express();
db.connect();

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/project", projectRoute);
app.use("/api/task", taskRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
