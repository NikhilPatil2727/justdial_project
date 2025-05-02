import { fetchListing,addListing,updateListing,deleteListing,viewListing} from "./Service";
import { useState,useEffect } from "react";


const Listing = () => {

 const [data,setData]=useState()
        const fetchListingData = async ()=>{
            try{
                const response=await fetchListing();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const addListingData = async ()=>{
            try{
                const response=await addListing();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        const updateListingData = async ()=>{
            try{
                const response=await updateListing();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };

        
        const deleteListingData = async ()=>{
            try{
                const response=await deleteListing();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        const viewListingData = async ()=>{
            try{
                const response=await viewListing();
                setData(response.data);
            }
            catch(error){
                console.log(error)
            }
          
        };
        useEffect(()=>{
            fetchListingData();
        },[]);
    return(
        <>
           <section>
        <div classname="container-fluid">
            <div classname="row">
                <div classname="col-md-7 responsive-wrap">
                    <div classname="row detail-filter-wrap">
                        <div classname="col-md-4 featured-responsive">
                            <div classname="detail-filter-text">
                                <p>34 Results For <span>Restaurant</span></p>
                            </div>
                        </div>
                        <div classname="col-md-8 featured-responsive">
                            <div classname="detail-filter">
                                <p>Filter by</p>
                                <form classname="filter-dropdown">
                                    <select classname="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
                  <option selected>Best Match</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                                </form>
                                <form classname="filter-dropdown">
                                    <select classname="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect1">
                  <option selected>Restaurants</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                                </form>
                                <div classname="map-responsive-wrap">
                                    <a classname="map-icon" href="#"><span classname="icon-location-pin"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div classname="row detail-checkbox-wrap">
                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">

                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Bike Parking</span>
              </label>
                        </div>
                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Wireless Internet  </span>
              </label>
                        </div>

                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">

                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Smoking Allowed  </span>
              </label>
                        </div>
                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Street Parking</span>
              </label>
                        </div>

                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">

                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Special</span>
              </label>
                        </div>
                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Accepts Credit cards</span>
              </label>
                        </div>

                        <div classname="col-sm-12 col-md-6 col-lg-4 col-xl-3">

                            <label classname="custom-control custom-checkbox">
                <input type="checkbox" classname="custom-control-input"/>
                <span classname="custom-control-indicator"></span>
                <span classname="custom-control-description">Pets Friendly</span>
              </label>

                        </div>
                    </div>
                    <div classname="row light-bg detail-options-wrap">
                        <div classname="col-sm-6 col-lg-12 col-xl-6 featured-responsive">
                            <div classname="featured-place-wrap">
                                <a href="detail.html">
                                    <img src="../../../assets/profile/images/featured1.jpg" classname="img-fluid" alt="#"/>
                                    <span classname="featured-rating-orange ">6.5</span>
                                    <div classname="featured-title-box">
                                        <h6>Burger &amp; Lobster</h6>
                                        <p>Restaurant </p> <span>• </span>
                                        <p>3 Reviews</p> <span> • </span>
                                        <p><span>$$$</span>$$</p>
                                        <ul>
                                            <li><span classname="icon-location-pin"></span>
                                                <p>1301 Avenue, Brooklyn, NY 11230</p>
                                            </li>
                                            <li><span classname="icon-screen-smartphone"></span>
                                                <p>+44 20 7336 8898</p>
                                            </li>
                                            <li><span classname="icon-link"></span>
                                                <p>https://burgerandlobster.com</p>
                                            </li>

                                        </ul>
                                        <div classname="bottom-icons">
                                            <div classname="closed-now">CLOSED NOW</div>
                                            <span classname="ti-heart"></span>
                                            <span classname="ti-bookmark"></span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div classname="col-sm-6 col-lg-12 col-xl-6 featured-responsive">
                            <div classname="featured-place-wrap">
                                <a href="detail.html">
                                    <img src="../../../assets/profile/images/featured2.jpg" classname="img-fluid" alt="#"/>
                                    <span classname="featured-rating-green">9.5</span>
                                    <div classname="featured-title-box">
                                        <h6>Joe’s Shanghai</h6>
                                        <p>Restaurant </p> <span>• </span>
                                        <p>3 Reviews</p> <span> • </span>
                                        <p><span>$$$</span>$$</p>
                                        <ul>
                                            <li><span classname="icon-location-pin"></span>
                                                <p>1301 Avenue, Brooklyn, NY 11230</p>
                                            </li>
                                            <li><span classname="icon-screen-smartphone"></span>
                                                <p>+44 20 7336 8898</p>
                                            </li>
                                            <li><span classname="icon-link"></span>
                                                <p>https://burgerandlobster.com</p>
                                            </li>

                                        </ul>
                                        <div classname="bottom-icons">
                                            <div classname="open-now">OPEN NOW</div>
                                            <span classname="ti-heart"></span>
                                            <span classname="ti-bookmark"></span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div classname="col-sm-6 col-lg-12 col-xl-6 featured-responsive">
                            <div classname="featured-place-wrap">
                                <a href="detail.html">
                                    <img src="../../../assets/profile/images/featured3.jpg" classname="img-fluid" alt="#"/>
                                    <span classname="featured-rating">3.2</span>
                                    <div classname="featured-title-box">
                                        <h6>Tasty Hand-Pulled Noodles</h6>
                                        <p>Restaurant </p> <span>• </span>
                                        <p>3 Reviews</p> <span> • </span>
                                        <p><span>$$$</span>$$</p>
                                        <ul>
                                            <li><span classname="icon-location-pin"></span>
                                                <p>1301 Avenue, Brooklyn, NY 11230</p>
                                            </li>
                                            <li><span classname="icon-screen-smartphone"></span>
                                                <p>+44 20 7336 8898</p>
                                            </li>
                                            <li><span classname="icon-link"></span>
                                                <p>https://burgerandlobster.com</p>
                                            </li>

                                        </ul>
                                        <div classname="bottom-icons">
                                            <div classname="closed-now">CLOSED NOW</div>
                                            <span classname="ti-heart"></span>
                                            <span classname="ti-bookmark"></span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div classname="col-sm-6 col-lg-12 col-xl-6 featured-responsive">
                            <div classname="featured-place-wrap">
                                <a href="detail.html">
                                    <img src="../../../assets/profile/images/featured4.jpg" classname="img-fluid" alt="#"/>
                                    <span classname="featured-rating-green">9.5</span>
                                    <div classname="featured-title-box">
                                        <h6>Pizza - Cicis</h6>
                                        <p>Restaurant </p> <span>• </span>
                                        <p>3 Reviews</p> <span> • </span>
                                        <p><span>$$$</span>$$</p>
                                        <ul>
                                            <li><span classname="icon-location-pin"></span>
                                                <p>1301 Avenue, Brooklyn, NY 11230</p>
                                            </li>
                                            <li><span classname="icon-screen-smartphone"></span>
                                                <p>+44 20 7336 8898</p>
                                            </li>
                                            <li><span classname="icon-link"></span>
                                                <p>https://burgerandlobster.com</p>
                                            </li>

                                        </ul>
                                        <div classname="bottom-icons">
                                            <div classname="closed-now">CLOSED NOW</div>
                                            <span classname="ti-heart"></span>
                                            <span classname="ti-bookmark"></span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div classname="col-md-5 responsive-wrap map-wrap">
                    <div classname="map-fix">
                        {/* data-toggle="affix"  */}
                        {/* <Google map will appear here! Edit the Latitude, Longitude and Zoom Level below using data-attr-*  */}
                        <div id="map" data-lat="40.674" data-lon="-73.945" data-zoom="14"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>

    )
}
export default Listing;