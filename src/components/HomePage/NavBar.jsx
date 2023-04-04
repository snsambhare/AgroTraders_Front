import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div>
        {" "}
        <nav
          style={{ backgroundColor: "#fd7e14" }}
          className="navbar navbar-expand-lg navbar-dark"
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              AGROTRADERS
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/AuthorizeUser"
                  >
                    SignIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/aboutUs"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/contactUs"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
