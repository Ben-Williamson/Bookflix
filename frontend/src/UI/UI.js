import "./UI.css";
import { Link, Element } from "react-scroll";
import React, {useState} from "react";

import Logout from "../Logout/Logout";

function UI(props) {
  const [sidebarExtended, setSidebar] = useState(false);

  return (
    <div className={sidebarExtended ? "sidebarExtended" : "sidebarClosed"}>
      <div id="sidebar" onMouseEnter={function() {setSidebar(true)}} onMouseLeave={function() {setSidebar(false)}}>
        <nav>
          {props.children.map(function (child, index) {
            return (
              <Link
                key={index}
                activeClass="active"
                className={child.props.name}
                to={child.props.name}
                spy={true}
                smooth={true}
                duration={500}
              >
                <b></b>
                <b></b>
                  <ion-icon name={child.props.icon}></ion-icon>
                  {child.props.name}
                
                
              </Link>
            );
          })}
        </nav>
        <Logout />
      </div>

      <div id="content">
        {props.children.map(function (child, index) {
          return (
            <Element key={index} name={child.props.name} className={"page " + child.props.className}>
              {child.props.children}
            </Element>
          );
        })}
      </div>
    </div>
  );
}

export default UI;
