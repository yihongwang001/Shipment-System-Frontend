import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';


const SingleShipment = (props) => {
    const tracking = props.tracking;
    const inactiveTracking = props.inactiveTracking;
    const deleteTracking = props.deleteTracking;
    return (
      <Container>
          <Row className="basic-info">
            <Col>
                <a href={tracking.order_url} target="_blank">{tracking.comment}</a> 
            </Col>
            <Col>
                {tracking.carrier} {tracking.tracking_num}
            </Col>
            <Col>
                {tracking.status}
            </Col>
            <Col>
                {tracking.carrier_status_desc}
            </Col>
            
            <div className="action">
                <Button variant="outline-success" size="sm" onClick={() => inactiveTracking(tracking._id)}>Done</Button>
                <Button variant="outline-danger" size="sm" onClick={() => deleteTracking(tracking._id)}>Remove</Button>
            </div>
          </Row>
      </Container>
    );
  }

  export default SingleShipment;