import { useState, useEffect } from "react";
import productImage from "../../../assets/profile/images/product1.png";
import Profilenav from "../profilenav/Profilenav";
import { addProduct, updateProduct, viewAllProducts, deleteProduct } from "./Service";
import { WEB_API } from "../../../common/constant";


const ProductForm = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [newView, setNewView] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        pd_name: "",
        pd_price: "",
        pd_desc: "",
        pd_img: ""
    });

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await viewAllProducts();
            if (response?.data) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setErrorMessage("Failed to fetch products.");
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
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "pd_price" ? String(value) : value
        }));
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
        if (!formData.pd_name.trim()) tempErrors.pd_name = "Product name is required.";
        if (!formData.pd_desc.trim()) tempErrors.pd_desc = "Product description is required.";
        if (!String(formData.pd_price).trim()) {
            tempErrors.pd_price = "Product price is required.";
        } else if (isNaN(formData.pd_price) || Number(formData.pd_price) <= 0) {
            tempErrors.pd_price = "Enter a valid price.";
        }
        if (!editMode && !formData.pd_img) tempErrors.pd_img = "Product image is required.";

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
                delete updatedData.pd_img;
            }

            let response;
            if (editMode && selectedProductId) {
                response = await updateProduct(selectedProductId, updatedData);
                if (response?.status === 200) {
                    alert("Product updated successfully!");
                } else {
                    alert("Failed to update product.");
                }
            } else {
                response = await addProduct(updatedData);
                if (response?.status === 200) {
                    alert("Product added successfully!");
                } else {
                    alert("Failed to add product.");
                }
            }

            fetchAllProducts();
            setEditMode(false);
            setSelectedProductId(null);
            setFormData({ pd_name: "", pd_price: "", pd_desc: "", pd_img: "" });
            setNewView(false);
        } catch (error) {
            console.error("Error submitting product:", error);
            alert("Failed to update product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleView = (product) => {
        setFormData({
            pd_name: product.pd_name,
            pd_price: product.pd_price,
            pd_desc: product.pd_desc,
            pd_img: product.pd_img,
        });
        setEditMode(true);
        setSelectedProductId(product._id);
        setNewView(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            const response = await deleteProduct(id);
            if (response.status === 200) {
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
                alert("Product deleted successfully!");
            } else {
                alert("Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container mt-5" >
                <div className="row align-items-center">
                    <div className="col-md-5 img-fluid-rounded">
                        <img
                            src={productImage}
                            alt="Product Preview"
                            style={{ height: "400px", width: "100%" }}
                        />
                    </div>

                    <div className="col-md-7">
                        <div className="form-container-biz">
                            <div className="card-header text-center text-white mb-3"  style={{ backgroundColor: "#a071fd" }}>
                                <h4>{editMode ? "Edit Product" : "Add New Product"}</h4>
                            </div>
                            <form id="productForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="productName">Product Name</label>
                                    <input
                                        type="text"
                                        name="pd_name"
                                        className="form-control"
                                        placeholder="Enter product name"
                                        value={formData.pd_name}
                                        onChange={handleChange}

                                    />
                                    {errors.pd_name && <small className="text-danger">{errors.pd_name}</small>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productDescription">Product Description</label>
                                    <textarea
                                        name="pd_desc"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter product description"
                                        value={formData.pd_desc}
                                        onChange={handleChange}
                                    />
                                    {errors.pd_desc && <small className="text-danger">{errors.pd_desc}</small>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="productPrice">Product Price</label>
                                    <input
                                        type="text"
                                        name="pd_price"
                                        className="form-control"
                                        placeholder="Enter product price"
                                        value={formData.pd_price}
                                        onChange={handleChange}
                                    />
                                    {errors.pd_price && <small className="text-danger">{errors.pd_price}</small>}

                                </div>



                                <div className="form-group">
                                    <label htmlFor="productImage">Product Image</label>
                                    <input
                                        type="file"
                                        name="pd_img"
                                        className="form-control"
                                        onChange={handleFileChange}
                                        required={!editMode}
                                    />
                                    {errors.pd_img && <small className="text-danger">{errors.pd_img}</small>}
                                </div>



                                {formData.pd_img && (
                                    <img
                                        src={newView ? formData.pd_img : `${WEB_API}${formData.pd_img}`}
                                        alt=""
                                        width="100"
                                    />
                                )}

<div className="text-center">
  <button
    type="submit"
    className="btn-save"
    style={{ backgroundColor: "#a071fd" }}
  >
    {loading ? "Submitting..." : editMode ? "Update Product" : "Add Product"}
  </button>
</div>

                            </form>
                        </div>
                    </div>
                </div>
            </div><br></br>

            {/* Product Details Table */}
            <div className=" container mt-5" style={{overflowX:"auto"}}>
                <h4 className="text-center">Product Details</h4>
                <table className="time-table mt-3 shadow-lg">
                    <thead>
                        <tr>
                            <th className="text-center">Product Name</th>
                            <th className="text-center">Product Price</th>
                            <th className="text-center">Product Description</th>
                            <th className="text-center">Product image</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.pd_name}</td>
                                <td>{product.pd_price}</td>
                                <td>{product.pd_desc}</td>
                                <td><img src={`${WEB_API}${product.pd_img}`} alt="Service" width="100" /></td>
                                <td>
                                    <button className="btn btn-success btn-sm" onClick={() => handleView(product)}>View</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center">No products available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div><br></br><br></br>
        </>
    );
};

export default ProductForm;
