import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";

import HomePage from "./HomePage/HomePage";
import MapPage from "./MapPage/MapPage";

import UI from "./UI/UI";

import "./App.css";

// function getData() {
//   fetch("http://192.168.0.5:3000/data", { credentials: "include" })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//     });
// }

function App() {
  const state = useStore(appState);

  if (state.loggedIn) {
    return (
      <UI>
        <div icon="home-outline" name="home">
          <HomePage></HomePage>
        </div>
        <div icon="map-outline" name="map">
          <MapPage></MapPage>
        </div>
        <div icon="bar-chart-outline" name="leaderboard">
          leaderboard
        </div>
      </UI>
    );
  }

  return <Login></Login>;

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
