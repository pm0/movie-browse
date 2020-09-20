import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaStar } from "react-icons/fa";
import "./MovieCard.scss";

function MovieCard(props) {
  const { data } = props;

  return (
    <Col xs={6} md={4} lg={3} xl={2} className="movie-card-col">
      <OverlayTrigger
        placement="auto"
        delay={{ show: 50, hide: 300 }}
        overlay={
          <Tooltip className="movie-card-tooltip">
            <h5>{data.title}</h5>
            <div className="d-flex justify-content-between">
              <div className="movie-card-release-date">
                {data.release_date.substr(0, 4)}
              </div>
              <div className="movie-card-vote-average">
                {data.vote_average}&nbsp;
                <FaStar />
              </div>
            </div>
            <div className="movie-card-overview">{data.overview}</div>
            <div className="movie-card-genres">
              Genres: {data.genres.join(", ")}
            </div>
          </Tooltip>
        }
      >
        <Card className="movie-card">
          <Card.Img variant="top" src={data.poster_path_full} />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text as="div" className="d-flex justify-content-between">
              <div className="movie-card-release-date">
                {data.release_date.substr(0, 4)}
              </div>
              <div className="movie-card-vote-average">
                {data.vote_average}&nbsp;
                <FaStar />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </OverlayTrigger>
    </Col>
  );
}

export default MovieCard;
