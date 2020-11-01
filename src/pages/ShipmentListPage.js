import React, { useState, useEffect} from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import ShipmentForm from '../components/ShipmentForm';
import SingleShipment from '../components/SingleShipment'
import OldShipment from '../components/OldShipment'


function ShipmentListPage() {
  const [trackings, setTrackings] = useState([]);

  const getTrackings = async () => {
    console.log("getting trackings");
    let trackings = [];
    try {
      trackings = await fetch("/shipment").then((res) => res.json());
      if (trackings.loggedIn === false) {
        localStorage.setItem("loginInfo", JSON.stringify({
          loggedIn: false,
          username: null,
          userId: null,
        }));
        window.location.href = '/login';
        return;
      } else {
        console.log("got trackings", trackings);
      }
      
    } catch (err) {
      console.log("error ", err);
    }
    setTrackings(trackings)
  };

  useEffect(() => {
    getTrackings();
  }, []); // Only run the first time

  const inactiveTracking = async (id) => {
    let url = "/shipment/" + id;
    let result = await fetch(url, {method: 'PUT'}).then((res) => res.json());
    console.log(result);
    if (result.success) {
      for (let i = 0; i < trackings.length; i++) {
        if (trackings[i]._id === id) {
          const newTrackings = [...trackings];
          newTrackings[i].active = false;
          setTrackings(newTrackings);
          return;
        }
      }
    }
    else {
      alert("Something goes wrong.Please try again");
    }
  };
  
  const deleteTracking = async (id) => {
    let url = "/shipment/" + id;
    let result = await fetch(url, {method: 'DELETE'}).then((res) => res.json());
    console.log(result);
    if (result.success) {
      for (let i = 0; i < trackings.length; i++) {
        if (trackings[i]._id === id) {
          const newTrackings = [...trackings];
          newTrackings.splice(i, 1);
          setTrackings(newTrackings);
          return;
        }
      }
    }
    else {
      alert("Something goes wrong.Please try again");
    }
  };

  function addTracking(value) {
    const newTrackings = [value, ...trackings];
    setTrackings(newTrackings);
  };
  return (
    <Container className="shipment-list">
      <h1>Hello, {JSON.parse(localStorage.getItem("loginInfo")).username}</h1>
      <Tabs defaultActiveKey="tracking">
        <Tab eventKey="new-tracking" title="New Tracking">
          <ShipmentForm onCreateSuccess={addTracking}/>
        </Tab>
        <Tab eventKey="tracking" title="Trackings">
          {trackings
            .filter((tracking) => tracking.active)
            .map((tracking) => (
            <SingleShipment 
              key={tracking._id} 
              tracking={tracking} 
              inactiveTracking={inactiveTracking}
              deleteTracking={deleteTracking}
            />
          ))}
        </Tab>
        <Tab eventKey="history" title="History">
          {trackings
            .filter((tracking) => !tracking.active)
            .map((tracking) => (
              <OldShipment 
                key={tracking._id} 
                tracking={tracking} 
                deleteTracking={deleteTracking}
              />
          ))}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default ShipmentListPage;
