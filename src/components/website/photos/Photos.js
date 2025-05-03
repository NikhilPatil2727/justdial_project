
import { fetchPhoto } from './Service';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WEB_API } from "../../../common/constant";

const Photos = () => {
    const [data, setData] = useState([]);
    const { bs_id } = useParams();

    const fetchPhotoData = async () => {
        try {
            const response = await fetchPhoto(bs_id);
            console.log("photos :", response)
            if (response?.data?.status) {
                setData(response.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (bs_id) fetchPhotoData();
    }, [bs_id]);

    if (data.length === 0) {
        return null;
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h2 className="display-4 text-capitalize">Gallery</h2>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {data.map((photo) => (
                    <div className="col" key={photo._id}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="overflow-hidden rounded">
                                <img
                                    src={`${WEB_API}${photo.ph_path}`}
                                    className="img-fluid w-100"
                                    alt="Gallery Image"
                                    style={{
                                        height: "250px",
                                        objectFit: "cover",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default Photos;
