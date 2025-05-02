import React, { useState, useEffect } from 'react';
import LabtestImage from '../../../assets/profile/images/img1.jpg';
import Profilenav from '../profilenav/Profilenav';
import { addLabtest, updateLabtest, viewAllLabtests, deleteLabtest } from "./Service";
import { WEB_API } from '../../../common/constant';

const Labtest = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [labtests, setLabtests] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedLabtestId, setSelectedLabtestId] = useState(null);
    const [newView, setNewView] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        lt_name: "",
        lt_price: "",
        lt_desc: "",
        lt_img: ""
    });

    useEffect(() => {
        fetchAllLabtests();
    }, []);

    const fetchAllLabtests = async () => {
        try {
            const response = await viewAllLabtests();
            if (response?.data) {
                setLabtests(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching lab tests:", error);
            setErrorMessage("Failed to fetch lab tests.");
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

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.lt_name.trim()) tempErrors.lt_name = "Lab test name is required.";
        if (!formData.lt_desc.trim()) tempErrors.lt_desc = "Lab test description is required.";
        if (!String(formData.lt_price).trim()) {
            tempErrors.lt_price = "Lab test price is required.";
        } else if (isNaN(formData.lt_price) || Number(formData.lt_price) <= 0) {
            tempErrors.lt_price = "Enter a valid price.";
        }
        if (!editMode && !formData.lt_img) tempErrors.lt_img = "Lab test image is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!validateForm()) return;

        try {
            let updatedData = { ...formData };

            if (editMode && !newView) {
                delete updatedData.lt_img;
            }

            let response;
            if (editMode && selectedLabtestId) {
                response = await updateLabtest(selectedLabtestId, updatedData);
                if (response?.status === 200) {
                    alert("Lab test updated successfully!");
                } else {
                    alert("Failed to update lab test.");
                }
            } else {
                response = await addLabtest(updatedData);
                if (response?.status === 200) {
                    alert("Lab test added successfully!");
                } else {
                    alert("Failed to add lab test.");
                }
            }

            fetchAllLabtests();
            setEditMode(false);
            setSelectedLabtestId(null);
            setFormData({ lt_name: "", lt_price: "", lt_desc: "", lt_img: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting lab test:", error);
            alert("Failed to update lab test. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (test) => {
        setFormData({
            lt_name: test.lt_name,
            lt_price: test.lt_price,
            lt_desc: test.lt_desc,
            lt_img: test.lt_img,
        });
        setEditMode(true);
        setSelectedLabtestId(test._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lab test?")) return;
        try {
            const response = await deleteLabtest(id);
            if (response.status === 200) {
                setLabtests((prevTests) => prevTests.filter((test) => test._id !== id));
                alert("Lab test deleted successfully!");
            } else {
                alert("Failed to delete lab test.");
            }
        } catch (error) {
            console.error("Error deleting lab test:", error);
            alert("An error occurred while deleting.");
        }
    };


    return (
        <>
            <Profilenav />
            <div className="container mt-5" >
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img src={LabtestImage} alt="Lab Test" style={{ height: '530px' }} className="img-fluid rounded shadow-sm" />
                    </div>

                    <div className="col-md-7">
                        <div className="card shadow">
                            <div className="card-header text-center" style={{ backgroundColor: '#a071fd' }}>
                                <h4 className="text-white">Lab Test</h4>
                            </div>

                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="lt_name" className="font-weight-bold">Test Name</label>
                                        <input
                                            type="text"
                                            id="lt_name"
                                            name="lt_name"
                                            className="form-control"
                                            value={formData.lt_name}
                                            onChange={handleChange}
                                            placeholder="Enter lab test name"
                                        />
                                         {errors.lt_name && <small className="text-danger">{errors.lt_name}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="lt_desc" className="font-weight-bold">Test Description</label>
                                        <textarea
                                            id="lt_desc"
                                            name="lt_desc"
                                            className="form-control"
                                            value={formData.lt_desc}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Enter description"
                                        ></textarea>
                                         {errors.lt_desc && <small className="text-danger">{errors.lt_desc}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lt_price" className="font-weight-bold">Price</label>
                                        <input
                                            type="text"
                                            id="lt_price"
                                            name="lt_price"
                                            className="form-control"
                                            value={formData.lt_price}
                                            onChange={handleChange}
                                            placeholder="Enter test price"
                                        />
                                         {errors.lt_price && <small className="text-danger">{errors.lt_price}</small>}
                                    </div>

                                    <div className="form-group">
                                     <label htmlFor="lt_img" className="font-weight-bold">Upload Test Image</label>
                                        <input
                                         type="file"
                                         id="lt_img"
                                          name="lt_img"
                                          className="form-control"
                                          onChange={handleFileChange}
                                          required={!editMode}
                                        />
                                     {errors.lt_img && <small className="text-danger">{errors.lt_img}</small>}
                                    </div>




                                    {formData.lt_img && (
                                        <img
                                            src={newView ? formData.lt_img : `${WEB_API}${formData.lt_img}`}
                                            alt=""
                                            width="100"
                                        />
                                    )}


                                    <div className="text-center">
                                        <button type="submit" className="btn btn-save" style={{backgroundColor:"#a071fd"}}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h4 className="text-center">Lab Test Details</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Test Name</th>
                            <th className="text-center">Test Price</th>
                            <th className="text-center">Test Description</th>
                            <th className="text-center">Test Image</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labtests.length > 0 ? labtests.map((test, index) => (
                            <tr key={index}>
                                <td>{test.lt_name}</td>
                                <td>{test.lt_price}</td>
                                <td>{test.lt_desc}</td>
                                <td><img src={`${WEB_API}${test.lt_img}`} alt="labtest" width="100" /></td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(test)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(test._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="text-center">No lab tests available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Labtest;