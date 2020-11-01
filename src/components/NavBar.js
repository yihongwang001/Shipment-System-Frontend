import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoggedIn from '../components/LoginContext';

const NavBar = () => {
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (!loggedIn.loggedIn) {
      history.push('/login');
    } else {
      const response = await fetch('/auth/logout');

      if (response.status === 200) {
        setLoggedInHelper(false, null, null);
        history.push('/');
      } else {
        alert('Failed to log out. Please contact the developer.');
      }
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shipment-list">Shipments</Link>
        </li>
        <li>
          <button onClick={handleClick}>
            {loggedIn.loggedIn ? 'Log Out' : 'Log In'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
