import express from "express";
import { handleCreate } from "./engine/handlers";

const app = express();

app.post("/create", (req, res) => {
  const { name, description } = req.body;
  const result = handleCreate(name, description);
  res.send(result);
});

app.get("/*", function (req, res) {
  res.send("Hello!");
});

export default app;
