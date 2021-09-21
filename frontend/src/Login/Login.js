import React, { useState } from 'react';
import { appState } from "../store";
import "./login.css";

function Login() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");


  var handleSubmit = function (e) {
    e.preventDefault();
    console.log(e);

    var data = {};

    for(var i = 0; i < e.target.length-1; i++) {
      data[e.target.elements[i].name] = e.target.elements[i].value;
    }

    fetch("https://api.mybookflix.co.uk/" + mode, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.loggedin) {
          appState.setState(res);
        } else {
          setError(res.error);
        }
      });
  }

    return (
      <div id="loginPage">

        { mode === "login" &&
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <p>
              Don't have an account? <span onClick={function() {setMode("signup")}}>Sign Up.</span>
            </p>

            <input name="username" type="text" placeholder="Username"></input>

            <br />

            <input name="password" type="password" placeholder="Password"></input>

            <p>{error}</p>

            <input type="submit" value="Login" />
          </form>
        }
        { mode === "signup" &&
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <p>
              Already have an account? <span onClick={function() {setMode("login")}}>Log in.</span>
            </p>

            <input name="email" type="text" placeholder="Email"></input>

            <br />

            <input name="firstname" type="text" placeholder="Firstname"></input>

            <br />

            <input name="surname" type="text" placeholder="Surname"></input>

            <br />

            <input name="username" type="text" placeholder="Username"></input>

            <br />

            <input name="password" type="password" placeholder="Password"></input>

            <p>{error}</p>

            <input type="submit" value="Sign up" />
          </form>
        }
      </div>
    );
}

export default Login;