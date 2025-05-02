import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchContact, fetchTimings, fetchSociallink } from "./Service";

const Navbar = () => {
  const { bs_id } = useParams(); 
  const [contactInfo, setContactInfo] = useState({
    desc: "No Address Provided",
    phone: "No Phone Provided",
    email: "No Email Provided",
  });
  const [timing, setTiming] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const fetchContactInfo = async () => {
    try {
      const response = await fetchContact(bs_id); 
      console.log("Contact API Response:", response);
      if (response?.status === true && response.data) {
        const contact = Array.isArray(response.data) ? response.data[0] : response.data;
        setContactInfo({
          desc: `${contact.bs_area || "No Address Provided"}, ${contact.bs_city || "No City Provided"}, ${contact.bs_state || "No State Provided"}`,
          phone: contact.bs_business_phone || "No Phone Provided",
          email: contact.bs_email || "No Email Provided",
        });
      }
      
    } catch (err) {
      console.error("Error fetching contact info:", err);
    }
  };
  
  // Function to fetch Timings Info
  const fetchTimingsInfo = async () => {
    try {
      const response = await fetchTimings(bs_id);
      console.log("Timings API Response:", response);
      if (response?.status === true && response.data?.length > 0) {
        const firstTiming = response.data[0];
        setTiming(firstTiming);
      }
    } catch (err) {
      console.error("Error fetching timings info:", err);
    }
  };

  // Function to fetch Social Links Info
  const fetchSocialLinksInfo = async () => {
    try {
      const response = await fetchSociallink(bs_id);
      console.log("Social Links API Response:", response);
      if (response?.status === true && response.data) {
        const { data } = response;
        const socialLinks = data.reduce((acc, item) => {
          const platformName = item.platform_name.toLowerCase();
          acc[platformName] = {
            platform_url: item.platform_url || "",
            platform_name: platformName,
          };
          return acc;
        }, {});
        setSocialLinks(socialLinks);
      }
    } catch (err) {
      console.error("Error fetching social links info:", err);
    }
  };
  useEffect(() => {
    console.log("Current bs_id:", bs_id);
    if (bs_id) {
      fetchContactInfo();
      fetchTimingsInfo();
      fetchSocialLinksInfo();
    }
  }, [bs_id]);

  return (
    <>
      {/* Topbar Section */}
      <div id="home-section" className="container-fluid topbar d-none d-xl-block w-100">
        <div className="row gx-0 align-items-center" style={{ height: "45px" }}>
          <div className="col-lg-6 text-center text-lg-start mb-lg-0">
            <div className="d-flex flex-wrap">
              <a href="#" className="text-muted me-4">
                <i className="fas fa-map-marker-alt text-secondary me-2"></i>
                {contactInfo.desc}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="text-muted me-4">
                <i className="fas fa-phone-alt text-secondary me-2"></i>
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="text-muted me-0">
                <i className="fas fa-envelope text-secondary me-2"></i>
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="col-lg-6 text-center text-lg-end">
            <div className="d-flex align-items-center justify-content-end">
              {timing && (
                <p className="text-muted mb-0 me-3">
                  <i className="fas fa-clock text-secondary me-2"></i>
                  {timing.bt_day}: {timing.bt_from_time} - {timing.bt_to_time}
                </p>
              )}
              <div className="footer-btn d-flex align-items-center">
                {socialLinks.facebook?.platform_url && (
                  <a
                    href={socialLinks.facebook.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-md-square me-2"
                    style={{
                      backgroundColor: "#ff5e15",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className={`fab fa-facebook-f text-white`} style={{ fontSize: "18px" }}></i>
                  </a>
                )}
                {socialLinks.twitter?.platform_url && (
                  <a
                    href={socialLinks.twitter.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-md-square me-2"
                    style={{
                      backgroundColor: "#ff5e15",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className={`fab fa-twitter text-white`} style={{ fontSize: "18px" }}></i>
                  </a>
                )}
                {socialLinks.instagram?.platform_url && (
                  <a
                    href={socialLinks.instagram.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-md-square me-2"
                    style={{
                      backgroundColor: "#ff5e15",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className={`fab fa-instagram text-white`} style={{ fontSize: "18px" }}></i>
                  </a>
                )}
                {socialLinks.linkedin?.platform_url && (
                  <a
                    href={socialLinks.linkedin.platform_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-md-square me-2"
                    style={{
                      backgroundColor: "#ff5e15",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className={`fab fa-linkedin-in text-white`} style={{ fontSize: "18px" }}></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid sticky-top px-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-light py-3 px-4">
          <a href="#home-section" className="navbar-brand p-0">
            <h1 className="text-secondary display-6"><i className="fas fa-city text-primary me-3"></i>Website</h1>
            {/* <img src="" alt="Logo"/>  */}
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto pt-2 pt-lg-0">
              <a
                href="#home-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Home
              </a>
              <a
                href="#about-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                About
              </a>
              <a
                href="#service-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Services
              </a>
              <a
                href="#product-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Product
              </a>
              <a
                href="#reviews-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Review
              </a>
              <a
                href="#contact-section"
                className="custom-nav-link"
                style={{
                  position: "relative",
                  padding: "10px",
                  fontWeight: 400,
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "17px",
                  transition: "color 0.5s, border-color 0.5s",
                  zIndex: 99,
                  color: "#001659",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Contact
              </a>

              <style>
                {`
        .custom-nav-link::before,
        .custom-nav-link::after {
          content: '';
          position: absolute;
          width: 20px; 
          height: 20px;
          border: 2px solid #001659;
          transition: border-color 0.5s;
          opacity: 0;
        }
        .custom-nav-link::before {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }
        .custom-nav-link::after {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }
        .custom-nav-link:hover::before,
        .custom-nav-link:hover::after {
          opacity: 1; 
          border-color: #ff5e15 ;
        }
        .custom-nav-link:hover {
          color: #ff5e15!important ;
        }
      `}
              </style>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Navbar;
