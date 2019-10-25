import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => {
  return (
    <header className="main-nav">
      <div className="nav-logo">
        <h1>Booking App</h1>
      </div>
      <nav className="nav-item">
        <ul>
          <li>
            <NavLink to="">Authenticated</NavLink>
          </li>
          <li>
            <NavLink to="">Events</NavLink>
          </li>
          <li>
            <NavLink to="">Booking</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
