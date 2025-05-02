
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { fetchPricelist } from "./Service";
import { WEB_API } from "../../../common/constant";

const Pricelist = () => {
    const [data, setData] = useState([]);
    const { bs_id } = useParams();
    const fetchPricelistData = async () => {
        try {
            const response = await fetchPricelist({ bs_id });
            if (response?.data?.status) {
                setData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (bs_id) {
            fetchPricelistData();
        }
    }, [bs_id]);
    
    if (data.length === 0) {
        return null;
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="display-4">Price List</h2>
            </div>
            <div className="row g-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <div key={item._id} className="col-lg-4 col-md-6">
                            <div className="card h-100">
                                <img
                                    src={`${WEB_API}${item.pr_pack_img}`}
                                    className="card-img-top"
                                    alt={item.pr_pack_name}
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-map-marker-alt text-secondary me-2"></i>
                                        <span className="text-secondary">{item.bs_id}</span>
                                    </div>
                                    <h5 className="card-title">{item.pr_pack_name}</h5>
                                    <div className="d-flex justify-content-between align-items-center mt-3"></div>
                                    <span className="btn btn-secondary py-2 px-4">
                                        ₹{item.pr_pack_price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Pricelist;

