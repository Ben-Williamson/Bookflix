import "./UI.css";
import { Link, Element } from "react-scroll";
import React from "react";

function UI(props) {
  return (
    <div>
      <div id="sidebar">
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
                <h1>{child.props.icon}</h1>
              </Link>
            );
          })}
        </nav>
      </div>

      <div id="content">
        {props.children.map(function (child, index) {
          return (
            <Element key={index} name={child.props.name} className="element">
              {child.props.children}
            </Element>
          );
        })}
      </div>
    </div>
  );
}

export default UI;
