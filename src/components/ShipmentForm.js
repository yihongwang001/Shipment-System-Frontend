import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';

// this form component is used to create a new tracking record
const ShipmentForm = (props) => {
  const [carrier, setCarrier] = useState('select carrier');
  const [trackingNum, setTrackingNum] = useState('');
  const [comment, setComment] = useState('');
  const [orderURL, setOrderURL] = useState('');

  const addTracking = async () => {
    console.log(carrier);
    if (trackingNum === '') {
      alert('Please provide the tracking number');
      return;
    }
    if (comment === '') {
      alert('Please input your comment');
      return;
    }
    if (carrier === 'select carrier') {
      console.log('entered');
      alert('Please select one carrier');
      return;
    }
    const results = await fetch('/shipment/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracking_num: trackingNum,
        carrier: carrier,
        comment: comment,
        order_url: orderURL,
      }),
    }).then((res) => res.json());

    if (results) {
      const result = results[0];
      props.onCreateSuccess(result);
      setCarrier('select carrier');
      setTrackingNum('');
      setComment('');
      setOrderURL('');
    } else {
      alert('Something went wrong.');
    }
  };

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCarrier">
          <Form.Label>Carrier</Form.Label>
          <Form.Control
            as="select"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            <option value="select carrier">select carrier</option>
            <option value="ups">UPS</option>
            <option value="usps">USPS</option>
            <option value="fedex">FedEx</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTrackingNum">
          <Form.Label>Carrier Tracking Num</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tracking Number..."
            value={trackingNum}
            onChange={(e) => setTrackingNum(e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridComment">
        <Form.Label>Commment</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add your remark... e.g. seller/item purchased"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGridOrderURL">
        <Form.Label>Order URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="(Optional) e.g. https://www.nike.com/orders"
          value={orderURL}
          onChange={(e) => setOrderURL(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => addTracking()}>
        Add Tracking
      </Button>
    </Form>
  );
};

export default ShipmentForm;
