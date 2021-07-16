import { useStore } from 'react-stores';
import { appState } from './store';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import './App.css';


function getData() {
  fetch("http://192.168.0.21:3000/data", { credentials: 'include' }).then(res => res.json()).then(res => {
    console.log(res);
  });
}

function App() {
  const state = useStore(appState);

  if (state.loggedIn) {
    return (
      <div>
        <h1>hello {state.username}</h1>

        <button onClick={getData}>Get data</button>

        <Logout></Logout>
      </div>

    )
  }
  return (
    <Login></Login>
  )
}

export default App;
