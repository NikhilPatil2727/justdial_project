import React, { useState, useEffect } from "react";
import Profilenav from "../profilenav/Profilenav";
import businessImage from "../../../assets/profile/images/3.png";
import { WEB_API } from "../../../common/constant";
import { addVideos, viewAllVideos, deleteVideos, updateVideos } from "./Service";

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingVideoId, setEditingVideoId] = useState(null);
    const [newView, setNewView] = useState(false);
    
    const [formData, setFormData] = useState({
        vd_path: "",
    });

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await viewAllVideos();
            if (response?.data) {
                setVideos(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
            setErrorMessage("Failed to fetch videos.");
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
            const file = files[0];
    
            if (file.size > 20 * 1024 * 1024) {
                setErrorMessage("File size must be 20MB or less.");
                return;
            }
    
            convertToBase64(file, name);
            setErrorMessage(null); 
            
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!formData.vd_path) {
            setErrorMessage("Please select a video.");
            setLoading(false);
            return;
        }

        try {
            let response;
            if (editingVideoId) {
                response = await updateVideos(editingVideoId, formData);
            } else {
                response = await addVideos(formData);
            }

            if (response?.status === 200) {
                alert(editingVideoId ? "Video updated successfully!" : "Video uploaded successfully!");
                fetchVideos();
                setEditingVideoId(null);
            } else {
                alert("Failed to process the request.");
            }

            setFormData({ vd_path: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error processing video:", error);
            setErrorMessage("Failed to process request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (video) => {
        setEditingVideoId(video._id);
        setFormData({ vd_path: video.vd_path });
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;
        try {
            const response = await deleteVideos(id);
            if (response.status === 200) {
                setVideos((prev) => prev.filter((video) => video._id !== id));
                alert("Video deleted successfully!");
            } else {
                alert("Failed to delete video.");
            }
        } catch (error) {
            console.error("Error deleting video:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container-main mt-4">
                <div className="image-side text-center">
                    <img src={businessImage} alt="Upload" className="img-fluid" />
                </div>

                <div className="form-side">
                    <div className="card">
                        <div className="card-header text-center text-white">
                            <h4>{editingVideoId ? "Update Video" : "Upload Video for Business Premises"}</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Select Video</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        accept="video/*" 
                                        name="vd_path" 
                                        onChange={handleFileChange} 
                                        required={!editingVideoId} 
                                    />
                                </div>

                                {formData.vd_path && (
                                    <div className="text-center mb-3">
                                        <video width="200" controls>
                                            <source src={newView ? formData.vd_path : `${WEB_API}${formData.vd_path}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}

                                <div className="text-center">
                                    <button type="submit" className="btn-save" disabled={loading}>
                                        {loading ? "Submitting..." : editingVideoId ? "Update" : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 text-center">
                <h4>Uploaded Videos</h4>
                <div className="table-responsive d-flex justify-content-center">
                    <table className="table table-bordered shadow-lg mt-3">
                        <thead>
                            <tr>
                                <th className="text-center">Video</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videos.length > 0 ? videos.map((video, index) => (
                                <tr key={index}>
                                    <td>
                                        <video width="100" height="100" controls>
                                            <source src={`${WEB_API}${video.vd_path}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => handleEdit(video)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(video._id)}>Delete</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No videos available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Videos;
