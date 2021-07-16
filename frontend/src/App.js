import { useStore } from 'react-stores';
import { appState } from './store';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import './App.css';

function login() {
  fetch('http://192.168.0.21:3000/auth', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: "ben", password: 'password' })
  }).then(res => res.json())
    .then(res => {
      if (res) {
        appState.setState({
          loggedIn: true,
          username: "ben"
        });
      }
    });
}

function App() {
  const state = useStore(appState);

  if (state.loggedIn) {
    return (
      <div>
        <h1>hello {state.username}</h1>
        <Logout></Logout>
      </div>

    )
  }
  return (
    <Login></Login>

  )
}

export default App;
