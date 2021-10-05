import { Store } from "react-stores";

export const appState = new Store({
    bookSelected: {},
    search: [],
    reviewMode: "none",
    reviews: []
});
