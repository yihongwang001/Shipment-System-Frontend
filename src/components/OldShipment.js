import { Container, Row, Col, Button } from 'react-bootstrap';

const OldShipment = (props) => {
    
    const tracking = props.tracking;
    const deleteTracking = props.deleteTracking;
    const statusMap = {
        "AC":"Accepted", 
        "IT": "In Transit", 
        "DE": "Delivered", 
        "EX": "Exception",
        "UN": "Unknown",
        "AT": "Delivery Attempt",
        "NY": "Not Yet In System"
    };

    let comment;
    if (tracking.order_url) {
        comment = <a href={tracking.order_url} target="_blank" rel="noreferrer">{tracking.comment}</a>;
    } else {
        comment = tracking.comment;
    }

    return (
      <Container>
          <Row className="single-record">
            <Col lg={2} className="comment">
                {comment}
            </Col>
            <Col lg={2} className="traking-num">
                {tracking.carrier} {tracking.tracking_num}
            </Col>
            <Col lg={2} className="traking-status">
                {statusMap[tracking.status]}
            </Col>
            <Col lg={4} className="tracking-desc">
                {tracking.carrier_status_desc}
            </Col>
            <Col lg={2} className="action">
                <Button variant="outline-danger" size="sm" onClick={() => deleteTracking(tracking._id)}>Remove</Button>
            </Col>
          </Row>
      </Container>
    );
}

export default OldShipment;
