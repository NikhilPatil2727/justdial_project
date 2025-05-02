import React from 'react';

// Importing images
import customerImg1 from '../../../assets/profile/images/customer-img1.jpg';
import customerImg2 from '../../../assets/profile/images/customer-img2.jpg';
import reviewImg1 from '../../../assets/profile/images/review-img1.jpg';
import reviewImg2 from '../../../assets/profile/images/review-img2.jpg';
import reviewImg3 from '../../../assets/profile/images/review-img3.jpg';
import mapImg from '../../../assets/profile/images/map.jpg';
import { useState, useEffect } from 'react';
import { fetchDetails,addDetails,updateDetails,deleteDetails,viewDetails} from "./Service";


const Details = () => {

 const [data,setData]=useState()
        const fetchDetailsData = async ()=>{
            try{
                const response=await fetchDetails();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addDetailsData = async ()=>{
            try{
                const response=await addDetails();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updateDetailsData = async ()=>{
            try{
                const response=await updateDetails();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deleteDetailsData = async ()=>{
            try{
                const response=await deleteDetails();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        const viewDetailsData = async ()=>{
            try{
                const response=await viewDetails();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchDetailsData();
        },[]);
    return (
        <>
            <section className="light-bg booking-details_wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 responsive-wrap">
                            <div className="booking-checkbox_wrap">
                                <div className="booking-checkbox">
                                    <p>
                                        Tasty Hand-Pulled Noodles is a 1950s style diner located in Madison, Wisconsin. Opened in 1946 by Mickey Weidman, and located just across the street from Camp Randall Stadium, it has become a popular game day tradition amongst
                                        many Badger fans. The diner is well known for its breakfast selections, especially the Scrambler, which is a large mound of potatoes, eggs, cheese, gravy, and a patrons’ choice of other toppings.
                                    </p>
                                    <p>
                                        Mickies has also been featured on “Todd’s Taste of the Town” during one of ESPN’s college football broadcasts. We are one of the best Chinese restaurants in the New York, New York area. We have been recognized for our outstanding
                                        Chinese & Asian cuisine, excellent Chinese menu, and great restaurant specials.
                                    </p>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Bike Parking</span>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Wireless Internet</span>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Smoking Allowed</span>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Street Parking</span>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Special</span>
                                        </label>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="custom-checkbox">
                                            <span className="ti-check-box"></span>
                                            <span className="custom-control-description">Accepts Credit cards</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="booking-checkbox_wrap mt-4">
                                <h5>34 Reviews</h5>
                                <hr />
                                <div className="customer-review_wrap">
                                    <div className="customer-img">
                                        <img src={customerImg1} className="img-fluid" alt="Amanda G" />
                                        <p>Amanda G</p>
                                        <span>35 Reviews</span>
                                    </div>
                                    <div className="customer-content-wrap">
                                        <div className="customer-content">
                                            <div className="customer-review">
                                                <h6>Best noodles in the Newyork city</h6>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span className="round-icon-blank"></span>
                                                <p>Reviewed 2 days ago</p>
                                            </div>
                                            <div className="customer-rating">8.0</div>
                                        </div>
                                        <p className="customer-text">
                                            I love the noodles here but it is so rare that I get to come here. Tasty Hand-Pulled Noodles is the best type of whole in the wall restaurant. The staff are really nice, and you should be seated quickly.
                                            I usually get the hand pulled noodles in a soup. House Special #1 is amazing and the lamb noodles are also great.
                                        </p>
                                        <p className="customer-text">
                                            I love how you can see into the kitchen and watch them make the noodles and you can definitely tell that this is a family-run establishment. The prices are great with one dish maybe being $9. You just have to remember
                                            to bring cash.
                                        </p>
                                        <ul>
                                            <li>
                                                <img src={reviewImg1} className="img-fluid" alt="Review 1" />
                                            </li>
                                            <li>
                                                <img src={reviewImg2} className="img-fluid" alt="Review 2" />
                                            </li>
                                            <li>
                                                <img src={reviewImg3} className="img-fluid" alt="Review 3" />
                                            </li>
                                        </ul>
                                        <span>28 people marked this review as helpful</span>
                                        <a href="#">
                                            <span className="icon-like"></span>Helpful
                                        </a>
                                    </div>
                                </div>
                                <hr />
                                <div className="customer-review_wrap">
                                    <div className="customer-img">
                                        <img src={customerImg2} className="img-fluid" alt="Kevin W" />
                                        <p>Kevin W</p>
                                        <span>17 Reviews</span>
                                    </div>
                                    <div className="customer-content-wrap">
                                        <div className="customer-content">
                                            <div className="customer-review">
                                                <h6>A hole-in-the-wall old school shop.</h6>
                                                <span className="customer-rating-red"></span>
                                                <span className="round-icon-blank"></span>
                                                <span className="round-icon-blank"></span>
                                                <span className="round-icon-blank"></span>
                                                <span className="round-icon-blank"></span>
                                                <p>Reviewed 3 months ago</p>
                                            </div>
                                            <div className="customer-rating customer-rating-red">2.0</div>
                                        </div>
                                        <p className="customer-text">
                                            The dumplings were so greasy...the pan-fried shrimp noodles were the same. So much oil and grease it was difficult to eat. The shrimp noodles only come with 3 shrimp (luckily the dish itself is cheap)
                                        </p>
                                        <p className="customer-text">
                                            The beef noodle soup was okay. I added black vinegar into the broth to give it some extra flavor. The soup has bok choy which I liked - it's a nice textural element. The shop itself is really unclean (which is the case
                                            in many restaurants in Chinatown). They don't wipe down the tables after customers have eaten. If you peak into the kitchen, many of their supplies are on the ground, which is unsettling...
                                        </p>
                                        <span>10 people marked this review as helpful</span>
                                        <a href="#">
                                            <span className="icon-like"></span>Helpful
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 responsive-wrap">
                            <div className="contact-info">
                                <img src={mapImg} className="img-fluid" alt="Map Location" />
                                <div className="address">
                                    <span className="icon-location-pin"></span>
                                    <p> Doyers St
                                        <br /> New York, NY 10013
                                        <br /> b/t Division St & St James Pl
                                        <br /> Chinatown, Civic Center
                                    </p>
                                </div>
                                <div className="address">
                                    <span className="icon-screen-smartphone"></span>
                                    <p> +44 20 7336 8898</p>
                                </div>
                                <div className="address">
                                    <span className="icon-link"></span>
                                    <p>https://burgerandlobster.com</p>
                                </div>
                                <div className="address">
                                    <span className="icon-clock"></span>
                                    <p>Mon - Sun 09:30 am - 05:30 pm
                                        <br />
                                        <span className="open-now">OPEN NOW</span>
                                    </p>
                                </div>
                                <a href="#" className="btn btn-outline-danger btn-contact">SEND A MESSAGE</a>
                            </div>
                            <div className="follow">
                                <ul className="social-counts">
                                    <li>
                                        <a href="https://www.instagram.com" target="_blank">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com" target="_blank">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="https://www.twitter.com" target="_blank">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                                <a href="#">FOLLOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Details;
