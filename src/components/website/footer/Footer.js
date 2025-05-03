import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAbout, fetchContact, fetchSociallink } from "./Service";

const Footer = () => {
    const { bs_id } = useParams();
    const [data, setData] = useState(null);
    const [contactInfo, setContactInfo] = useState({
        bs_business_name: "",
        bs_email: "",
        bs_business_phone: "",
        bs_address: "",
        bs_area:"",
        bs_city:"",
        bs_state:"",


    });
    const [socialLinks, setSocialLinks] = useState({
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultBsId = "default-id"; 

    useEffect(() => {
        const finalBsId = bs_id || defaultBsId;

        const fetchFooterData = async () => {
            try {
                setLoading(true);
                const [aboutResponse, contactResponse, socialResponse] = await Promise.all([
                    fetchAbout(finalBsId),
                    fetchContact(finalBsId),
                    fetchSociallink(finalBsId)
                ]);

                console.log("About Response:", aboutResponse);
                console.log("Contact Response:", contactResponse);
                console.log("Social Links Response:", socialResponse);

                // Handle About Data
                if (aboutResponse.status === true) {
                    setData(aboutResponse.data[0]); 
                } else {
                    setData({ bs_business_name: "Default Title", bs_desc: "Default Description" });
                }

                // Handle Contact Data
                if (contactResponse?.status && contactResponse?.data?.length > 0) {
                    const contact = contactResponse.data.find(contact => contact._id === finalBsId);
                    if (contact) {
                        setContactInfo({
                            bs_business_name: contact.bs_business_name || "No Name Provided",
                            bs_email: contact.bs_email || "No Email Provided",
                            bs_business_phone: contact.bs_business_phone || "No Phone Provided",
                            bs_address: `${contact.bs_area || ""}, ${contact.bs_city || ""}, ${contact.bs_state || ""}` || "No Address Provided",
                        });
                    }
                }

                // Handle Social Links Data
                if (socialResponse.status === true && socialResponse.data.length > 0) {
                    const socialData = socialResponse.data.reduce((acc, curr) => {
                        const platformName = curr.platform_name.toLowerCase();
                        if (platformName) {
                            acc[platformName] = curr.platform_url;
                        }
                        return acc;
                    }, {});
                    setSocialLinks(socialData);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchFooterData();
    }, [bs_id]);

    const { facebook, twitter, instagram, linkedin } = socialLinks;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <style>
                {`
                    .footer-container {
                        background-color: #1e1e2f;
                        color: #ffffff;
                        padding-top: 3rem;
                        padding-bottom: 3rem;
                    }
                    .footer-title {
                        color:#a08dff;
                        font-weight: bold;
                        margin-bottom: 1rem;
                    }
                    .footer-link {
                        color: #ffffff;
                        text-decoration: none;
                        display: inline-block;
                        margin-bottom: 0.5rem;
                        transition: color 0.3s ease-in-out;
                    }
                    .footer-link:hover {
                        color:#a08dff;
                    }
                    .footer-icon {
                        color: #ffffff;
                        transition: background-color 0.3s, color 0.3s;
                        border: 1px solid#a08dff;
                    }
                    .footer-icon:hover {
                        background-color:hsl(250, 100.00%, 77.60%);
                        color: #ffffff;
                    }
                    .footer-divider {
                        border-top: 1px solid #444;
                        margin-top: 2rem;
                        padding-top: 1rem;
                        color: #aaa;
                    }
                `}
            </style>

            <div className="container-fluid footer-container">
                <div className="container">
                    <div className="row g-5">
                        {/* Business Details */}
                        <div className="col-lg-4">
                            <h4 className="footer-title">Digital Solutions Co.</h4>
                            <p>
                                We provide innovative and reliable tech solutions for startups and enterprises. Empowering digital growth.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-4">
                            <h4 className="footer-title">Quick Links</h4>
                            <div className="d-flex flex-column">
                                {["Home", "Services", "About Us", "Products", "Reviews", "Contact Us"].map((item, index) => (
                                    <a key={index} href="#" className="footer-link">
                                        <i className="fas fa-angle-right me-2"></i>{item}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-4">
                            <h4 className="footer-title">Contact Info</h4>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="fa fa-user me-2" style={{ color: "#a08dff" }}></i>
                                    Digital Solutions Co.
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-envelope me-2" style={{ color: "#a08dff" }}></i>
                                    hello@digitalsolutions.com
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-phone me-2" style={{ color: "#a08dff" }}></i>
                                    +91 9876543210
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-map-marker-alt me-2" style={{ color: "#a08dff" }}></i>
                                    101 Tech Lane, Sector 12, Bengaluru, Karnataka
                                </li>
                            </ul>

                            {/* Social Media Icons */}
                            <div className="d-flex mt-3">
                                <a className="btn btn-md footer-icon me-2 rounded-circle" href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-md footer-icon me-2 rounded-circle" href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-md footer-icon me-2 rounded-circle" href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a className="btn btn-md footer-icon me-0 rounded-circle" href="#" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="text-center footer-divider mt-4">
                        <p className="mb-0">
                            © 2025 <span style={{ color: "#a08dff" }}>Digital Solutions Co.</span> All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Footer;
