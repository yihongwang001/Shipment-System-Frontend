import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import LoggedIn from '../components/LoginContext';
import { useContext } from 'react';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const { setLoggedInHelper } = useContext(LoggedIn);

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
