
import { useState, useEffect } from "react";
import { fetchAmenity } from "./Service";
import { WEB_API } from "../../../common/constant";
import { useParams } from "react-router-dom"; 

const Amenity = () => {
    const [data, setData] = useState([]);
    const { bs_id } = useParams();

    const fetchAmenityData = async () => {
        try {
            const response = await fetchAmenity(bs_id); 
            console.log("UI Data:", response?.data); 
            setData(response?.data || []);
        } catch (err) {
            console.error("Error fetching amenities:", err);
            setData([]);
        }
    };

    useEffect(() => {
        if (bs_id) {
            fetchAmenityData();
        }
    }, [bs_id]);

    if (data.length === 0) {
        return null;
    }

    return (
        <div style={{ backgroundColor: "#f4f4f4", padding: "40px 0",marginTop:"100px" }} className="amenity-section">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h2 className="display-4 text-capitalize mb-3"style={{color:"#000000"}}>Our Amenities</h2>
        </div>
        <div style={{ display: "flex",justifyContent: "center",alignItems: "center", gap: "20px", flexWrap: "wrap", paddingLeft: "100px", paddingRight: "100px" }}>
            {Array.isArray(data) && data.length ? (
                data.map((amenity) => (
                    <div
                        key={amenity._id}
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
                        className="amenity-card"
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
                                src={`${WEB_API}${amenity.amenity_img}`}
                                alt={amenity.amenity_name}
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
                            {amenity.amenity_name}
                        </h6>
                        <p
                            style={{
                                fontSize: "0.9rem",
                                color: "#666",
                                transition: "color 0.3s ease-in-out",
                            }}
                        >
                            {amenity.amenity_des}
                        </p>
                        <style>
                            {`
                                .amenity-card:hover {
                                    background-color: orange;
                                    transform: scale(1.05);
                                }
                                .amenity-card:hover h6,
                                .amenity-card:hover p {
                                    color: #ff5e15;
                                }
                            `}
                        </style>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>No amenities available</p>
            )}
        </div>
    </div>
);
};
export default Amenity;
