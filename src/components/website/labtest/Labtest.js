
import { useState, useEffect } from 'react';
import { fetchLabtest } from './Service';
import { WEB_API } from "../../../common/constant";
import { useParams } from 'react-router-dom';

const Labtest = () => {
    const [data, setData] = useState([]);
    const { bs_id } = useParams();  

    const fetchLabtestData = async () => {
        try {
            const response = await fetchLabtest(bs_id);
            if (response && response.data && response.data.status) {
                setData(response.data.data);
            } else {
                console.log("No data found for bs_id:", bs_id);
            }
        } catch (err) {
            console.log("Error fetching lab tests:", err.message);
        }
    };
    
    useEffect(() => {
        if (bs_id) {
            fetchLabtestData(); 
        }
    }, [bs_id]);

    if (data.length === 0) {
        return null;
    }

    return (
        <>
            <div className="container-fluid project py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                        <h2 className="display-4 text-capitalize mb-3">Lab Tests</h2>
                    </div>
                    <div className="row g-5">
                        {data.length > 0 ? (
                            data.map((test, index) => (
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.2}s`} key={test._id}>
                                    <div className="project-item">
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <div className="project-img">
                                                    <img
                                                        src={`${WEB_API}${test.lt_img}`}
                                                        className="img-fluid pt-3 ps-3"
                                                        alt={test.lt_name}
                                                        style={{ width: '300px', height: '200px', objectFit: 'cover' }}
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-md-8">
                                                <div className="project-content mb-4">
                                                    <p className="fs-5 text-secondary mb-2">{test.lt_name}</p>
                                                    <a href="#" className="h4" style={{ textDecoration: "none" }}>{test.lt_desc}</a>
                                                    <p className="mb-0 mt-3">Created at: {new Date(test.lt_created_at).toLocaleDateString()}</p>
                                                </div>
                                                <span className="btn btn-primary py-2 px-4">₹{test.lt_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No Lab Tests Available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Labtest;
