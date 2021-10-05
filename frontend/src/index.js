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

    fetch("//api.mybookflix.co.uk/search?q=knife of never letting go")
        .then(res => res.json())
        .then(res => {
          var filteredSearch = [];
          var titleAuthorPairs = [];

          res.docs.forEach(element => {
            var titleAuthorPair = JSON.stringify([element.title, element.author_name]);
            if(titleAuthorPairs.indexOf(titleAuthorPair) === -1) {
              filteredSearch.push(element);
              titleAuthorPairs.push(titleAuthorPair);
            }
          });

          filteredSearch = filteredSearch.filter(element => element.cover_i !== undefined);

          // this.setState({...this.state, results: filteredSearch})
          appState.setState({search: filteredSearch});
        })


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
