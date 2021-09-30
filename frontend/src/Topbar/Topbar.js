import Search from "../Search/Search";
import Logout from "../Logout/Logout";

import logo from "../icons/logo.png";

import "./Topbar.css"

function Topbar() {
    return (
        <div id="Topbar">
            <img src={logo}/>
            <Search></Search>
            <Logout></Logout>
        </div>

    )
}

export default Topbar;