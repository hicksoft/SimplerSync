import express from "express";

const app = express();

app.get("/*", function (req, res) {
  res.send("Hello!");
});

export default app;
