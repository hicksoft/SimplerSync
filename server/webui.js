import express from 'express';
import path from 'path';
import app from express;

app.use(express.static(path.join(process.env.WEBUI_DIR, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(process.env.WEBUI_DIR, 'index.html'));
});

app.listen(9292);