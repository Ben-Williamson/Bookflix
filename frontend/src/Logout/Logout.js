import React from "react";
import { appState } from '../store';

class Logout extends React.Component {
    logout() {

        fetch('https://api.benwilliamson.org/logout', {
            method: 'post',
            credentials: 'include'
        })
            .then(res => {
                appState.setState({loggedin: false});
            });
    }

    render() {
        return (
            <button id="logout" onClick={this.logout} >Logout</button>
        )
    }

}

export default Logout;