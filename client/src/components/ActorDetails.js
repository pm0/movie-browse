import React from "react";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DetailCardPanel from "./DetailCardPanel";
import DetailCard from "./DetailCard";

function ActorDetails(props) {
  const { data } = props;

  return (
    <>
      <Row className="actor-details-header mt-5">
        <Col
          xs={12}
          md={{ span: 8, offset: 2 }}
          className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-end"
        >
          {data.profile_path && (
            <img
              src={data.profile_path_full}
              alt={`Actor ${data.name}`}
              className="mr-4 mb-4 mb-md-0"
            />
          )}
          <div>
            <h1>{data.name}</h1>
            {data.birthday && (
              <h5>
                Born{" "}
                {moment(data.birthday, "YYYY-MM-DD").format("Do MMMM YYYY")}
                {data.place_of_birth && ` in ${data.place_of_birth}`}
              </h5>
            )}
            {data.deathday && (
              <h5>
                Died{" "}
                {moment(data.deathday, "YYYY-MM-DD").format("Do MMMM YYYY")}
              </h5>
            )}
          </div>
        </Col>
      </Row>

      {data.biography && (
        <Row className="actor-details-bio mt-4">
          <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
            <h3>Biography</h3>
            <div>{data.biography}</div>
          </Col>
        </Row>
      )}

      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <DetailCardPanel title="Roles">
            {data.movie_roles.map(movie => (
              <DetailCard
                key={movie.id}
                image={movie.poster_path ? movie.poster_path_full : null}
                imageAlt={`Movie ${movie.title}`}
                linkPath={`/movie/${movie.id}`}
              >
                <h4>{movie.title}</h4>
                <h6>
                  Release date:{" "}
                  {movie.release_date
                    ? moment(movie.release_date, "YYYY-MM-DD").format(
                        "Do MMMM YYYY"
                      )
                    : "Unknown"}
                </h6>
                <h6>Character: {movie.character}</h6>
              </DetailCard>
            ))}
          </DetailCardPanel>
        </Col>
      </Row>
    </>
  );
}

export default ActorDetails;
