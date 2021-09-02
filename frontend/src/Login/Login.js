import React from "react";
import { appState } from "../store";
import "./login.css";
import { MapContainer, TileLayer } from "react-leaflet";
import cities from "../data/cities";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { error: null, mode: "login" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  switchMode() {
    this.setState({ mode: this.state.mode == "login" ? "signup" : "login" });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var data = {type: this.state.mode};

    for(var i = 0; i < event.target.length; i++) {
      data[event.target.elements[i].name] = event.target.elements[i].value;
    }

    fetch("https://api.benwilliamson.org/auth", {
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
        console.log(res);
        if (res.success) {
          appState.setState({
            loggedIn: true,
            userDetails: res.userData,
          });
        } else {
          this.setState({ error: res.message });
        }
      });
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

        { this.state.mode == "login" &&
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <p>
              Don't have an account? <a onClick={this.switchMode}>Sign Up.</a>
            </p>

            <input name="username" type="text" placeholder="Username"></input>

            <br />

            <input name="password" type="password" placeholder="Password"></input>

            <p>{this.state.error}</p>

            <input type="submit" value="Login" />
          </form>
        }
        { this.state.mode == "signup" &&
          <form onSubmit={this.handleSubmit}>
            <h1>Sign up</h1>
            <p>
              Already have an account? <a onClick={this.switchMode}>Log in.</a>
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

            <p>{this.state.error}</p>

            <input type="submit" value="Sign up" />
          </form>
        }
      </div>
    );
  }
}

export default Login;
