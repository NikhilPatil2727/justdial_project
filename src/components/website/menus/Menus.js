import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMenu } from "./Service";
import { WEB_API } from "../../../common/constant";

const Menu = () => {
    const { bs_id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Fetching menu for bs_id:", bs_id);

        const fetchMenuData = async () => {
            try {
                const response = await fetchMenu(bs_id);
                console.log("API Response:", response.data);
                setData(response.data.data);
            } catch (err) {
                console.log("Error fetching menu:", err);
            }
        };

        if (bs_id) {
            fetchMenuData();
        }
    }, [bs_id]);
    if (data.length === 0) {
        return null;
    }

    return (
        <div id="menu-section" className="container-fluid menu pb-5">
            <div className="container pb-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
                    <h2 className="display-4 text-capitalize mb-3">Our Menu</h2>
                </div>
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((menuItem, index) => (
                            <div className="col-lg-4 col-md-6" key={menuItem._id}>
                                <div className="menu-item card h-100">
                                    <div className="menu-img">
                                        <img
                                            src={`${WEB_API}${menuItem.me_img}`}
                                            className="img-fluid"
                                            alt={menuItem.me_name}
                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="menu-content p-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h4 className="mb-0 text-secondary">{menuItem.me_name}</h4>
                                        </div>
                                        <p className="h5 d-block mb-4">{menuItem.me_desc}</p>
                                        <span className="btn btn-secondary py-2 px-4">₹{menuItem.me_price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Loading menu...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
