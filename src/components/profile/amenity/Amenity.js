import React, { useState, useEffect } from 'react';
import restaurentImage from '../../../assets/profile/images/restorent.jpg';
import Profilenav from '../profilenav/Profilenav';
import { WEB_API } from "../../../common/constant";
import { addAmenity, updateAmenity, deleteAmenity, viewAllAmenity } from "./Service";

const Amenity = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [amenities, setAmenities] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedAmenityId, setSelectedAmenityId] = useState(null);
    const [newView, setNewView] = useState(false);

    const [formData, setFormData] = useState({
        amenity_name: "",
        amenity_des: "",
        amenity_img: "",
    });

    const convertToBase64 = (file, fieldName) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {    
        fetchAmenities();
    }, []);

    const fetchAmenities = async () => {
        try {
            const response = await viewAllAmenity();
            if (response?.data) {
                setAmenities(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching amenities:", error);
            setErrorMessage("Failed to fetch amenities.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            convertToBase64(files[0], name);
            setNewView(true); 
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
    
        try {
            let updatedData = { ...formData };
    
            if (editMode && !newView) {
                delete updatedData.amenity_img;
            }
    
            let response;
            if (editMode && selectedAmenityId) {
                response = await updateAmenity(selectedAmenityId, updatedData);
                if (response?.status === 200) {
                    alert("Amenity updated successfully!");
                } else {
                    alert("Failed to update amenity.");
                }
            } else {
                response = await addAmenity(updatedData);
                if (response?.status === 200) {
                    alert("Amenity added successfully!");
                } else {
                    alert("Failed to add amenity.");
                }
            }
    
            fetchAmenities(); 
    
            setEditMode(false);
            setSelectedAmenityId(null);
            setFormData({ amenity_name: "", amenity_des: "", amenity_img: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting amenity:", error);
            alert("Failed to update amenity. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    


    const handleView = (amenity) => {
        setFormData({
            amenity_name: amenity.amenity_name,
            amenity_des: amenity.amenity_des,
            amenity_img: amenity.amenity_img,
        });
        setEditMode(true);
        setSelectedAmenityId(amenity._id);
        setNewView(false);
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this amenity?")) return;
        try {
            const response = await deleteAmenity(id);
            if (response.status === 200) {
                setAmenities((prevAmenities) => prevAmenities.filter((amenity) => amenity._id !== id));
                alert("Amenity deleted successfully!");
            } else {
                alert("Failed to delete amenity.");
            }
        } catch (error) {
            console.error("Error deleting amenity:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container website-container mt-5">
    <div className="row">
        <div className="col-md-5 restorent-img">
            <img src={restaurentImage} height="500px" width="328px" alt="Add Amenity" />
        </div>
        <div className="col-md-7">
            <div className="card shadow-lg">
                <div className="card-header text-white text-center" style={{ backgroundColor: "#a071fd" }}>
                    <h4 className="mb-0">Add Amenity</h4>
                </div>
                <div className="card-body">
                    <form className="amenity-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="amenity-name"><strong>Amenity Name:</strong></label>
                            <input
                                className="form-control"
                                type="text"
                                id="amenity-name"
                                name="amenity_name"
                                value={formData.amenity_name}
                                onChange={handleChange}
                                placeholder="Enter amenity name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="amenity-description"><strong>Description:</strong></label>
                            <textarea
                                className="form-control"
                                id="amenity-description"
                                name="amenity_des"
                                value={formData.amenity_des}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter a short description of the amenity"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="amenity-icon"><strong>Upload Image:</strong></label>
                            <input
                                className="form-control"
                                type="file"
                                id="amenity-icon"
                                name="amenity_img"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                required={!editMode}
                            />
                        </div>

                        {formData.amenity_img && (
                            <div className="mb-3">
                                <img
                                    src={newView ? formData.amenity_img : `${WEB_API}${formData.amenity_img}`}
                                    alt="Preview"
                                    width="100"
                                />
                            </div>
                        )}

                        <div className="text-center">
                       <button type="submit" className="btn btn-save" style={{backgroundColor:"#a071fd"}} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


            <div className=" container mt-5">
                <h4 className="text-center">Amenity Details</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Amenity Name</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Image</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {amenities.length > 0 ? amenities.map((amenity, index) => (
                            <tr key={index}>
                                <td>{amenity.amenity_name}</td>
                                <td>{amenity.amenity_des}</td>
                                <td><img src={`${WEB_API}${amenity.amenity_img}`} alt="Amenity" width="100" />
                                </td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(amenity)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(amenity._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center">No amenities available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Amenity;
