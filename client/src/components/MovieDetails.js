import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import "./MovieDetails.scss";

function MovieDetailsCast(props) {
  const { data } = props;

  return (
    <div className="movie-details-cast">
      {data.profile_path && (
        <img src={data.profile_path_full} alt={`Actor ${data.name}`} />
      )}
      <div className="movie-details-cast-text">
        <h4>{data.name}</h4>
        <h5>{data.character}</h5>
      </div>
    </div>
  );
}

function MovieDetails(props) {
  const { data } = props;
  const [castOpen, setCastOpen] = useState(false);

  return (
    <>
      <Row className="no-gutters">
        <Col xs={12}>
          <div className="movie-details">
            <div className="movie-details-backdrop-image-wrapper">
              <img
                src={data.backdrop_path_full}
                alt={`Movie ${data.title}`}
                className="movie-details-backdrop-image"
              />
            </div>

            <Container fluid className="movie-details-text-container">
              <Row className="mb-4">
                <Col xs={12}>
                  <h1>{data.title}</h1>
                  <h6>
                    <span>{data.release_date.substr(0, 4)}</span>
                    <BsDot />
                    <span>{data.runtime} min</span>
                    <BsDot />
                    <span>
                      {data.vote_count === 0 ? "N/A" : data.vote_average}&nbsp;
                      <FaStar />
                    </span>
                  </h6>
                  <h5>{data.overview}</h5>
                  <h6>
                    Genres:{" "}
                    {data.genres.reduce(
                      (acc, val) => acc.concat(acc ? ", " : "", val.name),
                      ""
                    )}
                  </h6>
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={{ span: 6, offset: 3 }}>
                  <div
                    className={`movie-details-cast-panel${
                      castOpen ? " open" : ""
                    }`}
                  >
                    <h2>Cast</h2>
                    {data.cast_credits.map(cast => (
                      <MovieDetailsCast key={cast.cast_id} data={cast} />
                    ))}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col xs={12} className="d-flex justify-content-center">
                  <Button
                    variant="action"
                    size="lg"
                    onClick={() => setCastOpen(!castOpen)}
                    className="mt-4"
                  >
                    {castOpen ? "View Less" : "View All"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default MovieDetails;
