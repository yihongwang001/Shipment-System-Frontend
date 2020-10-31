import React from 'react';
import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
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

    let response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'appliction/json',
      },
      redirect: 'follow',
      body: formBody,
    });

    console.log(response.status);
    if (response.status === 200) {
      setLoggedInHelper(true);
    }

    response = await response.json();
    console.log(response);
  };

  if (loggedIn) {
    return <Redirect to="/shipment-list"></Redirect>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
};

export default LoginPage;
