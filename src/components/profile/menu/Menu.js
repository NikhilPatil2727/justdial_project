import React, { useState, useEffect } from "react";
import MenuImage from "../../../assets/profile/images/menu1.jpg";
import Profilenav from "../profilenav/Profilenav";
import { addMenu, updateMenu, viewAllMenus, deleteMenu } from "./Service";
import { WEB_API } from "../../../common/constant";

const Menu = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [menus, setMenus] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [newView, setNewView] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        me_name: "",
        me_desc: "",
        me_price: "",
        me_img: "",
    });

    useEffect(() => {
        fetchAllMenus();
    }, []);

    const fetchAllMenus = async () => {
        try {
            const response = await viewAllMenus();
            if (response?.data) {
                setMenus(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching menus:", error);
            setErrorMessage("Failed to fetch menu items.");
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
        if (!formData.me_name.trim()) tempErrors.me_name = "Menu name is required.";
        if (!formData.me_desc.trim()) tempErrors.me_desc = "Menu description is required.";
        if (!String(formData.me_price).trim()) {
            tempErrors.me_price = "Menu price is required.";
        } else if (isNaN(formData.me_price) || Number(formData.me_price) <= 0) {
            tempErrors.me_price = "Enter a valid price.";
        }
        if (!editMode && !formData.me_img) tempErrors.me_img = "Menu image is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        if (!validateForm()) return;

        try {
            let updatedData = { ...formData };

            if (editMode && !newView) {
                delete updatedData.me_img;
            }

            let response;
            if (editMode && selectedMenuId) {
                response = await updateMenu(selectedMenuId, updatedData);
                if (response?.status === 200) {
                    alert("Menu item updated successfully!");
                } else {
                    alert("Failed to update menu item.");
                }
            } else {
                response = await addMenu(updatedData);
                if (response?.status === 200) {
                    alert("Menu item added successfully!");
                } else {
                    alert("Failed to add menu item.");
                }
            }

            fetchAllMenus();
            setEditMode(false);
            setSelectedMenuId(null);
            setFormData({ me_name: "", me_desc: "", me_price: "", me_img: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting menu item:", error);
            alert("Failed to update menu item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (menu) => {
        setFormData({
            me_name: menu.me_name,
            me_desc: menu.me_desc,
            me_price: menu.me_price,
            me_img: menu.me_img,
        });
        setEditMode(true);
        setSelectedMenuId(menu._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this menu item?")) return;
        try {
            const response = await deleteMenu(id);
            if (response.status === 200) {
                setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== id));
                alert("Menu item deleted successfully!");
            } else {
                alert("Failed to delete menu item.");
            }
        } catch (error) {
            console.error("Error deleting menu item:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
        <Profilenav />
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 text-center">
                    <img src={MenuImage} alt="Menu" style={{ height: '530px' }} className="img-fluid rounded shadow-sm" />
                </div>
    
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header text-center" style={{ backgroundColor: '#a071fd' }}>
                            <h4 className="text-white">Menu Management</h4>
                        </div>
    
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="me_name" className="font-weight-bold">Menu Name</label>
                                    <input
                                        type="text"
                                        id="me_name"
                                        name="me_name"
                                        className="form-control"
                                        value={formData.me_name}
                                        onChange={handleChange}
                                        placeholder="Enter menu name"
                                        required
                                    />
                                    {errors.me_name && <small className="text-danger">{errors.me_name}</small>}
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="me_desc" className="font-weight-bold">Description</label>
                                    <textarea
                                        id="me_desc"
                                        name="me_desc"
                                        className="form-control"
                                        value={formData.me_desc}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter description"
                                        required
                                    ></textarea>
                                    {errors.me_desc && <small className="text-danger">{errors.me_desc}</small>}
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="me_price" className="font-weight-bold">Price</label>
                                    <input
                                        type="text"
                                        id="me_price"
                                        name="me_price"
                                        className="form-control"
                                        value={formData.me_price}
                                        onChange={handleChange}
                                        placeholder="Enter menu price"
                                        required
                                    />
                                    {errors.me_price && <small className="text-danger">{errors.me_price}</small>}
                                </div>
    
                                <div className="form-group">
    <label htmlFor="me_img" className="font-weight-bold">Upload Menu Image</label>
    <input
        type="file"
        id="me_img"
        name="me_img"
        className="form-control border" // added border here
        onChange={handleFileChange}
        required={!editMode}
    />
    {errors.me_img && <small className="text-danger">{errors.me_img}</small>}
</div>

    
                                {formData.me_img && (
                                    <img
                                        src={newView ? formData.me_img : `${WEB_API}${formData.me_img}`}
                                        alt="Menu"
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
    <br></br><br></br>
        <div className=" container mt-5">
            <h4 className="text-center">Menu List</h4>
            <table className="time-table mt-3 shadow-lg">
                <thead>
                    <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Description</th>
                        <th className="text-center">Image</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menus.length > 0 ? menus.map((menu, index) => (
                        <tr key={index}>
                            <td>{menu.me_name}</td>
                            <td>{menu.me_price}</td>
                            <td>{menu.me_desc}</td>
                            <td><img src={`${WEB_API}${menu.me_img}`} alt="menu" width="100" /></td>
                            <td>
                                <button className="btn  btn-lg" onClick={() => handleView(menu)}>👁️</button>
                                <button className="btn  btn-lg" onClick={() => handleDelete(menu._id)}>🗑️</button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="5" className="text-center">No menus available</td></tr>
                    )}
                </tbody>
            </table>
        </div><br></br>
    </>
    
    );
};

export default Menu;
