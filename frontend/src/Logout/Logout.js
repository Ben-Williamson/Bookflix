import React from "react";
import { appState } from '../store';

class Logout extends React.Component {
    constructor() {
        super();
    }

    logout() {

        fetch('http://192.168.0.21:3000/logout', {
            method: 'post',
            credentials: 'include'
        })
            .then(res => {
                appState.setState({
                    loggedIn: false,
                    username: null
                });
            });
    }

    render() {
        return (
            <button onClick={this.logout} > Logout</button>
        )
    }

}

export default Logout;