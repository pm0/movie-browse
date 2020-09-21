import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchActorDetails } from "../store/actors";
import MainPageTemplate from "../pageTemplates/MainPageTemplate";
import ActorDetails from "../components/ActorDetails";

const mapStateToProps = state => {
  return {
    actorDetails: state.actors.actorDetails,
    actorDetailsLoading: state.actors.actorDetailsLoading
  };
};

const mapDispatchToProps = { fetchActorDetails };

function ActorPage(props) {
  const { actorDetails, actorDetailsLoading, fetchActorDetails } = props;
  const { id } = props.match.params;

  useEffect(() => {
    fetchActorDetails({ id });
  }, [fetchActorDetails, id]);

  const thisActorDetails = actorDetails[id];

  return (
    <MainPageTemplate className="actor-page">
      {actorDetailsLoading === "pending" || !thisActorDetails ? (
        "Loading..."
      ) : (
        <ActorDetails data={thisActorDetails} />
      )}
    </MainPageTemplate>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActorPage));
