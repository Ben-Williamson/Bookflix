import React from 'react';
import { appState } from '../store';

class Login extends React.Component {

    constructor() {
        super();
        this.state = { error: null };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        var username = event.target[0].value;
        var password = event.target[1].value;

        fetch('http://192.168.0.21:3000/auth', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    appState.setState({
                        loggedIn: true,
                        username: username
                    });
                } else {
                    this.setState({ error: "Wrong username or password." });
                }
            });

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Username</p>
                <input type="text" />

                <p>Password</p>
                <input type="password"></input>

                <p>{this.state.error}</p>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login;