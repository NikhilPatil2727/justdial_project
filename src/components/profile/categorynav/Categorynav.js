import React from 'react';
import foodImage from '../../../assets/profile/images/food1.jpg';
import { useState,useEffect } from 'react';
import { fetchCategorynav,addCategorynav,updateCategorynav,deleteCategorynav,viewCategorynav} from "./Service";
import { Link } from 'react-router-dom';


const Categorynav = () => {

 
    return (
        <>
            <div className="dark-bg sticky-top">
                <div className="bg transition">
                    <div className="container-fluid fixed">
                        <div className="row">
                            <div className="col-md-12">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <Link to = "/Home" className="navbar-brand">
                                        Justdial
                                    </Link>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarNavDropdown"
                                        aria-controls="navbarNavDropdown"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="icon-menu"></span>
                                    </button>

                                    {/* Updated Search Bar */}
                                    <div className="search-bar-detail-container">
                                        <form className="search-form-datail">
                                            <div className="input-group search-bar-detail">
                                                <div className="dropdown custom-dropdown">
                                                    <input
                                                        type="text"
                                                        placeholder="📍 Location"
                                                        className="dropdown-toggle custom-dropdown-input"
                                                        id="locationDropdown"
                                                        list="Location"
                                                    />
                                                    <datalist id="Location">
                                                        <option value="Bangalore" />
                                                        {/* <option value="Pune" />
                                                        <option value="Malvan" /> */}
                                                    </datalist>
                                                </div>
                                                <div className="input-with-icon">
                                                    <input
                                                        type="text"
                                                        placeholder="Collections"
                                                        className="custom-location-input"
                                                    />
                                                    <button type="submit" className="search-btn">
                                                        <i className="icon-magnifier search-icon-detail"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section
                className="custom-slider d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `url(${foodImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                }}
            >
                <div
                    className="container text-center"
                    style={{ paddingLeft: "20px", paddingRight: "20px" }}
                >
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12">
                            <div className="slider-title_box">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="slider-content_wrap">
                                            <h1 style={{ fontWeight: "bold" }}>
                                                IT'S ALL ABOUT{" "}
                                                <span style={{ color: "#ff3a6d" }}>FOOD</span>
                                            </h1>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>


    );
};
export default Categorynav;