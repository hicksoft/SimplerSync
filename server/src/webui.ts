import express from "express";
import path from "path";

const app = express();

app.use(express.static("/webui"));

app.get("/*", function (req, res) {
  res.sendFile(path.join("/webui", "index.html"));
});

export default app;
