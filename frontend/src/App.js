import { useStore } from 'react-stores';
import { appState } from './store';
import './App.css';

function login() {
  fetch('http://192.168.0.21:3000/auth', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ a: 7, str: 'Some string: &=&' })
  }).then(res => res.json())
    .then(res => console.log(res));
}

function App() {
  const state = useStore(appState);

  if (state.loggedIn) {
    return (
      <h1>hello {appState.username}</h1>
    )
  }
  return (
    <div>
      <h1>Log in first</h1>
      <button onClick={login}>log in</button>
    </div>

  )
}

export default App;
