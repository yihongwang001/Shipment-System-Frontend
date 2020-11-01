import React from 'react';
import { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoggedIn from '../components/LoginContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bodyObject = {
      email: email,
      password: password,
    };
    const formBody = Object.keys(bodyObject)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(bodyObject[key])
      )
      .join('&');

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'appliction/json',
      },
      redirect: 'follow',
      body: formBody,
    });

    const responseJson = await response.json();

    console.log(response.status);
    console.log(responseJson);

    if (response.status === 200) {
      setLoggedInHelper(true, responseJson.username, responseJson.userId);
    }
  };

  if (loggedIn.loggedIn) {
    return <Redirect to="/shipment-list"></Redirect>;
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8 p-2 m-5">
            <Form onSubmit={handleSubmit} className="border p-5 shadow rounded">
              <h4 className="mb-4 text-center">Sign In</h4>
              <Form.Group controlId="login-form-email-group">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="login-form-pwd-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </Form.Group>

              <p className="p-4 text-center">
                Not a member?
                <Link to="/register">Register</Link>
              </p>

              <Button
                variant="primary"
                type="submit"
                className="btn btn-info my-4 btn-block"
              >
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginPage;
