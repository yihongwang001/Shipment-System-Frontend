import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ShipmentPage from './pages/ShipmentPage';
import ShipmentListPage from './pages/ShipmentListPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App"></div>
      <NavBar />
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/shipment-list" component={ShipmentListPage} />
          <Route path="/shipment/:shipmentId" component={ShipmentPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
