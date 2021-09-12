import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";

import HomePage from "./HomePage/HomePage";
import MapPage from "./MapPage/MapPage";
import LeaderboardPage from "./leaderboardPage/leaderboardPage";

import UI from "./UI/UI";

import "./App.css";

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
          <LeaderboardPage></LeaderboardPage>
        </div>
      </UI>
    );
  } else {
    return <Login></Login>;
  }
 
}

export default App;
