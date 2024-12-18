import React from "react";
import { Link } from 'react-router-dom';
import './css/NavBar.css';

function NavBar() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Predictive Maintenance</Link>
        </div>
        <ul className="navbar-links">
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="/prediction">Prediction</Link></li>
          <li><Link to="/product">Products</Link></li>
          {/* <li><Link to="/contact">Contact</Link></li> */}
        </ul>
      </nav>
    );
  }

  export default NavBar