import { useState, useEffect } from "react";
import Profilenav from "../profilenav/Profilenav";
import LabtestImage from '../../../assets/profile/images/like.jpg';
import { addKeyFeature, updateKeyFeature, viewAllKeyFeatures, deleteKeyFeature } from "./Service";
import { WEB_API } from "../../../common/constant";

const KeyFeaturesForm = () => {
    const [loading, setLoading] = useState(false);
    const [keyFeatures, setKeyFeatures] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        kf_title: "",
        kf_description: ""
    });

    useEffect(() => {
        fetchAllKeyFeatures();
    }, []);

    const fetchAllKeyFeatures = async () => {
        try {
            const response = await viewAllKeyFeatures();
            if (response?.data) {
                setKeyFeatures(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching key features:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.kf_description.trim()) tempErrors.kf_description = "Description is required.";
        if (!formData.kf_title) tempErrors.kf_title = "Please select an option.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            let response;
            if (editMode && selectedFeatureId) {
                response = await updateKeyFeature(selectedFeatureId, formData);
            } else {
                response = await addKeyFeature(formData);
            }

            if (response?.status === 200) {
                alert(editMode ? "Keyfeatures updated successfully!" : "Keyfeatures added successfully!");
                fetchAllKeyFeatures();
                setEditMode(false);
                setSelectedFeatureId(null);
                setFormData({ kf_title: "", kf_description: "" });
            } else {
                alert("Failed to save Keyfeatures.");
            }
        } catch (error) {
            console.error("Error submitting key Keyfeatures:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = (feature) => {
        setFormData({
            kf_title: feature.kf_title,
            kf_description: feature.kf_description,
        });
        setEditMode(true);
        setSelectedFeatureId(feature._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this key feature?")) return;
        try {
            const response = await deleteKeyFeature(id);
            if (response?.status === 200) {
                setKeyFeatures((prevFeatures) => prevFeatures.filter((feature) => feature._id !== id));
                alert("Feature deleted successfully!");
            } else {
                alert("Failed to delete feature.");
            }
        } catch (error) {
            console.error("Error deleting feature:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-5 d-flex align-items-center justify-content-center">
                        <img 
                         src={LabtestImage} alt="Lab Test" style={{ height: '330px' }} className="img-fluid rounded shadow-sm"
                            
                        />
                    </div>

                    <div className="col-md-7">
                        <div className="form-container-biz p-4 shadow-lg">
                            <h4 className="text-center">{editMode ? "Edit Key Feature" : "Add New Key Feature"}</h4>
                            <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                    <label>Preference</label>
                                    <select name="kf_title" className="form-control" value={formData.kf_title} onChange={handleChange}>
                                        <option value="">Select</option>
                                        <option value="like">Like</option>
                                        <option value="dislike">Dislike</option>
                                    </select>
                                    {errors.kf_title && <small className="text-danger">{errors.kf_title}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="kf_description"
                                        className="form-control"
                                        rows="3"
                                        value={formData.kf_description}
                                        onChange={handleChange}
                                    />
                                    {errors.kf_description && <small className="text-danger">{errors.kf_description}</small>}
                                </div>

                               

                                <div className="text-center">
                                    <button type="submit" className="btn-save" style={{backgroundColor:"#a071fd"}}>
                                        {loading ? "Submitting..." : editMode ? "Update Feature" : "Add Feature"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h4 className="text-center">Key Features List</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Title</th>

                            <th className="text-center">Description</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {keyFeatures.length > 0 ? keyFeatures.map((feature, index) => (
                            <tr key={index}>
                                <td>{feature.kf_title}</td>                                
                                <td>{feature.kf_description}</td>
                                <td>
                                    <button className="btn  btn-lg" onClick={() => handleEdit(feature)}>✏️</button>
                                    <button className="btn  btn-lg" onClick={() => handleDelete(feature._id)}>🗑️ </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="text-center">No key features available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default KeyFeaturesForm;
