import React from "react";
import { Link } from "react-router-dom";
import "./DetailCard.scss";

function DetailCard(props) {
  const { image, imageAlt, linkPath, children } = props;

  return (
    <div className="detail-card">
      <Link to={linkPath}>
        <div className="detail-card-overlay" />
        {image && (
          <div className="detail-card-image-wrapper">
            <img src={image} alt={imageAlt} />
          </div>
        )}
        <div className="detail-card-text">{children}</div>
      </Link>
    </div>
  );
}

export default DetailCard;
