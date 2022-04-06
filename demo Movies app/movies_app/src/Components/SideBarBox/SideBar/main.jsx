import React from "react";
import "./style.css";
import Sort from "./Sort";
import Filters from "./Filters";
import WhereToWatch from "./WhereToWatch";
import MediaIcon from "./MediaIcon";
import FilmBox from "./FilmBox";
import { Row, Col } from "antd";

SideBar.propTypes = {};

function SideBar() {
  return (
    <Row
      className="box-side-bar"
      gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}
    >
      <Col span={6}>
        <div className="box-side-bar-flex">
          <div className="side-bar">
            <div className="title">
              <div className="logo">Popular Movies</div>
            </div>
            <ul>
              {/* Component Sort */}
              <Sort />

              {/* Component Filters */}
              <Filters />

              {/* Component WhereToWatch */}
              <WhereToWatch />
            </ul>

            {/* Component MediaIcon */}
            <MediaIcon />

            {/* Button Search */}
            <div className="submit">
              <input type="submit" value="Search" className="btn-submit" />
            </div>
          </div>
        </div>
      </Col>

      {/* Component FilmBox */}
      <Col span={18}>
        <FilmBox />
      </Col>
    </Row>
  );
}

export default SideBar;
