import React from 'react';
import hotelImage from '../../../assets/profile/images/hotel1.jpg';
import Profilenav from '../profilenav/Profilenav';
import { useState, useEffect } from 'react';
import { addFacilitys, updateFacilitys, deleteFacilitys, viewFacilitys, viewAllFacilitys } from "./Service";
import { WEB_API } from '../../../common/constant';


const Facilitys = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [facilities, setFacilities] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFacilityId, setSelectedFacilityId] = useState(null);
    const [newView, setNewView] = useState(false);

    const [formData, setFormData] = useState({
        facility_name: "",
        facility_desp: "",
        facility_img: "",
    });

    useEffect(() => {

        fetchAllFacilities();
    }, []);

    const fetchAllFacilities = async () => {
        try {
            const response = await viewAllFacilitys();
            if (response?.data) {
                setFacilities(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching facilities:", error);
            setErrorMessage("Failed to fetch facilities.");
        }
    };

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            convertToBase64(files[0], name);
            setNewView(true);

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
            let updatedData = { ...formData };

            if (editMode && !newView) {
                delete updatedData.facility_img;
            }
            let response;
            if (editMode && selectedFacilityId) {
                response = await updateFacilitys(selectedFacilityId, updatedData);
                if (response?.status === 200) {

                    alert("Facility updated successfully!");
                } else {
                    alert("Failed to update facility.");
                }
            } else {
                response = await addFacilitys(updatedData);
                if (response?.status === 200) {

                    alert("Facility added successfully!");
                } else {
                    alert("Failed to add facility.");
                }
            }
            fetchAllFacilities()

            setEditMode(false);
            setSelectedFacilityId(null);
            setFormData({ facility_name: "", facility_desp: "", facility_img: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting facility:", error);
            alert("Failed to update facility. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (facility) => {
        setFormData({
            facility_name: facility.facility_name,
            facility_desp: facility.facility_desp,
            facility_img: facility.facility_img,
        });
        setEditMode(true);
        setSelectedFacilityId(facility._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this facility?")) return;
        try {
            const response = await deleteFacilitys(id);
            if (response.status === 200) {
                setFacilities((prevFacilities) => prevFacilities.filter((facility) => facility._id !== id));
                alert("Facility deleted successfully!");
            } else {
                alert("Failed to delete facility.");
            }
        } catch (error) {
            console.error("Error deleting facility:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container website-container mt-5">
                <div className="row">
                   <div className="col-md-5 restorent-img p-3">
  <img
    src={hotelImage}
    alt="Add Website"
    className="img-fluid w-100"
    style={{ objectFit: "cover", height: "100%", maxHeight: "500px" }}
  />
</div>

                    <div className="col-md-7 website">
                    <div className="amenity-heading" style={{ backgroundColor: "#a071fd" }}> Add Facility</div>

                        <form className="amenity-form" onSubmit={handleSubmit}>
                            <label className="amenity-label" htmlFor="facility-name">Facility Name:</label>
                            <input
                                className="amenity-input"
                                type="text"
                                id="facility-name"
                                name="facility_name"
                                value={formData.facility_name}
                                onChange={handleChange}
                                placeholder="Enter facility name"
                                required
                            />

                            <label className="amenity-label" htmlFor="facility-description">Description:</label>
                            <textarea
                                className="amenity-textarea"
                                id="facility-description"
                                name="facility_desp"
                                value={formData.facility_desp}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Enter a short description of the facility"
                                required
                            ></textarea>

                            <label className="amenity-label" htmlFor="facility-icon">Upload Image:</label>
                            <input
                                className="amenity-input"
                                type="file"
                                id="facility-icon"
                                name="facility_img"
                                accept="image/*"
                                onChange={handleFileChange}
                                required={!editMode}
                            />

                            <img
                                src={newView ? formData.facility_img : `${WEB_API}${formData.facility_img}`}
                                alt=""
                                width="100"
                            />

                            {/* <label className="amenity-label" htmlFor="facility-status">Status:</label>
                    <select
                        className="amenity-select"
                        id="facility-status"
                        name="is_status"
                        value={formData.is_status}
                        onChange={handleChange}
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select> */}

                            <div className="text-center">
                                <button type="submit" className="btn-save" style={{backgroundColor:"#a071fd"}} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
<br></br><br></br>
            <div className="container mt-5">
                <h4 className="text-center">Facility Details</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Facility Name</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Image</th>
                            {/* <th className="text-center">Status</th> */}
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facilities.length > 0 ? facilities.map((facility, index) => (
                            <tr key={index}>
                                <td>{facility.facility_name}</td>
                                <td>{facility.facility_desp}</td>
                                <td><img src={`${WEB_API}${facility.facility_img}`} alt="facility" width="100" /></td>
                                {/* <td>{facility.is_status}</td> */}
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(facility)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(facility._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center">No facilities available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div><br></br><br></br> 
                  </>
    );
}

export default Facilitys;
