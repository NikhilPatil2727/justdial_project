import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Profilenav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
useEffect(() => {
    const token = localStorage.getItem("businessToken");
    console.log("token : " + token)
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="dark-bg sticky-top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/Home">JustDial</Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-menu"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNavDropdown"
              >
                 <ul className="navbar-nav">
                                      <li className="nav-item">
                                        <Link className="nav-link" to="/BusinessLogin">
                                          Business Login
                                        </Link>
                                      </li>
                                      {/* Only show "My Profile" if user is logged in */}
                                      {isLoggedIn && (
                                        <li className="nav-item">
                                          <Link className="nav-link" to="/profile">
                                            My Profile
                                          </Link>
                                        </li>
                                      )}
                
                                      <li className="nav-item">
                                        <Link className="nav-link" to="/Signup">
                                          Sign Up
                                        </Link>
                                      </li>
                                      <li className="nav-item">
                                        <Link className="nav-link" to="/Signin">
                                          Sign In
                                        </Link>
                                      </li>
                                      <li>
                                        <Link to="/Businessregistration" className="btn btn-outline-light top-btn">
                                          <span className="ti-plus"></span> Business Registration
                                        </Link>
                                      </li>
                                    </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilenav;
