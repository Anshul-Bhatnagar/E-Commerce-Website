import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/productDetail">ProductDetail</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/admin">AdminPanel</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

