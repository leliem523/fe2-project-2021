import React from "react";

MediaIcon.propTypes = {};

function MediaIcon() {
  return (
    <>
      <div className="media-icons">
        <a href="#">
          <i className="fab fa-facebook-square" />
        </a>
        <a href="#">
          <i className="fab fa-twitter" />
        </a>
        <a href="#">
          <i className="fab fa-instagram" />
        </a>
        <a href="#">
          <i className="fab fa-youtube" />
        </a>
      </div>
    </>
  );
}

export default MediaIcon;
