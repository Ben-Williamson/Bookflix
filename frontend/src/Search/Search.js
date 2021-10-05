import React from 'react';
import { appState } from "../store";

import "./Search.css";

class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '', results: []};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      fetch("//api.mybookflix.co.uk/search?q=" + this.state.value)
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
    }

    render() {
      return (
          <form onSubmit={this.handleSubmit}>
            <input id="search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" />
          </form>

      );
    }
  }

export default Search;