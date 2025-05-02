import React, { useState, useEffect } from 'react';
import productImage from '../../../assets/profile/images/1.jpg';
import Profilenav from '../profilenav/Profilenav';
import { WEB_API } from "../../../common/constant";
import { addServices, updateServices, viewAllServices, deleteServices } from './Service';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [newView, setNewView] = useState(false);

    const [formData, setFormData] = useState({
        sv_name: '',
        sv_desc: '',
        sv_price: '',
        sv_img: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await viewAllServices();
            if (response?.data) {
                setServices(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setErrorMessage("Failed to fetch services.");
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
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                delete updatedData.sv_img;
            }

            let response;
            if (editMode && selectedServiceId) {
                response = await updateServices(selectedServiceId, updatedData);
                if (response?.status === 200) {
                    alert("Service updated successfully!");
                } else {
                    alert("Failed to update service.");
                }
            } else {
                response = await addServices(updatedData);
                console.log(response)
                if (response?.status === 200) {
                    alert("Service added successfully!");
                } else {
                    alert("Failed to add service.");
                }
            }

            fetchServices();
            setEditMode(false);
            setSelectedServiceId(null);
            setFormData({ sv_name: '', sv_desc: '', sv_price: '', sv_img: '' });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting service:", error);
            alert("Failed to process service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setFormData({
            sv_name: service.sv_name,
            sv_desc: service.sv_desc,
            sv_price: service.sv_price,
            sv_img: service.sv_img,
        });
        setEditMode(true);
        setSelectedServiceId(service._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        try {
            const response = await deleteServices(id);
            if (response.status === 200) {
                setServices((prev) => prev.filter((service) => service._id !== id));
                alert("Service deleted successfully!");
            } else {
                alert("Failed to delete service.");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container mt-5" style={{overflowX:"hidden"}}>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={productImage} alt="Service" className="img-fluid rounded" style={{height:"500px", width:"500px"}}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header text-center" style={{ backgroundColor: '#a071fd' }}>
                                <h4 className="text-white">Services</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="font-weight-bold">Service Name</label>
                                        <input type="text" name="sv_name" className="form-control" value={formData.sv_name} onChange={handleChange} placeholder="Enter service name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold">Description</label>
                                        <textarea name="sv_desc" className="form-control" rows="4" value={formData.sv_desc} onChange={handleChange} placeholder="Enter description" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold">Price</label>
                                        <input type="text" name="sv_price" className="form-control" value={formData.sv_price} onChange={handleChange} placeholder="Enter price" required />
                                    </div>
                                    <div className="form-group">
                                       <label className="font-weight-bold">Upload Image</label>
                                        <input type="file" name="sv_img" className="form-control" onChange={handleFileChange}
        required={!editMode}
        style={{ padding: "10px" }}
    />
</div>


                                    {formData.sv_img && (
                                        <img
                                            src={newView ? formData.sv_img : `${WEB_API}${formData.sv_img}`}
                                            alt="Service Preview"
                                            width="100"
                                        />
                                    )}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-save" style={{backgroundColor:"#a071fd"}} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-5">
  <h4 className="text-center">Service Details</h4>

  <div className="table-responsive mt-3 shadow-lg">
    <table className="time-table table-bordered mb-0">
      <thead className="">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.length > 0 ? (
          services.map((service, index) => (
            <tr key={index}>
              <td>{service.sv_name}</td>
              <td>{service.sv_price}</td>
              <td>{service.sv_desc}</td>
              <td>
                <img
                  src={`${WEB_API}${service.sv_img}`}
                  alt="Service"
                  width="100"
                  className="img-thumbnail"
                />
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleEdit(service)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">No services available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

            </div>
        </>
    );
}

export default Services;
