import React from "react";
import imgAQuietPlace from "../images/a-quiet-place.jpg";
import imgMortalKombat from "../images/mortal-kombat.jpg";
import imgNobody from "../images/nobody.jpg";
import imgRaYaTheLastDragon from "../images/ra-ya-the-last-dragon.jpg";
import imgTheBanishing from "../images/the-banishing.jpg";
import imgTheUnholy from "../images/the-unholy.jpg";
import imgTheVirtuoso from "../images/the-virtuoso.jpg";
import imgWrathOfMan from "../images/wrath-of-man.jpg";
import { Row, Col } from "antd";

const FilmItem = () => {
  return (
    <>
      <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
        <Col span={6}>
          <div className="film-data">
            <img src={imgAQuietPlace} alt="" />
            <div className="film-content">
              <h4 className="film-title">A Quiet Place</h4>
              <h4>Nation: U.S</h4>
              <h4>Release year: 2020</h4>
              <h4>Genre: action, horror</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgMortalKombat} alt="" />
            <div className="film-content">
              <h4 className="film-title">Mortal Kombat</h4>
              <h4>Nation: American, Australia</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: action, fantasy</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgNobody} alt="" />
            <div className="film-content">
              <h4 className="film-title">Nobody</h4>
              <h4>Nation: American</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: action, criminal</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgRaYaTheLastDragon} alt="" />
            <div className="film-content">
              <h4 className="film-title">Ra-ya: The Last Dragon</h4>
              <h4>Nation: American</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: action, cartoon</h4>
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="film-data">
            <img src={imgTheBanishing} alt="" />
            <div className="film-content">
              <h4 className="film-title">The Banishing</h4>
              <h4>Nation: Europe</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: horror</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgTheUnholy} alt="" />
            <div className="film-content">
              <h4 className="film-title">The Unholy</h4>
              <h4>Nation: U.S</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: action, horror</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgTheVirtuoso} alt="" />
            <div className="film-content">
              <h4 className="film-title">The Virtuoso</h4>
              <h4>Nation: U.S</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: drama, action</h4>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="film-data">
            <img src={imgWrathOfMan} alt="" />
            <div className="film-content">
              <h4 className="film-title">Wrath Of Man</h4>
              <h4>Nation: U.S, U.K</h4>
              <h4>Release year: 2021</h4>
              <h4>Genre: thriller, action</h4>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FilmItem;
