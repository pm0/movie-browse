require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../../client/build")));

app.get("/api/test", (req, res) => {
  res.status(200);
  res.send("ok");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
