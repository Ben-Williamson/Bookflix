import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";

import UI from "./UI/UI";

import "./App.css";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

function getData() {
  fetch("http://192.168.0.21:3000/data", { credentials: "include" })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

function App() {
  const state = useStore(appState);

  return (
    <UI>
      <div icon="h" name="home">
        home
      </div>
      <div icon="m" name="map">
        <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      </div>
      <div icon="i" name="info">
        info
      </div>
    </UI>
  );

  // if (state.loggedIn) {
  //   return (
  //     <div>
  //       <h1>hello {state.username}</h1>

  //       <button onClick={getData}>Get data</button>

  //       <Logout></Logout>
  //     </div>

  //   )
  // }
  // return (
  //   <div>
  //     <MapContainer
  //       center={{ lat: 51.505, lng: -0.09 }}
  //       zoom={13}>
  //       <TileLayer
  //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //       />
  //     </MapContainer>
  //     <Login></Login>
  //   </div>

  // )
}

export default App;
