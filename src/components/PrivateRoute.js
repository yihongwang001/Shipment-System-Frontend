import { BrowserRouter as Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return authed === true ? (
    <Route>
      <Component {...rest} />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
