import { Button } from 'react-bootstrap';


const OldShipment = (props) => {
    const tracking = props.tracking;
    const inactiveTracking = props.inactiveTracking;
    const deleteTracking = props.deleteTracking;
    return (
      <div className="tracking container">
        <div className="basic-info">
          {tracking.comment} 
          {tracking.carrier} 
          {tracking.tracking_num}
        </div>
        <div className="opt-info">{tracking.order_url}</div>
        <div className="api-info">
          {tracking.status}
          {tracking.carrier_status_desc}
        </div>
      </div>
    );
  }

  export default OldShipment;