import React from 'react';
import profileHeader from "../../../assets/profile/images/p6.jpg";
import profileHeader1 from "../../../assets/profile/images/profile2.avif";
import profileHeader2 from "../../../assets/profile/images/p5.jpg";
import Profilenav from '../../../components/profile/profilenav/Profilenav.js';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProfile, addProfile, updateProfile, deleteProfile, viewProfile } from "./Service";
import { businessLogin } from '../businesslogin/Service.js';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Profile = () => {

    const [data, setData] = useState()

    return (
      <>
        <Profilenav />
        <div className="profile-header">
        <div style={{ padding: "0 20px" }}>
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    spaceBetween={20} // optional, adds space between slides
    slidesPerView={1}
    centeredSlides={true}
  >
    <SwiperSlide>
      <img src={profileHeader1} alt="Slide 1" className="profile-header-image" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={profileHeader2} alt="Slide 2" className="profile-header-image" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={profileHeader} alt="Slide 3" className="profile-header-image" />
    </SwiperSlide>
  </Swiper>
</div>


          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: "center", paddingTop:10 }}
          >
            Quick Links
          </motion.h2>
          {/* Score Section */}

          {/* Quick Links Section */}

          <div className="quick-links">
            {/* Individual Quick Links */}
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/viewprofile" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20.5v-5m0 0V9m0 6.5l-2.5-2.5m2.5 2.5l2.5-2.5" />
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">View Profile</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/photos" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" />
                    <path d="M12 20v-6m0 0V8m0 6l-2.5-2.5m2.5 2.5l2.5-2.5" />
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Photos</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/businesscontacts" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 5H2m18 14H2m14-7H8" />
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Business Info</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/advertise" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 3v18m9-9H3"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Advertise</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/map" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Map</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/videos" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <polyline points="3 7 12 13 21 7"></polyline>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Videos</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Timings" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12.79V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Business Timing</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Addoffer" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <polyline points="3 7 12 13 21 7"></polyline>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Offer</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Review" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12.79V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Reviews</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Website" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <polyline points="3 7 12 13 21 7"></polyline>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Website</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Sociallink" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v12"></path>
                    <path d="M6 12h12"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Social Link</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Amenity" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <line x1="12" y1="20" x2="12" y2="20"></line>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Amenity</div>
            </div>

            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Facilitys" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Add Facility</div>
            </div>

            <div className="quick-link-card">
              {/* <!-- Share Biz Card (Business Card Icon) --> */}
              <div className="quick-link-icon">
                <Link to="/Services" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-.1a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h.1a1.65 1.65 0 0 0 1.51-1A1.65 1.65 0 0 0 5 4.6l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9.4 3h1.2a1.65 1.65 0 0 0 1.51-1l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v1.2a1.65 1.65 0 0 0 1.51 1h.1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.1a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Services</div>
            </div>

            <div className="quick-link-card">
              {/* <!-- Product Card (Shopping Bag Icon) --> */}
              <div className="quick-link-icon">
                <Link to="/Product" className="no-underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#000000" }}
                  >
                    <path d="M6 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Product</div>
            </div>

            <div className="quick-link-card ">
              <div className="quick-link-icon">
                <Link to="/Labtest" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 2v6"></path>
                    <path d="M9 2H7a2 2 0 0 0-2 2v14a4 4 0 0 0 8 0V4a2 2 0 0 0-2-2H9Z"></path>
                    <path d="M16 16h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Lab Test</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Healthpackage" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 2h4"></path>
                    <path d="M12 14v-4"></path>
                    <path d="M12 10V6"></path>
                    <path d="M4 10h16"></path>
                    <path d="M4 18h16"></path>
                    <path d="M6 14h12"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Health Package</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Menu" className="no-underline">
                  <svg
                    style={{ color: "#000000" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 17h16"></path>
                    <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z"></path>
                    <path d="M12 3v14"></path>
                    <path d="M10 21h4"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Menu</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/Keyfeatures" className="no-underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#000000" }}
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19 13h2M5 13H3M19 11h2M5 11H3M16.24 16.24l1.42 1.42M7.34 7.34l1.42-1.42M16.24 7.34l1.42-1.42M7.34 16.24l1.42 1.42"></path>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">Key Features</div>
            </div>
            <div className="quick-link-card">
              <div className="quick-link-icon">
                <Link to="/usercontacts" className="no-underline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#000000" }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </Link>
              </div>
              <div className="quick-link-title">User Contacts</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default Profile;
