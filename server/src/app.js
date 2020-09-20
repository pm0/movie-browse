require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../../client/build")));

app.get("/api/movies/trending", async (req, res, next) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}&page=1`
  );
  if (response.status === 200) {
    res.status(200);
    res.send(response.data.results);
  } else {
    console.log(response.status_code);
    console.log(response.status_message);
    res.status(400);
    res.send({ serverError: "Sorry, something went wrong" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
