import React from "react";
import FilmItem from "./FilmItem";
import { Col } from "antd";

FilmBox.propTypes = {};

function FilmBox() {
  return (
    <div className="film-box">
      {/* Component FilmItem */}
      <FilmItem />
    </div>
  );
}

export default FilmBox;
