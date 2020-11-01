import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoggedIn from './components/LoginContext';
import HomePage from './pages/HomePage';
import ShipmentPage from './pages/ShipmentPage';
import ShipmentListPage from './pages/ShipmentListPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [loggedIn, setLoggedIn] = useState({
    loggedIn: false,
    username: null,
    userId: null,
  });

  const setLoggedInHelper = (loggedIn, username, userId) => {
    const loginObj = {
      loggedIn: loggedIn,
      username: username,
      userId: userId,
    };
    setLoggedIn(loginObj);
  };

  return (
    <LoggedIn.Provider value={{ loggedIn, setLoggedInHelper }}>
      <Router>
        <div className="App"></div>
        <NavBar />
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/shipment-list" component={ShipmentListPage} />
            <Route path="/shipment/:shipmentId" component={ShipmentPage} />
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </LoggedIn.Provider>
  );
}

export default App;
