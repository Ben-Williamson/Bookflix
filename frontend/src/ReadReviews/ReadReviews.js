import { appState } from "../store";

import close from "../icons/close.svg";

import "./ReadReviews.css";

function ReadReviews() {
    return (
        <div id="ReadReviews">
            <img className="close" onClick={(e) => {appState.setState({reviewMode:"none"});}} src={close} />

            <h1>Reviews of Snap</h1>

            {/* <form>
                <input id="title" placeholder="Review Title"></input>
                <br/>
                <textarea placeholder="What did you think?"></textarea>
                <br/>
                <input id="submit" type="submit" value="Publish!"></input>
            </form> */}

            <div className="review">
                <p className="title">A great book</p>
                <p className="author">Ben Williamson</p>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu cursus augue. Vestibulum purus elit, tincidunt vel orci egestas, malesuada posuere nisi. Curabitur in nisl scelerisque velit pellentesque ultrices. Aenean nec elit eu augue sollicitudin ornare. Ut accumsan ipsum erat, non pellentesque turpis blandit vel. Proin aliquet nunc metus, a iaculis felis porta nec. Morbi eget quam lacinia, ultricies ligula sit amet, consequat turpis. In a fermentum tellus, nec commodo massa. Integer augue massa, feugiat vel bibendum et, pellentesque et ante. Phasellus efficitur velit dapibus turpis faucibus ultricies. Vestibulum at consequat mauris. Donec eget enim condimentum, molestie magna vitae, consequat enim. Vivamus eu urna vulputate, viverra nulla eget, suscipit sapien. Etiam vitae eros eget ipsum congue aliquet. Duis porttitor, turpis in egestas mollis, enim mi iaculis mauris, non vehicula quam lectus eget nunc. </p>
            </div>

            <div className="review">
                <p className="title">A great book</p>
                <p className="author">Ben Williamson</p>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu cursus augue. Vestibulum purus elit, tincidunt vel orci egestas, malesuada posuere nisi. Curabitur in nisl scelerisque velit pellentesque ultrices. Aenean nec elit eu augue sollicitudin ornare. Ut accumsan ipsum erat, non pellentesque turpis blandit vel. Proin aliquet nunc metus, a iaculis felis porta nec. Morbi eget quam lacinia, ultricies ligula sit amet, consequat turpis. In a fermentum tellus, nec commodo massa. Integer augue massa, feugiat vel bibendum et, pellentesque et ante. Phasellus efficitur velit dapibus turpis faucibus ultricies. Vestibulum at consequat mauris. Donec eget enim condimentum, molestie magna vitae, consequat enim. Vivamus eu urna vulputate, viverra nulla eget, suscipit sapien. Etiam vitae eros eget ipsum congue aliquet. Duis porttitor, turpis in egestas mollis, enim mi iaculis mauris, non vehicula quam lectus eget nunc. </p>
            </div>

            <div className="review">
                <p className="title">A great book</p>
                <p className="author">Ben Williamson</p>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu cursus augue. Vestibulum purus elit, tincidunt vel orci egestas, malesuada posuere nisi. Curabitur in nisl scelerisque velit pellentesque ultrices. Aenean nec elit eu augue sollicitudin ornare. Ut accumsan ipsum erat, non pellentesque turpis blandit vel. Proin aliquet nunc metus, a iaculis felis porta nec. Morbi eget quam lacinia, ultricies ligula sit amet, consequat turpis. In a fermentum tellus, nec commodo massa. Integer augue massa, feugiat vel bibendum et, pellentesque et ante. Phasellus efficitur velit dapibus turpis faucibus ultricies. Vestibulum at consequat mauris. Donec eget enim condimentum, molestie magna vitae, consequat enim. Vivamus eu urna vulputate, viverra nulla eget, suscipit sapien. Etiam vitae eros eget ipsum congue aliquet. Duis porttitor, turpis in egestas mollis, enim mi iaculis mauris, non vehicula quam lectus eget nunc. </p>
            </div>
        </div>
    )
}

export default ReadReviews;