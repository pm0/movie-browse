import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./DetailCardPanel.scss";

function DetailCardPanel(props) {
  const { title, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`detail-card-panel${open ? " open" : ""}`}>
        <h3>{title}</h3>
        {children}
      </div>

      <div className="detail-card-panel-button-wrapper">
        <Button
          variant="action"
          size="lg"
          onClick={() => setOpen(!open)}
          className=""
        >
          {open ? "View Less" : "View All"}
        </Button>
      </div>
    </>
  );
}

export default DetailCardPanel;
