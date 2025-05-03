import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMenu } from "./Service";
import { WEB_API } from "../../../common/constant";

const Menu = () => {
    const { bs_id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetchMenu(bs_id);
                setData(response.data.data);
            } catch (err) {
                console.log("Error fetching menu:", err);
            }
        };

        if (bs_id) fetchMenuData();
    }, [bs_id]);

    if (data.length === 0) return null;

    return (
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold" style={{ color: "#000000" }}>
                        Our Menu
                    </h2>
                </div>

                <div className="row g-4">
                    {data.map((menuItem) => (
                        <div className="col-12 col-md-6 col-lg-4" key={menuItem._id}>
                            <div 
                                className="card h-100 border-0 shadow-sm overflow-hidden position-relative"
                                style={{
                                    transition: "transform 0.3s",
                                    borderRadius: "15px"
                                }}
                            >
                                <div className="card-img-top overflow-hidden">
                                    <img
                                        src={`${WEB_API}${menuItem.me_img}`}
                                        alt={menuItem.me_name}
                                        className="img-fluid"
                                        style={{
                                            height: "250px",
                                            width: "100%",
                                            objectFit: "cover",
                                            transition: "transform 0.3s"
                                        }}
                                    />
                                </div>

                                <div className="card-body p-4">
                                    <h5 
                                        className="fw-bold mb-3"
                                        style={{ color: "#2a2a2a" }}
                                    >
                                        {menuItem.me_name}
                                    </h5>
                                    <p 
                                        className="text-muted mb-4"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        {menuItem.me_desc}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span 
                                            className="badge rounded-pill px-3 py-2"
                                            style={{ 
                                                backgroundColor: "#7562d8",
                                                color: "white",
                                                fontSize: "1rem"
                                            }}
                                        >
                                            ₹{menuItem.me_price}
                                        </span>
                                    </div>
                                </div>

                                <style>
                                    {`
                                        .card:hover {
                                            transform: translateY(-5px);
                                        }
                                        .card:hover img {
                                            transform: scale(1.05);
                                        }
                                        @keyframes fadeIn {
                                            from { opacity: 0; transform: translateY(20px); }
                                            to { opacity: 1; transform: translateY(0); }
                                        }
                                        .card {
                                            animation: fadeIn 0.6s ease-out forwards;
                                        }
                                    `}
                                </style>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;