import { Store } from 'react-stores';

export const appState = new Store({
    loggedIn: false,
    username: null
});