import React from 'react';
import Particles from 'react-particles-js';
import '../Styles/Footer.css';
import { Row, Col } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <div className="footer-dark">
            <div className="container footerContent">
                <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
                    <Col className='item' span={6}>
                        <a href="#"><img className="logo" src="https://www.designmantic.com/blog/wp-content/uploads/2016/07/Netflix-Revamps-Logo.jpg"></img></a>
                    </Col>
                    <Col className='item text' span={6}>
                        <h3>Company Name</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. </p>
                    </Col>
                    <Col className='item' span={6}>
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Web design</a></li>
                            <li><a href="#">Development</a></li>
                            <li><a href="#">Hosting</a></li>
                        </ul>
                    </Col>
                    <Col className='item' span={6}>
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Team</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </Col>
                    <Col className='item social' span={24}>
                        <a href="#"><i className="fab fa-facebook"></i></a><a href="#"><i className="fab fa-twitter"></i></a><a href="#"><i className="fab fa-snapchat-ghost"></i></a><a href="#"><i className="fab fa-instagram"></i></a>
                    </Col>
                </Row>
                <p className="copyright">Ho Si Hung's Project © 2021</p>
            </div>
            <div id="particles_js">
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 120
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />
            </div>
        </div>
    );
}
export default Footer;
