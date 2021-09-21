import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";


import LoadingPage from "./LoadingPage/LoadingPage";

import "./App.css";

function App() {
  const state = useStore(appState);

  console.log("state:", state);
  if (state.loggedin) {
    return (
      <div>
        <h1>Welcome</h1>
        <Logout></Logout>
      </div>
      

    );
  } else if(state.loggedin === false) {
    return <Login></Login>;
  } else {
    return <LoadingPage></LoadingPage>; //   loading
  }
 
}

export default App;
