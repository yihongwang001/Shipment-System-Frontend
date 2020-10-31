import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bodyObject = {
      username: username,
      email: email,
      password: password,
    };
    const formBody = Object.keys(bodyObject)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(bodyObject[key])
      )
      .join('&');

    let response = await fetch('/user/register', {
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
      setRegistered(true);
    }
  };

  if (registered) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
    );
  }
};

export default RegisterPage;
