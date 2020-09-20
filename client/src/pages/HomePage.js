import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTrendingMovies } from "../store/movies";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import MainPageTemplate from "../pageTemplates/MainPageTemplate";
import MovieCard from "../components/MovieCard";

const mapStateToProps = state => {
  return {
    trendingMovies: state.movies.trendingMovies,
    trendingMoviesLoading: state.movies.trendingMoviesLoading
  };
};

const mapDispatchToProps = { fetchTrendingMovies };

function HomePage(props) {
  const { trendingMovies, trendingMoviesLoading, fetchTrendingMovies } = props;

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  return (
    <MainPageTemplate className="home-page">
      <Jumbotron className="text-center">
        <div className="mb-5">
          <h1>
            <b>MovieBrowse</b> - the database of movies across cinema history.
          </h1>
          <h2>
            Search below, or check out the latest trending and popular movies.
          </h2>
        </div>
        <Container>
          <Row>
            <Col xs={12} lg={{ span: 6, offset: 3 }}>
              <InputGroup>
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Search movies"
                />
                <InputGroup.Append>
                  <Button size="lg" variant="action">
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Row>
        <Col xs={12} lg={{ span: 10, offset: 1 }}>
          <h2>Trending Movies</h2>
          <Row>
            {trendingMovies.map(movie => (
              <MovieCard key={movie.id} data={movie} />
            ))}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={{ span: 10, offset: 1 }}>
          <h2>Popular Movies</h2>
        </Col>
      </Row>
    </MainPageTemplate>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
