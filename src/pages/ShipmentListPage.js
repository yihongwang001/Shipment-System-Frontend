import React, { useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoggedIn from '../components/LoginContext';
import ShipmentForm from '../components/ShipmentForm';
import SingleShipment from '../components/SingleShipment';
import OldShipment from '../components/OldShipment';
import '../styles/ShipmentListPage.css';

function ShipmentListPage() {
  const [trackings, setTrackings] = useState([]);
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);

  const history = useHistory();
  const getTrackings = async () => {
    let trackings = [];
    try {
      trackings = await fetch('/shipment').then((res) => res.json());
      if (trackings.loggedIn === false) {
        localStorage.setItem(
          'loginInfo',
          JSON.stringify({
            loggedIn: false,
            username: null,
            userId: null,
          })
        );
        if (loggedIn.loggedIn) setLoggedInHelper(false, null, null);
        history.push('/login');
        return;
      } else {
        console.log('got trackings');
      }
    } catch (err) {
      console.log('error occurs ', err);
    }
    setTrackings(trackings);
  };

  useEffect(() => {
    getTrackings();
  }, []); // Only run the first time

  const inactiveTracking = async (id) => {
    let url = '/shipment/' + id;
    let result = await fetch(url, { method: 'PUT' }).then((res) => res.json());
    if (result.success) {
      for (let i = 0; i < trackings.length; i++) {
        if (trackings[i]._id === id) {
          const newTrackings = [...trackings];
          newTrackings[i].active = false;
          setTrackings(newTrackings);
          return;
        }
      }
    } else {
      alert('Something goes wrong.Please try again');
    }
  };

  const deleteTracking = async (id) => {
    let url = '/shipment/' + id;
    let result = await fetch(url, { method: 'DELETE' }).then((res) =>
      res.json()
    );
    if (result.success) {
      for (let i = 0; i < trackings.length; i++) {
        if (trackings[i]._id === id) {
          const newTrackings = [...trackings];
          newTrackings.splice(i, 1);
          setTrackings(newTrackings);
          return;
        }
      }
    } else {
      alert('Something goes wrong.Please try again');
    }
  };

  function addTracking(value) {
    const newTrackings = [value, ...trackings];
    setTrackings(newTrackings);
    alert('One tracking record is added successfully!');
  }

  return (
    <div className="shipment-list">
      <Container>
        <h1 className="greeting">
          Hello, {JSON.parse(localStorage.getItem('loginInfo')).username}
        </h1>
        <Tabs defaultActiveKey="tracking">
          <Tab eventKey="new-tracking" title="New Tracking">
            <ShipmentForm onCreateSuccess={addTracking} />
          </Tab>
          <Tab eventKey="tracking" title="Active Trackings">
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
          <Tab eventKey="history" title="Archived Trackings">
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
    </div>
  );
}

export default ShipmentListPage;
