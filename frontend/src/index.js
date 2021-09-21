import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { appState } from "./store";

  fetch("https://api.mybookflix.co.uk/", {
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, appState);
      appState.setState(res);
    });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
