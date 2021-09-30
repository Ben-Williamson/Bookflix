import { appState } from "../store";
import { useStore } from "react-stores";
import React, { useState } from 'react';

import close from "../icons/close.svg";

import "./WriteReviews.css";


function WriteReviews() {
    var [message, setMessage] = useState("");
    const AppState = useStore(appState);

    let submit = function (e) {
        e.preventDefault();
        console.log(e)
        var data = {};
    
        for(var i = 0; i < e.target.length-1; i++) {
          data[e.target.elements[i].name] = e.target.elements[i].value;
        }
        data.writtenBy = AppState.userData.id;
        if(AppState.bookSelected.isbn.length > 1) {
            data.bookId = AppState.bookSelected.isbn[0];
        } else if(AppState.bookSelected.isbn.length == 1) {
            data.bookId = AppState.bookSelected.isbn;
        }
        
    
        fetch("https://api.mybookflix.co.uk/review", {
          method: "post",
          credentials: "include",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json())
        .then((res) => {
        if (res.success) {
            console.log("posted")
            setMessage("Your review has been posted!");
        } else {
            setMessage(res.error);
        }
        });
    }

    return (
        <div id="WriteReviews">
            <img className="close" onClick={(e) => {appState.setState({reviewMode:"none"});}} src={close} />

            <h1>Write a Review</h1>

            <form onSubmit={submit}>
                <input name="title" id="title" placeholder="Review Title"></input>
                <br/>
                <textarea name="body" placeholder="What did you think?"></textarea>
                <br/>
                <input id="submit" type="submit" value="Publish!"></input>
                <p>{message}</p>
            </form>
        </div>
    )
}

export default WriteReviews;