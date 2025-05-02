import React, { useState, useEffect } from 'react';
import socialImage from '../../../assets/profile/images/social1.jpg';
import Profilenav from '../profilenav/Profilenav';
import { addSociallink, updateSociallink, deleteSociallink, viewAllSociallink } from "./Service";

const Sociallink = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [timings, setTimings] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedTimingId, setSelectedTimingId] = useState(null);

    const [formData, setFormData] = useState({
        platform_name: "",
        platform_url: "",
    });

    useEffect(() => {
        const fetchAllTimings = async () => {
            try {
                const response = await viewAllSociallink();
                if (response?.data) {
                    setTimings(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching social links:", error);
                setErrorMessage("Failed to fetch social links.");
            }
        };
        fetchAllTimings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            let response;
            if (editMode && selectedTimingId) {
                response = await updateSociallink(selectedTimingId, formData);
                if (response?.status === 200) {
                    setTimings((prevTimings) =>
                        prevTimings.map((timing) =>
                            timing._id === selectedTimingId ? { ...timing, ...formData } : timing
                        )
                    );
                    setSuccessMessage("Social link updated successfully!");
                } else {
                    setErrorMessage("Failed to update social link.");
                }
            } else {
                response = await addSociallink(formData);
                if (response?.status === 200) {
                    setTimings((prevTimings) => [...prevTimings, response.data]);
                    setSuccessMessage("Social link added successfully!");
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    setErrorMessage("Failed to add social link.");
                }
            }

            setEditMode(false);
            setSelectedTimingId(null);
        } catch (error) {
            console.error("Error submitting social link:", error);
            setErrorMessage("Failed to update social link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (timing) => {
        setFormData({
            platform_name: timing.platform_name,
            platform_url: timing.platform_url,
        });
        setEditMode(true);
        setSelectedTimingId(timing._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this social link?")) return;
        try {
            const response = await deleteSociallink(id);
            if (response.status === 200) {
                setTimings((prevTimings) => prevTimings.filter((timing) => timing._id !== id));
                alert("Social link deleted successfully!");
            } else {
                alert("Failed to delete social link.");
            }
        } catch (error) {
            console.error("Error deleting social link:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <img src={socialImage} height="300px" width="300px" alt="Social Media" />
                    </div>
                    <div className="col-md-6 form-card mb-5">
                        <div className="card-header text-center text-white" style={{backgroundColor:"#a071fd"}}>
                            <h4>Social Media Links</h4>
                        </div>
                        <div className="social-media-links mt-3">
                            <div className="form-group">
                                <label>Select Social Media Platform:</label>
                                <select className="form-control" name="platform_name" onChange={handleChange} value={formData.platform_name}>
                                    <option value="">-- Select Platform --</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="LinkedIn">LinkedIn</option>
                                    <option value="YouTube">YouTube</option>
                                </select>
                            </div>
                            {formData.platform_name && (
                                <div className="mt-3">
                                    <label>Enter {formData.platform_name} Page URL:</label>
                                    <input
                                        type="text"
                                        className="form-control social-input"
                                        name="platform_url"
                                        placeholder={`Enter ${formData.platform_name} Business Page URL`}
                                        value={formData.platform_url}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-save" style={{backgroundColor:"#a071fd"}} onClick={handleSave} disabled={loading}>
                                {loading ? "" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h4 className="text-center"> Social Media</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Platform</th>
                            <th className="text-center">URL</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timings.length > 0 ? timings.map((timing, index) => (
                            <tr key={index}>
                                <td>{timing.platform_name}</td>
                                <td>{timing.platform_url}</td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(timing)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(timing._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="text-center">No social links available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Sociallink;
