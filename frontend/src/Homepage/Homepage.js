import { useStore } from "react-stores";
import { appState } from "../store";

import Book from "../Book/Book";

import snap from "../icons/snap.jpg";

import "./Homepage.css";

function Homepage() {
    const state = useStore(appState);
    return (
        <div id="Homepage">
          <div id="hero">
            <div className="bg" style={{backgroundImage: `url(${snap})`}}></div>
            <div className="gradient"></div>
            <div className="content">
              <div className="left">

                <h1>{state.bookSelected.title}</h1>
                {state.bookSelected.author_name != null && <h2>By {state.bookSelected.author_name[0]}</h2>}

                <p>{state.bookSelected.first_sentence != null && <p>"{state.bookSelected.first_sentence}"</p>}</p>

                <span className="button" onClick={(e) => {appState.setState({reviewMode:"read"});}}>Read Reviews</span>
                <span className="button"  onClick={(e) => {appState.setState({reviewMode:"write"});}}>Write Review</span>
              </div>
              <img src={"https://covers.openlibrary.org/b/id/" + state.bookSelected.cover_i + "-L.jpg"}/>
            </div>
          </div>

          <h3>Search results:</h3>
          <div className="scrollContainer">
            <div id="results">
            {state.search.slice(0, 20).map((r, k) => {
              return <div><Book k={k} book={r}></Book></div>
            })}
          </div>
          </div>
          
        </div>
    )
}

export default Homepage;