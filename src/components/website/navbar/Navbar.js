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
  const [scrolled, setScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const fetchContactInfo = async () => {
    try {
      const response = await fetchContact(bs_id); 
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

  const fetchTimingsInfo = async () => {
    try {
      const response = await fetchTimings(bs_id);
      if (response?.status === true && response.data?.length > 0) {
        const firstTiming = response.data[0];
        setTiming(firstTiming);
      }
    } catch (err) {
      console.error("Error fetching timings info:", err);
    }
  };

  const fetchSocialLinksInfo = async () => {
    try {
      const response = await fetchSociallink(bs_id);
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
    if (bs_id) {
      fetchContactInfo();
      fetchTimingsInfo();
      fetchSocialLinksInfo();
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bs_id]);

  return (
    <>
      <style>
        {`
          .topbar {
            background:#000000 !important;
            transition: all 0.5s ease;
          }
          .topbar a, .topbar p {
            color: rgba(255, 255, 255, 0.8) !important;
            transition: all 0.3s ease;
          }
          .topbar a:hover {
            color: #ffffff !important;
            transform: translateY(-2px);
          }
          .social-icon {
            background: rgba(255, 255, 255, 0.1);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            margin: 0 5px;
          }
          .social-icon:hover {
            background:#7562d8 !important;
            transform: translateY(-3px);
            text-decoration: none;
          }
          .social-icon:hover i {
            color:#ffffff !important;
          }
          .navbar {
            background: ${scrolled ? '#000000 !important' :'#000000 !important'};
            
            transition: all 0.5s ease;
          }
          .navbar-brand {
            color:rgb(165, 148, 248) !important;
            font-weight: 700;
            transition: all 0.3s ease;
          }
          .nav-link {
            color:rgb(255, 255, 255) !important;
            font-weight: 500;
            padding: 10px 20px !important;
            transition: all 0.3s ease;
            position: relative;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: #7562d8;
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .nav-link:hover::after {
            width: 70%;
          }
          .navbar-toggler {
            border: none;
            padding: 0.5rem;
            transition: all 0.3s ease;
            background-color:#00000;
          }
          .navbar-toggler:focus {
            box-shadow: none;
            background-color:black;
          }
          .navbar-toggler-icon {
            background-image: none;
            position: relative;
            transition: all 0.3s ease;
            
            
          }
          .navbar-toggler-icon::before {
            content: '☰';
            color: #7562d8;
            font-size: 1.5rem;
            
          }
          @keyframes slideDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-nav {
            animation: slideDown 0.5s ease forwards;
          }
        `}
      </style>

      <div className="topbar py-2 d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center">
                <a href="#" className="me-4 text-decoration-none">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {contactInfo.desc}
                </a>
                <a href={`tel:${contactInfo.phone}`} className="me-4 text-decoration-none">
                  <i className="fas fa-phone-alt me-2"></i>
                  {contactInfo.phone}
                </a>
                <a href={`mailto:${contactInfo.email}`} className="text-decoration-none">
                  <i className="fas fa-envelope me-2"></i>
                  {contactInfo.email}
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-end align-items-center">
                {timing && (
                  <p className="mb-0 me-4">
                    <i className="fas fa-clock me-2"></i>
                    {timing.bt_day}: {timing.bt_from_time} - {timing.bt_to_time}
                  </p>
                )}
                <div className="d-flex">
                  {Object.entries(socialLinks).map(([platform, data]) => (
                    data?.platform_url && (
                      <a
                        key={platform}
                        href={data.platform_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <i className={`fab fa-${platform} text-white`}></i>
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className={`navbar navbar-expand-lg sticky-top ${scrolled ? 'animate-nav' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="#home-section">
            <i className="fas fa-city me-2"></i>
            Website
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {['Home', 'About', 'Services', 'Product', 'Review', 'Contact'].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className="nav-link"
                    href={`#${item.toLowerCase()}-section`}
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;