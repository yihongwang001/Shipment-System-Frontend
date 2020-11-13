import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import LoggedIn from '../components/LoginContext';
import { useContext } from 'react';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  // eslint-disable-next-line no-unused-vars
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);

  if (authed === true) {
    return (
      <Route>
        <Component {...rest} />
      </Route>
    );
  } else {
    setLoggedInHelper(false, null, null, 'Please login firstly');
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
