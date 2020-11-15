/*eslint-disable no-unused-vars*/
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
/*eslint-enable no-unused-vars*/
import delivery from '../shipment.png';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <Container fluid className="homepage-container">
      <Container className="slogan-container px-2 pt-5">
        <Row className="pt-5 mt-5">
          <Col xs={6} className="mx-2">
            <h1>Welcome to ShipCare</h1>
            <h1>Onestop delivery solution</h1>
            <h4>
              We make it simple to keep track of your deliveries. We provide the
              latest update for every package. It is safe to let ShipCare take
              care of your shipments.
            </h4>
          </Col>
          <Col xs={5} className="mx-2">
            <img
              src={delivery}
              alt="shipment delivery tracking"
              className="float-right img-fluid"
            ></img>
          </Col>
        </Row>
        <br />
      </Container>
    </Container>
  );
};

export default HomePage;
