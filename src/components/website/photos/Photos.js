
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
        <div className="container-fluid team pb-5">
            <div className="container pb-5">
                <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
                    <h2 className="display-4 text-capitalize mb-3">Gallery</h2>
                </div>
                <div className="row g-4">
                    {data.length > 0 ? (
                        data.map((photo, index) => (
                            <div className="col-lg-3" key={photo._id}>
                                <div className="team-item border border-primary p-1">
                                    <div className="team-img">
                                        <img
                                            src={`${WEB_API}${photo.ph_path}`}
                                            className="img-fluid w-100"
                                            alt="Gallery Image"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Loading photos...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Photos;
