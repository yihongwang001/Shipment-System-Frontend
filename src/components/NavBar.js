import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import LoggedIn from '../components/LoginContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (!loggedIn) {
      history.push('/login');
    } else {
      const response = await fetch('/auth/logout');

      if (response.status === 200) {
        setLoggedInHelper(false);
        history.push('/');
      } else {
        alert('Failed to log out. Please contact the developer.');
      }
    }
  };

  return (
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li>
    //       <Link to="/shipment-list">Shipments</Link>
    //     </li>
    //     <li>
    //       <button onClick={handleClick}>
    //         {loggedIn ? 'Log Out' : 'Log In'}
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
    <Nav activeKey="/">
      <Nav.Item as="li">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="/shipment-list">My Shipments</Nav.Link>
      </Nav.Item>
      {/* <Nav.Item as="button">
        <Nav.Link onSelect={handleClick}>
          {loggedIn.loggedIn ? 'Log Out' : 'Log In'}
        </Nav.Link>
      </Nav.Item> */}
      <Button variant="primary" onClick={handleClick}>
        {loggedIn.loggedIn ? 'Log Out' : 'Log In'}
      </Button>
    </Nav>
  );
};

export default NavBar;
