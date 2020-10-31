import React, { useState } from 'react';
import { DropdownButton, Dropdown, Button, Form, Col } from 'react-bootstrap';

// this form component is used to create a new tracking record 
const ShipmentForm = (props) => {
    const [carrier, setCarrier] = useState("");
    const [trackingNum, setTrackingNum] = useState("");
    const [comment, setComment] = useState("");
    const [orderURL, setOrderURL] = useState("#");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: 1,
                tracking_num: trackingNum,
                carrier: carrier,
                comment: comment,
                order_url: orderURL,
            }), 
        });
        // the display tracking summary function
        props.getShipments();

        console.log(response);
    }

    // return (
    //     <Form>
    //     <DropdownButton 
    //         id="dropdown-warning-button" 
    //         title="Select Carrier" 
    //         size="sm"
    //         onSelect={(e)=>setCarrier(e.toLowerCase())}
    //     >
    //         <Dropdown.Item>UPS</Dropdown.Item>
    //         <Dropdown.Item>FedEx</Dropdown.Item>
    //         <Dropdown.Item>USPS</Dropdown.Item>
    //     </DropdownButton>
    //     <input 
    //         type="text" 
    //         className="input" 
    //         value={trackingNum} 
    //         required
    //         placeholder="Tracking Number..."
    //         onChange={e => setTrackingNum(e.target.value)}
    //     />
    //     <input 
    //         type="text" 
    //         className="input" 
    //         required
    //         value={comment} 
    //         placeholder="Add a remark for your reference"
    //         onChange={e => setComment(e.target.value)}
    //     />
    //     <input 
    //         type="text" 
    //         className="input" 
    //         value={orderURL} 
    //         placeholder="(Optional)Past the order URL here"
    //         onChange={e => setOrderURL(e.target.value)}
    //     />
    //     <br/>
    //     <Button
    //         type="submit"
    //         variant="outline-dark"
    //         size="sm"
    //         onClick={handleSubmit}
    //     >
    //         Create
    //     </Button>
    //     </Form>
    // );

    return(
        <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridCarrier">
            <Form.Label>Carrier</Form.Label>
            <Form.Control as="select" defaultValue="UPS">
                <option>UPS</option>
                <option>USPS</option>
                <option>FedEx</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTrackingNum">
            <Form.Label>Carrier Tracking Num</Form.Label>
            <Form.Control type="text" placeholder="Enter Tracking Number..." />
            </Form.Group>

        </Form.Row>

        <Form.Group controlId="formGridComment">
            <Form.Label>Commment</Form.Label>
            <Form.Control placeholder="Add your remark... e.g seller/item purchased" />
        </Form.Group>

        <Form.Group controlId="formGridOrderURL">
            <Form.Label>Order URL</Form.Label>
            <Form.Control placeholder="(Optional) Paste the order's link..." />
        </Form.Group>

        <Button variant="primary" type="submit">
            Add Tracking
        </Button>
        </Form>
    );
}

// ShipmentForm.propTypes = {
//     getShipments: PropTypes.func.isRequired,
// };

export default ShipmentForm;