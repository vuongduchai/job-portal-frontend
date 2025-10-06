import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm px-4">
      <a className="navbar-brand fw-bold" href="/">Jobify</a>
      <ul className="navbar-nav ms-auto align-items-center">
        <li className="nav-item mx-2"><a className="nav-link" href="#">Product</a></li>
        <li className="nav-item mx-2"><a className="nav-link" href="#">Resources</a></li>
        <li className="nav-item mx-2"><a className="nav-link" href="#">Enterprise</a></li>
        <li className="nav-item mx-2"><a className="nav-link" href="#">Pricing</a></li>
        <li className="nav-item mx-2"><a className="nav-link" href="/login">Login</a></li>
        <li className="nav-item mx-2">
          <a className="btn btn-danger px-3" href="/register">Sign up</a>
        </li>
      </ul>
    </nav>
  );
}
