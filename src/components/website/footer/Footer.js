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
        <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
            <div className="container py-5">
                <div className="row g-5">
                    {/* Business Details Section */}
                    <div className="col-lg-4">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-white mb-4">{data?.bs_business_name || "Default Title"}</h4>
                            <p className="mb-4 fs-5">
                                {data?.bs_desc || "Default Description"}
                            </p>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-lg-4">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-white mb-4">Quick Links</h4>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Home</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Services</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> About Us</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Products</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Reviews</a>
                            <a href="#"><i className="fas fa-angle-right me-2"></i> Contact Us</a>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="col-lg-4">
                        <div className="footer-item d-flex flex-column">
                            <h4 className="text-white mb-4">Contact Info</h4>
                            <a href="#">
                                <i className="fa fa-user me-2"></i>
                                {contactInfo.bs_business_name || "No Name Provided"}
                            </a>
                            <a href="#">
                                <i className="fas fa-envelope me-2"></i>
                                {contactInfo.bs_email || "No Email Provided"}
                            </a>
                            <a href="#">
                                <i className="fas fa-phone me-2"></i>
                                {contactInfo.bs_business_phone || "No Phone Provided"}
                            </a>
                            <a href="#">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                {contactInfo.bs_address || "No Address Provided"} 
                            </a>

                            {/* Social Media Links Section */}
                            <div className="footer-btn d-flex align-items-center">
                                {facebook && (
                                    <a
                                        className="btn btn-secondary btn-md-square me-2"
                                        href={facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-facebook-f text-white"></i>
                                    </a>
                                )}
                                {twitter && (
                                    <a
                                        className="btn btn-secondary btn-md-square me-2"
                                        href={twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-twitter text-white"></i>
                                    </a>
                                )}
                                {instagram && (
                                    <a
                                        className="btn btn-secondary btn-md-square me-2"
                                        href={instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-instagram text-white"></i>
                                    </a>
                                )}
                                {linkedin && (
                                    <a
                                        className="btn btn-secondary btn-md-square me-0"
                                        href={linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-linkedin-in text-white"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
