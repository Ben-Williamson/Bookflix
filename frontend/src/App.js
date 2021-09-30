import { useStore } from "react-stores";
import { appState } from "./store";
import Login from "./Login/Login";
import Topbar from "./Topbar/Topbar";
import Homepage from "./Homepage/Homepage"
import ReadReviews from "./ReadReviews/ReadReviews";
import WriteReviews from "./WriteReviews/WriteReviews";
import LoadingPage from "./LoadingPage/LoadingPage";

import "./App.css";

function App() {
  const state = useStore(appState);

  console.log("state:", state);
  if (state.loggedin) {
    return (
      
      <div>
        <Topbar></Topbar>
        { state.reviewMode==="none" && <Homepage></Homepage>}
        { state.reviewMode==="read" && <ReadReviews></ReadReviews>}
        { state.reviewMode==="write" && <WriteReviews></WriteReviews>}
      </div>
      

    );
  } else if(state.loggedin === false) {
    return <Login></Login>;
  } else {
    return <LoadingPage></LoadingPage>; //   loading
  }
 
}

export default App;
