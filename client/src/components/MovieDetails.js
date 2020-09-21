import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DetailCardPanel from "./DetailCardPanel";
import DetailCard from "./DetailCard";
import { BsDot } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import "./MovieDetails.scss";

function MovieDetails(props) {
  const { data } = props;

  return (
    <>
      <Row className="no-gutters">
        <Col xs={12}>
          <div className="movie-details">
            {data.backdrop_path && (
              <div className="movie-details-backdrop-image-wrapper">
                <img
                  src={data.backdrop_path_full}
                  alt={`Movie ${data.title}`}
                  className="movie-details-backdrop-image"
                />
              </div>
            )}

            <Container
              fluid
              className={`movie-details-text-container${
                data.backdrop_path ? " backdrop-padding" : ""
              }`}
            >
              <Row>
                <Col xs={12}>
                  <h1>{data.title}</h1>
                  <h6>
                    <span>{data.release_date.substr(0, 4)}</span>
                    {data.runtime ? (
                      <>
                        <BsDot />
                        <span>{data.runtime} min</span>
                      </>
                    ) : null}
                    <BsDot />
                    <span>
                      {data.vote_count === 0 ? "N/A" : data.vote_average}
                      &nbsp;
                      <FaStar className="star-icon" />
                    </span>
                  </h6>
                  {data.overview && <h5>{data.overview}</h5>}
                  {data.genres.length > 0 && (
                    <h6>
                      Genres:{" "}
                      {data.genres.reduce(
                        (acc, val) => acc.concat(acc ? ", " : "", val.name),
                        ""
                      )}
                    </h6>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={12} md={{ span: 6, offset: 3 }}>
                  <DetailCardPanel title="Cast">
                    {data.cast_credits.map(cast => (
                      <DetailCard
                        key={cast.cast_id}
                        image={
                          cast.profile_path ? cast.profile_path_full : null
                        }
                        imageAlt={`Actor ${cast.name}`}
                        linkPath={`/actor/${cast.id}`}
                      >
                        <h4>{cast.name}</h4>
                        <h5>{cast.character}</h5>
                      </DetailCard>
                    ))}
                  </DetailCardPanel>
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
