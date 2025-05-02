import React, { useState, useEffect } from 'react';
import { addOffers, updateOffers, deleteOffers, viewAllOffers, viewOffers } from "./Service";
import Profilenav from '../profilenav/Profilenav';

const Offers = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [offers, setOffers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);

    const [formData, setFormData] = useState({
        offer_title: "",
        offer_description: "",
        offer_type: "",
        offer_code: "",
        offer_start_date: "",
        offer_end_date: ""
    });

    useEffect(() => {
            fetchAllOffers();
    }, []);

    const fetchAllOffers = async () => {
        try {
            const response = await viewAllOffers();
            if (response?.data) {
                setOffers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
            setErrorMessage("Failed to fetch offers.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
    
        try {
            let response;
            if (editMode && selectedOfferId) {
                response = await updateOffers(selectedOfferId, formData);
                if (response?.status === 200) {
                    alert("Offer updated successfully!");
                } else {
                    alert("Failed to update offer.");
                }
            } else {
                response = await addOffers(formData);
                if (response?.status === 200) {
                    alert("Offer added successfully!");
                } else {
                    alert("Failed to add offer.");
                }
            }
    
            // Fetch updated offer list
            fetchAllOffers();
        } catch (error) {
            console.error("Error submitting offer:", error);
            setErrorMessage("Failed to submit offer. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleView = (offer) => {
        setFormData({
            offer_title: offer.offer_title,
            offer_description: offer.offer_description,
            offer_type: offer.offer_type,
            offer_code: offer.offer_code,
            offer_start_date: offer.offer_start_date,
            offer_end_date: offer.offer_end_date
        });
        setEditMode(true);
        setSelectedOfferId(offer._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this offer?")) return;
        try {
            const response = await deleteOffers(id);
            if (response.status === 200) {
                setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== id));
                alert("Offer deleted successfully!");
            } else {
                alert("Failed to delete offer.");
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container website-container mt-5">
                <div className="row justify-content-center">

                    <div className="col-md-6 website">
                        <h2 className="amenity-heading">Create New Offer</h2>

                        <form className="amenity-form" onSubmit={handleSubmit}>
                            <label className="amenity-label" htmlFor="offerTitle">Offer Title:</label>
                            <input
                                className="amenity-input"
                                type="text"
                                id="offerTitle"
                                name="offer_title"
                                value={formData.offer_title}
                                onChange={handleChange}
                                placeholder="Enter offer title"
                                required
                            />

                            <label className="amenity-label" htmlFor="offerDescription">Description:</label>
                            <textarea
                                className="amenity-textarea"
                                id="offerDescription"
                                name="offer_description"
                                value={formData.offer_description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the offer in detail"
                                required
                            ></textarea>

                            <label className="amenity-label" htmlFor="offerType">Offer Type:</label>
                            <select
                                className="amenity-select"
                                id="offerType"
                                name="offer_type"
                                value={formData.offer_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Offer Type</option>
                                <option value="discount">Discount</option>
                                <option value="free_shipping">Free Shipping</option>
                                <option value="buy_one_get_one">Buy One Get One</option>
                            </select>

                            <label className="amenity-label" htmlFor="offerCode">Offer Code (Optional):</label>
                            <input
                                className="amenity-input"
                                type="text"
                                id="offerCode"
                                name="offer_code"
                                value={formData.offer_code}
                                onChange={handleChange}
                                placeholder="Enter a promotional code (if any)"
                            />

                            <div className="row">
                                <div className="col-md-6">
                                    <label className="amenity-label" htmlFor="startDate">Start Date:</label>
                                    <input
                                        className="amenity-input"
                                        type="date"
                                        id="startDate"
                                        name="offer_start_date"
                                        value={formData.offer_start_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="amenity-label" htmlFor="endDate">End Date:</label>
                                    <input
                                        className="amenity-input"
                                        type="date"
                                        id="endDate"
                                        name="offer_end_date"
                                        value={formData.offer_end_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn-save" disabled={loading}>
                                    {loading ? <span>submitting</span> : "Create Offer"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-center">Offer Details</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Offer Title</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Offer Type</th>
                            <th className="text-center">Offer Code</th>
                            <th className="text-center">Start Date</th>
                            <th className="text-center">End Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.length > 0 ? offers.map((offer, index) => (
                            <tr key={index}>
                                <td>{offer.offer_title}</td>
                                <td>{offer.offer_description}</td>
                                <td>{offer.offer_type}</td>
                                <td>{offer.offer_code}</td>
                                <td>{offer.offer_start_date}</td>
                                <td>{offer.offer_end_date}</td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(offer)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(offer._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center">No offers available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Offers;
