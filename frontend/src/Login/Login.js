import React from "react";
import { appState } from "../store";
import "./login.css";
import { MapContainer, TileLayer } from "react-leaflet";
import cities from "../data/cities";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { error: null };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    var username = event.target[0].value;
    var password = event.target[1].value;

    fetch("http://192.168.0.5:3000/auth", {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          appState.setState({
            loggedIn: true,
            userDetails: res,
          });
        } else {
          this.setState({ error: "Wrong username or password." });
        }
      });

    event.preventDefault();
  }

  render() {
    var city = cities[Math.floor(Math.random() * cities.length)];

    return (
      <div id="loginPage">
        <MapContainer center={{ lat: city.lat, lng: city.lng }} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <p>
            Don't have an account? <a href="google.com">Sign Up.</a>
          </p>

          <input type="text" placeholder="Username"></input>

          <br />

          <input type="password" placeholder="Password"></input>

          <p>{this.state.error}</p>

          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
