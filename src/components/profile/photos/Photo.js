import React, { useState, useEffect } from "react";
import Profilenav from "../profilenav/Profilenav";
import Addphoto from "../../../assets/profile/images/3.png";
import { WEB_API } from "../../../common/constant";
import { addPhotos, viewAllPhotos, deletePhotos, updatePhotos } from "./Service";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingPhotoId, setEditingPhotoId] = useState(null); 
    const [newView, setNewView] = useState(false); 

    const [formData, setFormData] = useState({
        ph_path: "",
    });

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        try {
            const response = await viewAllPhotos();
            if (response?.data) {
                setPhotos(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
            setErrorMessage("Failed to fetch photos.");
        }
    };

    const convertToBase64 = (file, fieldName) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: reader.result,
            }));
            setNewView(true);
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            convertToBase64(files[0], name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!formData.ph_path) {
            setErrorMessage("Please select a photo.");
            setLoading(false);
            return;
        }

        try {
            let response;
            if (editingPhotoId) {
                response = await updatePhotos(editingPhotoId, formData);
            } else {
                response = await addPhotos(formData);
            }

            if (response?.status === 200) {
                alert(editingPhotoId ? "Photo updated successfully!" : "Photo uploaded successfully!");
                fetchPhotos();
                setEditingPhotoId(null);
            } else {
                alert("Failed to process the request.");
            }

            setFormData({ ph_path: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error processing photo:", error);
            setErrorMessage("Failed to process request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (photo) => {
        setEditingPhotoId(photo._id);
        setFormData({ ph_path: photo.ph_path });
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this photo?")) return;
        try {
            const response = await deletePhotos(id);
            if (response.status === 200) {
                setPhotos((prev) => prev.filter((photo) => photo._id !== id));
                alert("Photo deleted successfully!");
            } else {
                alert("Failed to delete photo.");
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className=" container container-main mt-4">
                <div className="image-side text-center">
                    <img src={Addphoto} alt="Upload" className="img-fluid"/>
                </div>

                <div className="form-side">
                    <div className="card">
                        <div className="card-header text-center text-white" style={{backgroundColor:"#a071fd"}}>
                            <h4>{editingPhotoId ? "Update Photo" : "Upload Photo for Business Premises"}</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Select Photo</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        accept="image/png, image/jpeg" 
                                        name="ph_path" 
                                        onChange={handleFileChange} 
                                        required={!editingPhotoId} 
                                    />
                                </div>

                                {formData.ph_path && (
                                    <div className="text-center mb-3">
                                        <img
                                            src={newView ? formData.ph_path : `${WEB_API}${formData.ph_path}`}
                                            alt="Preview"
                                            width="100"
                                        />
                                    </div>
                                )}

                                <div className="text-center">
                                    <button type="submit" className="btn-save" style={{backgroundColor:"#a071fd"}} disabled={loading}>
                                        {loading ? "Submitting..." : editingPhotoId ? "Update" : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table for displaying photos */}
            <div className="container mt-5 text-center">
                <h4>Uploaded Photos</h4>
                <div className="table-responsive d-flex justify-content-center">
                    <table className="time-table table-bordered shadow-lg mt-3" >
                        <thead>
                            <tr>
                                <th className="text-center">Photo</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {photos.length > 0 ? photos.map((photo, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={`${WEB_API}${photo.ph_path}`} alt="Uploaded" width="100" height="100" />
                                    </td>
                                    <td>
                                        <button className="btn  btn-lg me-2" onClick={() => handleEdit(photo)}>✏️</button>
                                        <button className="btn  btn-lg" onClick={() => handleDelete(photo._id)}>🗑️</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No photos available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Photos;
