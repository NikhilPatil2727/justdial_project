
import { useState, useEffect } from 'react';
import { fetchServices } from './Service';
import { WEB_API } from "../../../common/constant";
import { useParams } from 'react-router-dom';

const Services = () => {
    const { bs_id } = useParams();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch service data
    const fetchServiceData = async () => {
        try {
            const response = await fetchServices(bs_id);
            if (response?.data?.data) {
                setServices(response.data.data);
            } else {
                setError('No services found');
            }
        } catch (err) {
            setError('Failed to fetch services');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (bs_id) fetchServiceData();
    }, [bs_id]);

    if (services.length === 0) {
        return null;
    }

    return (
        <>
            <div id="service-section" className="container-fluid service bg-light pb-5">
                <div className="container pb-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
                        <h2 className="display-4 text-capitalize mb-3">Our service is creative, & decent</h2>
                    </div>
                    <div className="row g-4">
                        {services.map((service, index) => (
                            <div
                                className="col-lg-4 wow fadeInUp"
                                key={index}
                                data-wow-delay={`${(index + 1) * 0.2}s`}
                            >
                                <div className="service-item">
                                    <div
                                        className="service-img"
                                        style={{
                                            overflow: 'hidden',
                                            height: '250px',
                                            transition: 'height 0.3s ease-in-out',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.height = '350px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.height = '250px';
                                        }}
                                    >
                                        <img
                                            src={`${WEB_API}${service.sv_img}`}
                                            className="img-fluid"
                                            alt={service.sv_name || 'Service'}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <div className="service-content text-center p-4">
                                        <div
                                            className="bg-secondary btn-xl-square mx-auto"
                                            style={{ width: '120px', height: '120px' }}
                                        >
                                            <i
                                                className={`fas ${service.icon || 'fa-cogs'} text-primary fa-4x`}
                                            ></i>
                                        </div>
                                        <a className="d-block fs-4 my-4">
                                            {service.sv_name || 'Service Name'}
                                        </a>
                                        <p className="text-white mb-4">
                                            {service.sv_desc || 'Description not available'}
                                        </p>
                                        <span className="btn btn-secondary py-2 px-4">
                                            ₹{service.sv_price || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="service-title">
                                        <div className="d-flex justify-content-between align-items-center">

                                            <h4
                                                className="mb-0"
                                                onMouseEnter={(e) => {
                                                    e.target.style.fontSize = '1.5rem';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.fontSize = '1.2rem';
                                                }}
                                                style={{
                                                    fontSize: '2rem',
                                                    transition: 'font-size 0.3s ease-in-out',
                                                }}
                                            >
                                                {service.sv_name || 'Service Name'}
                                            </h4>
                                            <div
                                                className="btn-xl-square bg-secondary p-4"
                                                style={{ width: '80px', height: '80px' }}
                                            >
                                                <i
                                                    className={`fas ${service.icon || 'fa-cogs'} text-primary fa-2x`}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    );
};

export default Services;
