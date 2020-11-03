import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import delivery from '../shipment.png';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <Container fluid className="homepage-container">
      <Container className="slogan-container px-2 pt-5">
        <Row className="pt-5 mt-5">
          <Col xs={8}>
            <h1>Welcome to ShipCare</h1>
            <h1>Onestop delivery solution</h1>
          </Col>
          <Col xs={4}>
            <img
              src={delivery}
              alt="shipment delivery tracking"
              className="float-right"
            ></img>
          </Col>
        </Row>
        <br />
      </Container>
      <Container className="paragraph-container px-2 pb-5">
        <Row>
          <Col xs={7}>
            <h4>
              We make it simple to keep track of your deliveries. We provide the
              latest update for every package. It is safe to let ShipCare take
              care of your shipments.
            </h4>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
