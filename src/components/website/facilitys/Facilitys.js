import { useState, useEffect } from "react";
import { fetchFacility } from "./Service";
import { useParams } from "react-router-dom";
import { WEB_API } from "../../../common/constant";

const Facilities = () => {
    const [data, setData] = useState([]);
    const { bs_id } = useParams();

    const fetchFacilityData = async () => {
        try {
            if (bs_id) {
                const response = await fetchFacility(bs_id);
                setData(response?.data || []);
            }
        } catch (err) {
            console.error("Error fetching facility data:", err);
            setData([]);
        }
    };

    useEffect(() => {
        fetchFacilityData();
    }, [bs_id]);

    if (data.length === 0) {
        return null;
    }

    return (
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold" style={{ color: "#000000" }}>
                        Our Facilities
                    </h2>
                </div>

                <div className="row g-4 justify-content-center">
                    {data.map((facility) => (
                        <div key={facility._id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div
                                className="card h-100 border-0 shadow-sm overflow-hidden position-relative"
                                style={{
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    borderRadius: "15px"
                                }}
                            >
                                <div className="card-body p-4 text-center">
                                    <div 
                                        className="icon-wrapper mb-4 mx-auto"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(117, 98, 216, 0.1)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.3s"
                                        }}
                                    >
                                        <img
                                            src={`${WEB_API}${facility.facility_img}`}
                                            alt={facility.facility_name}
                                            className="img-fluid"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "contain"
                                            }}
                                        />
                                    </div>
                                    <h5 
                                        className="fw-bold mb-3"
                                        style={{ color: "#2a2a2a" }}
                                    >
                                        {facility.facility_name}
                                    </h5>
                                    <p 
                                        className="text-muted mb-0"
                                        style={{ fontSize: "0.9rem" }}
                                    >
                                        {facility.facility_desp}
                                    </p>
                                </div>

                                <style>
                                    {`
                                        .card:hover {
                                            transform: translateY(-10px);
                                            box-shadow: 0 15px 30px rgba(117, 98, 216, 0.1);
                                        }
                                        .card:hover .icon-wrapper {
                                            background-color: #7562d8;
                                        }
                                        .card:hover img {
                                            filter: brightness(0) invert(1);
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

export default Facilities;