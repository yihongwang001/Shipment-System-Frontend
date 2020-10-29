import React from 'react';
import { useParams } from 'react-router-dom';

const ShipmentPage = () => {
  let { shipmentId } = useParams();
  return <h1>Shipment of ID: {shipmentId}</h1>;
};

export default ShipmentPage;
