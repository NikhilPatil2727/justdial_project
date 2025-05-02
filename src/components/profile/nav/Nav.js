import React from 'react';
import './Nav.css';
import '../../../assets/website/css/bootstrap.min.css';
import { FaBell, FaUserCircle, FaMicrophone } from 'react-icons/fa';

const Nav = () => {
  return (
    <div className="main-nav-container shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center py-2 px-3">
        {/* Logo */}
        <div className="logo text-primary fw-bold fs-5">
          <span className="text-heading-design">Zotono</span>
        </div>

        {/* Search (desktop only) */}
        <div className="search-bar d-none d-md-flex flex-grow-1 mx-3">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search in Nashik" />
            <span className="input-group-text"><FaMicrophone /></span>
          </div>
        </div>

        {/* Right section */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-sm btn-outline-primary advertise-btn">Create account</button>
          <button className="btn btn-sm btn-outline-primary advertise-btn">Login</button>
          <FaBell className="fs-5" />
          <FaUserCircle className="fs-5" />
        </div>
      </div>

      {/* Search (mobile only) */}
      <div className="search-bar d-block d-md-none px-3 pb-2">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search in Nashik" />
          <span className="input-group-text"><FaMicrophone /></span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
