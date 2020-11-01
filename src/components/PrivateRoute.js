import { BrowserRouter as Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, authed, ...rest}) => {
    console.log(authed);
    return (
    authed === true ? 
    <Component {...rest} /> : <Redirect to='/login' />
    );
}

export default PrivateRoute