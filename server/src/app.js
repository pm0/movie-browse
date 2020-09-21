require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");
const moment = require("moment");

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

const addAdditionalMovieFields = movie => {
  // Map genre IDs to names, and add full path to poster image URL
  movie.genres = movie.genre_ids.map(genreId => genresMap[genreId]);
  movie.poster_path_full = `${imageConfig.secure_base_url}${imageConfig.poster_sizes[3]}${movie.poster_path}`;
};

app.get("/api/movies/trending", async (req, res, next) => {
  const response = await tmdbApiCall("/trending/movie/week", "page=1");
  if (response.status === 200) {
    response.data.results.forEach(movie => addAdditionalMovieFields(movie));
    res.status(200);
    res.send(response.data.results);
  } else {
    handleApiError(response, res);
  }
});

app.get("/api/movies/popular", async (req, res, next) => {
  const response = await tmdbApiCall("/movie/popular", "page=1");
  if (response.status === 200) {
    response.data.results.forEach(movie => addAdditionalMovieFields(movie));
    res.status(200);
    res.send(response.data.results);
  } else {
    handleApiError(response, res);
  }
});

app.get("/api/movies/getDetailsById/:id", async (req, res, next) => {
  // Get details and cast of movie
  let [detailsResponse, creditsResponse] = await Promise.all([
    tmdbApiCall(`/movie/${req.params.id}`),
    tmdbApiCall(`/movie/${req.params.id}/credits`)
  ]);

  if (detailsResponse.status === 200 && creditsResponse.status === 200) {
    let movie = detailsResponse.data;

    // Add backdrop image URL to data
    movie.backdrop_path_full = `${imageConfig.secure_base_url}${imageConfig.backdrop_sizes[3]}${movie.backdrop_path}`;

    // Add cast credits to data, adding full image URL
    movie.cast_credits = creditsResponse.data.cast.map(cast => ({
      ...cast,
      profile_path_full: `${imageConfig.secure_base_url}${imageConfig.profile_sizes[1]}${cast.profile_path}`
    }));

    res.status(200);
    res.send(movie);
  } else {
    if (detailsResponse.status !== 200) {
      handleApiError(detailsResponse, res);
    }
    if (creditsResponse.status !== 200) {
      handleApiError(creditsResponse, res);
    }
  }
});

app.get("/api/actors/getDetailsById/:id", async (req, res, next) => {
  // Get details and movie roles of actor
  let [detailsResponse, creditsResponse] = await Promise.all([
    tmdbApiCall(`/person/${req.params.id}`),
    tmdbApiCall(`/person/${req.params.id}/movie_credits`)
  ]);

  if (detailsResponse.status === 200 && creditsResponse.status === 200) {
    let actor = detailsResponse.data;

    // Add profile image URL and movie roles to data (sorting by most recent first & putting unknown release dates at end)
    actor.profile_path_full = `${imageConfig.secure_base_url}${imageConfig.profile_sizes[1]}${actor.profile_path}`;
    actor.movie_roles = creditsResponse.data.cast
      .sort((a, b) =>
        !b.release_date
          ? -1
          : moment(b.release_date).diff(moment(a.release_date))
      )
      // Then, add additional field for full poster image URL
      .map(movie => ({
        ...movie,
        poster_path_full: `${imageConfig.secure_base_url}${imageConfig.poster_sizes[1]}${movie.poster_path}`
      }));

    res.status(200);
    res.send(actor);
  } else {
    if (detailsResponse.status !== 200) {
      handleApiError(detailsResponse, res);
    }
    if (creditsResponse.status !== 200) {
      handleApiError(creditsResponse, res);
    }
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
