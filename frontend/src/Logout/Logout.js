import React from "react";
import { appState } from '../store';

class Logout extends React.Component {
    constructor() {
        super();
    }

    logout() {
        console.log("out");
        appState.setState({
            loggedIn: false,
            username: null
        });
    }

    render() {
        return (
            <button onClick={this.logout} > Logout</button>
        )
    }

}

export default Logout;