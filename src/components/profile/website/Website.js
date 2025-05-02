import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import websiteImage from '../../../assets/profile/images/website.jpg';
import Profilenav from '../profilenav/Profilenav';
import { viewWebsite, updateWebsite, addWebsite } from './Service'; // Ensure addWebsite function is in Service

const Website = () => {
    let { id } = useParams();
    id = id || "67a46179a78c0e06377d3527";

    const [data, setData] = useState(null); // Use null to differentiate between no data and an empty object
    const [websiteURL, setWebsiteURL] = useState("");

    useEffect(() => {
        const fetchWebsiteDetails = async () => {
            if (!id) return;
            try {
                const response = await viewWebsite(id);
                if (response?.data?.data) {
                    setData(response.data.data);
                    setWebsiteURL(response.data.data.website_url || ""); // Populate URL if available
                } else {
                    setData(null); // No existing data
                }
            } catch (error) {
                console.error("Error fetching website details:", error);
            }
        };
        fetchWebsiteDetails();
    }, [id]);

    const handleInputChange = (e) => {
        setWebsiteURL(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (data) {
                // If data exists, update the website
                response = await updateWebsite({ id, website_url: websiteURL });
            } else {
                // If no data, create a new website entry
                response = await addWebsite({ id, website_url: websiteURL });
            }

            if (response?.status === 200 || response?.status === 201) {
                alert("✅ Website updated successfully!");
            } else {
                alert("❌ Failed to update website.");
            }
        } catch (error) {
            console.error("Error saving website:", error);
            alert("⚠️ An error occurred while saving the website.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container website-container mt-5">
                <div className="row">
                <div className="col-md-6 img-fluid-rounded p-3">
  <img
    src={websiteImage}
    alt="Add Website"
    className="img-fluid w-100 h-100"
    style={{ objectFit: "cover", maxHeight: "400px" }}
  />
</div>


                    <div className="col-md-6 website" style={{backgroundColor:"#a071fd"}}>
                        <p className="page-heading">{data ? "Update Your Website" : "Add Your Website"}</p>

                        <form id="websiteForm" onSubmit={handleSubmit}>
                            <div className="form-card-website">
                                <div className="form-group">
                                    <label className="website-label" htmlFor="websiteURL">Website URL</label>
                                    <input
                                        className="website-input"
                                        type="text"
                                        id="websiteURL"
                                        name="website_url"
                                        value={websiteURL}
                                        onChange={handleInputChange}
                                        placeholder="Enter the website URL (e.g., http://www.example.com)"
                                        required
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn-save" style={{backgroundColor:"#a071fd"}}>
                                        {data ? "Update Website" : "Add Website"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Website;
