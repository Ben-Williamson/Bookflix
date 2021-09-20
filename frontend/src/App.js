import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";

import HomePage from "./HomePage/HomePage";
import MapPage from "./MapPage/MapPage";
import LeaderboardPage from "./leaderboardPage/leaderboardPage";

import LoadingPage from "./LoadingPage/LoadingPage";

import UI from "./UI/UI";

import "./App.css";

function App() {
  const state = useStore(appState);

  console.log("state:", state);
  if (state.loggedin) {
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
  } else if(state.loggedin === false) {
    return <Login></Login>;
  } else {
    return <LoadingPage></LoadingPage>; //   loading
  }
 
}

export default App;
