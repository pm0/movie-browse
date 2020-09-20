require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../../client/build")));

const TMDB_API = "https://api.themoviedb.org/3";
const tmdbApiCall = async (path, queryParams) =>
  await axios.get(
    `${TMDB_API}${path}?api_key=${process.env.TMDB_API_KEY}&${queryParams}`
  );

let imageConfig = {};
let genresMap = [];

const handleApiError = res => {
  console.log(response.status_code);
  console.log(response.status_message);
  res.status(400);
  res.send({ serverError: "Sorry, something went wrong" });
};

const addAdditionalMovieFields = movies => {
  // Map genre IDs to names, and add full path to poster image URL
  movies.forEach(movie => {
    movie.genres = movie.genre_ids.map(genreId => genresMap[genreId]);
    movie.poster_path_full = `${imageConfig.secure_base_url}${imageConfig.poster_sizes[3]}${movie.poster_path}`;
  });
};

app.get("/api/movies/trending", async (req, res, next) => {
  const response = await tmdbApiCall("/trending/movie/week", "page=1");
  if (response.status === 200) {
    addAdditionalMovieFields(response.data.results);
    res.status(200);
    res.send(response.data.results);
  } else {
    handleApiError(res);
  }
});

app.get("/api/movies/popular", async (req, res, next) => {
  const response = await tmdbApiCall("/movie/popular", "page=1");
  if (response.status === 200) {
    addAdditionalMovieFields(response.data.results);
    res.status(200);
    res.send(response.data.results);
  } else {
    handleApiError(res);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(port, async () => {
  // Fetch TMDB configuration data and genres list
  let [configResponse, genresResponse] = await Promise.all([
    tmdbApiCall("/configuration"),
    tmdbApiCall("/genre/movie/list")
  ]);

  if (configResponse.status === 200 && genresResponse.status === 200) {
    imageConfig = configResponse.data.images;

    // Create key-value mapping of genre IDs to genre names
    genresMap = genresResponse.data.genres.reduce((acc, val) => {
      acc[val.id] = val.name;
      return acc;
    }, {});
  } else {
    if (configResponse.status !== 200) {
      console.log("Error fetching TMDB configuration:");
      console.log(configResponse.status_message);
    }
    if (genresResponse.status !== 200) {
      console.log("Error fetching TMDB genres list:");
      console.log(genresResponse.status_message);
    }
  }

  console.log(`App listening on port ${port}`);
});
