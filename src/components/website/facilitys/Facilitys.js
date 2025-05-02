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
                console.log("API Response:", response);
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
        <div style={{ backgroundColor: "#f4f4f4", padding: "40px 0" }} className="facilities-section">
            <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
                <h2 className="display-4 text-capitalize mb-3">Our Facilities</h2>
            </div>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", paddingLeft: "100px", paddingRight: "100px" }}>
                {data.map((facility) => (
                    <div
                        key={facility._id}
                        style={{
                            backgroundColor: "#fff",
                            width: "250px",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
                            marginBottom: "20px",
                        }}
                        className="facility-card"
                    >
                        <div
                            style={{
                                display: "inline-block",
                                padding: "15px",
                                borderRadius: "50%",
                                marginBottom: "20px",
                            }}
                        >
                            <img
                                src={`${WEB_API}${facility.facility_img}`}
                                alt={facility.facility_name}
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                        </div>
                        <h6
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                transition: "color 0.3s ease-in-out",
                            }}
                        >
                            {facility.facility_name}
                        </h6>
                        <p
                            style={{
                                fontSize: "0.9rem",
                                color: "#666",
                                transition: "color 0.3s ease-in-out",
                            }}
                        >
                            {facility.facility_desp}
                        </p>
                        <style>
                            {`
                                .facility-card:hover {
                                    background-color: orange;
                                    transform: scale(1.05);
                                }
                                .facility-card:hover h6,
                                .facility-card:hover p {
                                    color: #ff5e15;
                                }
                            `}
                        </style>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facilities;
