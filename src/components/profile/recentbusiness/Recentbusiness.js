import React from 'react';

// Importing images
import recentImg from '../../../assets/profile/images/recent.jpg';
import weddingImg from '../../../assets/profile/images/wed.jpg';
import doctorImg from '../../../assets/profile/images/doctor1.jpg';
import { fetchRecentbusiness,addRecentbusiness,updateRecentbusiness,deleteRecentbusiness,viewRecentbusiness} from "./Service";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


const Recentbusiness = () => {

 const [data,setData]=useState()
        const fetchRecentbusinessData = async ()=>{
            try{
                const response=await fetchRecentbusiness();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addRecentbusinessData = async ()=>{
            try{
                const response=await addRecentbusiness();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updateRecentbusinessData = async ()=>{
            try{
                const response=await updateRecentbusiness();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deleteRecentbusinessData = async ()=>{
            try{
                const response=await deleteRecentbusiness();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        const viewRecentbusinessData = async ()=>{
            try{
                const response=await viewRecentbusiness();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchRecentbusinessData();
        },[]);
    return (
        <>
            <section className="main-block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="styled-heading">
                                <h3>Recent Business</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 featured-responsive">
                            <div className="featured-place">
                                <Link to="/categorydetails">
                                    <img
                                        src={recentImg} // Using the imported image
                                        className="img-fluid"
                                        style={{ height: '180px' }}
                                        alt="#"
                                    />
                                    <div className="featured-title-box">
                                        <h6>IT Training</h6>
                                        <p style={{ color: '#546075' }}>IT Training</p>
                                        <span>•</span>
                                        <p style={{ color: '#546075' }}>3 Reviews</p>
                                        <ul>
                                            <li>
                                                <p style={{ color: '#546075' }}>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, hic.
                                                </p>
                                            </li>
                                            <li>
                                                <span className="icon-screen-smartphone"></span>
                                                <p style={{ color: '#546075' }}>+91 9073368898</p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 featured-responsive">
                            <div className="featured-place">
                                <Link to="/categorydetails">
                                    <img
                                        src={weddingImg} // Using the imported image
                                        className="img-fluid"
                                        style={{ height: '180px' }}
                                        alt="#"
                                    />
                                    <div className="featured-title-box">
                                        <h6>Wedding</h6>
                                        <p style={{ color: '#546075' }}>Wedding</p>
                                        <span>•</span>
                                        <p style={{ color: '#546075' }}>3 Reviews</p>
                                        <ul>
                                            <li>
                                                <p style={{ color: '#546075' }}>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, hic.
                                                </p>
                                            </li>
                                            <li>
                                                <span className="icon-screen-smartphone"></span>
                                                <p style={{ color: '#546075' }}>+91 7673368898</p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 featured-responsive">
                            <div className="featured-place">
                                <Link to="/categorydetails">
                                    <img
                                        src={doctorImg} // Using the imported image
                                        className="img-fluid"
                                        style={{ height: '180px' }}
                                        alt="#"
                                    />
                                    <div className="featured-title-box">
                                        <h6>Doctors</h6>
                                        <p style={{ color: '#546075' }}>Doctors</p>
                                        <span>•</span>
                                        <p style={{ color: '#546075' }}>3 Reviews</p>
                                        <ul>
                                            <li>
                                                <p style={{ color: '#546075' }}>
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, hic.
                                                </p>
                                            </li>
                                            <li>
                                                <span className="icon-screen-smartphone"></span>
                                                <p style={{ color: '#546075' }}>+91 8773368898</p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Recentbusiness;
