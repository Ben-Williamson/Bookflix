import React from "react";
import { appState } from '../store';

class Logout extends React.Component {
    logout() {

        fetch('https://api.benwilliamson.org/logout', {
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
            <button id="logout" onClick={this.logout} >Logout</button>
        )
    }

}

export default Logout;