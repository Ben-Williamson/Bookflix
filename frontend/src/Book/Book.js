import { appState } from "../store";

import "./Book.css";

function select(book) {
    console.log("book:",book);
    appState.setState({...appState, bookSelected: book})
}

function Book(props) {
    return (
        <div className="book" onClick={() => select(props.book)} key={props.k}>
            <img src={"https://covers.openlibrary.org/b/id/" + props.book.cover_i + "-M.jpg"}/>
            <p>{props.book.title}</p>
        </div>
    )
}

export default Book;