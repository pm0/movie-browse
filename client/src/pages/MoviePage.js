import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMovieDetails } from "../store/movies";
import MainPageTemplate from "../pageTemplates/MainPageTemplate";
import MovieDetails from "../components/MovieDetails";

const mapStateToProps = state => {
  return {
    movieDetails: state.movies.movieDetails,
    movieDetailsLoading: state.movies.movieDetailsLoading
  };
};

const mapDispatchToProps = { fetchMovieDetails };

function MoviePage(props) {
  const { movieDetails, movieDetailsLoading, fetchMovieDetails } = props;
  const { id } = props.match.params;

  useEffect(() => {
    fetchMovieDetails({ id });
  }, [fetchMovieDetails, id]);

  const thisMovieDetails = movieDetails[id];

  return (
    <MainPageTemplate className="movie-page">
      {movieDetailsLoading === "pending" || !thisMovieDetails ? (
        "Loading..."
      ) : (
        <MovieDetails data={thisMovieDetails} />
      )}
    </MainPageTemplate>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MoviePage));
