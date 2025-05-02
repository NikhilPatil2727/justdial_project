import { useParams } from 'react-router-dom';
import mapImage from '../../../assets/profile/images/map.jpg';
import Profilenav from '../profilenav/Profilenav';
import { viewMap, updateMap, addMap } from "./Service"; 
import { useState, useEffect } from "react";

const Map = () => {
    const { id = "67a9cd543c2191af42733f1a" } = useParams();
    const [data, setData] = useState(null);  
    const [mapAddress, setMapAddress] = useState("");

    useEffect(() => {
        const fetchMapData = async () => {
            try {
                const response = await viewMap(id);
                if (response?.data?.data) {
                    setData(response.data.data);
                    setMapAddress(response.data.data.map_address || ""); 
                } else {
                    setData(null); 
                }
            } catch (error) {
                console.error("Error fetching map details:", error);
            }
        };
        fetchMapData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (data) {
                response = await updateMap({ id, map_address: mapAddress });
            } else {
                response = await addMap({ id, map_address: mapAddress });
            }

            if (response?.status === 200 || response?.status === 201) {
                alert("Map added successfully!");
            } else {
                alert("Failed to add map.");
            }
        } catch (error) {
            console.error("Error saving map:", error);
            alert("An error occurred while saving the map.");
        }
    };

    return (
        <>
            <Profilenav />
            <div className="container-main">
                <div className="image-side">
                    <img src={mapImage} alt="Map Preview" />
                </div>

                <div className="form-side">
                    <div className="card">
                        <div className="card-header text-center text-white">
                            <h4>{data ? "Edit Map" : "Add Map"}</h4>
                        </div>
                        <div className="card-body">
                            <form id="locationForm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="locationInput" className="form-label">Enter Address or Coordinates:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="locationInput"
                                        placeholder="e.g., New York, 40.7128,-74.0060"
                                        required
                                        value={mapAddress}
                                        onChange={(e) => setMapAddress(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn-save">
                                        {data ? "Update" : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div id="map" className="map-container"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Map;
