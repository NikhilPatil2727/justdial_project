import React, { useState, useEffect } from 'react';
import PackageImage from '../../../assets/profile/images/health.jpg';
import Profilenav from '../profilenav/Profilenav';
import { addHealthPackage, updateHealthPackage, viewAllHealthPackages, deleteHealthPackage } from "./Service";
import { WEB_API } from '../../../common/constant';

const HealthPackage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [packages, setPackages] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [newView, setNewView] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        hpck_name: "",
        hpck_price: "",
        hpck_desc: "",
        hpck_img: ""
    });
    

    useEffect(() => {
        fetchAllHealthPackages();
    }, []);

    const fetchAllHealthPackages = async () => {
        try {
            const response = await viewAllHealthPackages();
            if (response?.data) {
                setPackages(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching health packages:", error);
            setErrorMessage("Failed to fetch health packages.");
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
        if (!formData.hpck_name.trim()) tempErrors.hpck_name = "Package name is required.";
        if (!formData.hpck_desc.trim()) tempErrors.hpck_desc = "Package description is required.";
        if (!String(formData.hpck_price).trim()) {
            tempErrors.hpck_price = "Package price is required.";
        } else if (isNaN(formData.hpck_price) || Number(formData.hpck_price) <= 0) {
            tempErrors.hpck_price = "Enter a valid price.";
        }
        if (!editMode && !formData.hpck_img) tempErrors.hpck_img = "Package image is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            let updatedData = { ...formData };

            if (editMode && !newView) {
                delete updatedData.hpck_img;
            }

            let response;
            if (editMode && selectedPackageId) {
                response = await updateHealthPackage(selectedPackageId, updatedData);
            } else {
                response = await addHealthPackage(updatedData);
            }

            if (response?.status === 200) {
                alert(editMode ? "Package updated successfully!" : "Package added successfully!");
                fetchAllHealthPackages();
                setEditMode(false);
                setSelectedPackageId(null);
                setFormData({ hpck_name: "", hpck_price: "", hpck_desc: "", hpck_img: "" });
                setNewView(false);
            } else {
                alert("Failed to process request.");
            }
        } catch (error) {
            console.error("Error submitting health package:", error);
            alert("Failed to update package. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (pkg) => {
        setFormData({
            hpck_name: pkg.hpck_name,
            hpck_price: pkg.hpck_price,
            hpck_desc: pkg.hpck_desc,
            hpck_img: pkg.hpck_img,
        });
        setEditMode(true);
        setSelectedPackageId(pkg._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        try {
            const response = await deleteHealthPackage(id);
            if (response.status === 200) {
                setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== id));
                alert("Package deleted successfully!");
            } else {
                alert("Failed to delete package.");
            }
        } catch (error) {
            console.error("Error deleting health package:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container mt-5">
            <div className="row">
                <div className="col-md-5 text-center ">
                    <img src={PackageImage} alt="Health Package" style={{ height: '500px', width:'400px' }} className="img-fluid rounded shadow-sm" />
                </div>

                <div className="col-md-7">
                    <div className="card shadow">
                        <div className="card-header text-center" style={{ backgroundColor: '#a071fd' }}>
                            <h4 className="text-white">Health Package</h4>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="font-weight-bold">Package Name</label>
                                    <input type="text" name="hpck_name" className="form-control" placeholder="Enter package name" value={formData.hpck_name} onChange={handleChange} required />
                                    {errors.hpck_name && <small className="text-danger">{errors.hpck_name}</small>}
                                </div>

                                <div className="form-group">
                                    <label className="font-weight-bold">Description</label>
                                    <textarea name="hpck_desc" className="form-control" rows="4" placeholder="Enter description" value={formData.hpck_desc} onChange={handleChange} required></textarea>
                                    {errors.hpck_desc && <small className="text-danger">{errors.hpck_desc}</small>}
                                </div>

                                <div className="form-group">
                                    <label className="font-weight-bold">Price</label>
                                    <input type="text" name="hpck_price" className="form-control" placeholder="Enter price" value={formData.hpck_price} onChange={handleChange} required />
                                    {errors.hpck_price && <small className="text-danger">{errors.hpck_price}</small>}
                                </div>

                                <div className="form-group">
  <label className="font-weight-bold">Upload Package Image</label>
  <input
    type="file"
    name="hpck_img"
    className="form-control"
    onChange={handleFileChange}
    required={!editMode}
  />
  {errors.hpck_img && <small className="text-danger">{errors.hpck_img}</small>}
</div>

                                {formData.hpck_img && (
                                    <img src={newView ? formData.hpck_img : `${WEB_API}${formData.hpck_img}`} alt="" width="100" />
                                )}

                                <div className="text-center">
                                    <button type="submit" className="btn btn-save" style={{backgroundColor:"#a071fd"}}>{editMode ? "Update" : "Add"} Package</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div><br></br><br></br>
            <div className="container mt-5"  style={{overflowX:"auto"}}>
                <h4 className="text-center">Health Packages</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.length > 0 ? packages.map((pkg) => (
                            <tr key={pkg._id}>
                                <td>{pkg.hpck_name}</td>
                                <td>{pkg.hpck_price}</td>
                                <td>{pkg.hpck_desc}</td>
                                <td><img src={`${WEB_API}${pkg.hpck_img}`} alt="health package" width="100" /></td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(pkg)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pkg._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5">No health packages available</td></tr>
                        )}
                    </tbody>
                </table>
            </div><br></br><br></br>
        </>
    );
};

export default HealthPackage;
