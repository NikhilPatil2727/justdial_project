import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchAbout } from './Service';
import { WEB_API } from '../../../common/constant';

const Slider = () => {
    const { bs_id } = useParams(); 
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        const fetchSliderData = async () => {
            try {
                const response = await fetchAbout(bs_id);
                if (response?.data?.length > 0) {
                    const sliderInfo = response.data[0];
                    const dynamicImage = sliderInfo?.bs_image ? `${WEB_API}${sliderInfo.bs_image}` : "https://via.placeholder.com/1200x600?text=No+Image";

                    setSliderData([
                        {
                            title: sliderInfo.bs_business_name || "No Title Available",
                            description: sliderInfo.bs_desc || "No Description Available",
                            image: dynamicImage,
                        },
                        {
                            title: sliderInfo.bs_business_name || "No Title Available",
                            description: sliderInfo.bs_desc || "No Description Available",
                            image: dynamicImage,
                        },
                        {
                            title: sliderInfo.bs_business_name || "No Title Available",
                            description: sliderInfo.bs_desc || "No Description Available",
                            image: dynamicImage,
                        },
                    ]);
                }
            } catch (err) {
                console.error("Error fetching slider data:", err);
            }
        };

        if (bs_id) {
            fetchSliderData();
        }
    }, [bs_id]);

    if (sliderData.length === 0) {
        return null;
    }

    return (
        <div className="container-fluid overflow-hidden px-0">
            <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators fadeInUp animate__animated" data-animation="fadeInUp" data-delay="1s" style={{ animationDelay: '1s' }}>
                    {sliderData.map((_, index) => (
                        <li
                            key={index}
                            data-bs-target="#carouselId"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-label={`Slide ${index + 1}`}
                        ></li>
                    ))}
                </ol>
                <div className="carousel-inner" role="listbox">
                    {sliderData.map((slide, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={slide.image} className="img-fluid w-100" alt={`Slide ${index + 1}`} />
                            <div className="carousel-caption">
                                <p className="text-uppercase text-secondary fs-4 mb-0 fadeInUp animate__animated" data-animation="fadeInUp" data-delay="1s" style={{ animationDelay: '1s' }}>
                                    Business
                                </p>
                                <h1 className="display-1 text-capitalize text-white mb-4 fadeInUp animate__animated" data-animation="fadeInUp" data-delay="1.3s" style={{ animationDelay: '3.5s' }}>
                                    {slide.title}
                                </h1>
                                <p className="mb-5 fs-5 fadeInUp animate__animated" data-animation="fadeInUp" data-delay="1.5s" style={{ animationDelay: '1.5s' }}>
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon btn-lg-square fadeInLeft animate__animated" aria-hidden="true" style={{ animationDelay: '1.3s' }}>
                        <i className="fas fa-chevron-left fa-2x"></i>
                    </span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                    <span className="carousel-control-next-icon btn-lg-square fadeInRight animate__animated" aria-hidden="true" style={{ animationDelay: '1.3s' }}>
                        <i className="fas fa-chevron-right fa-2x"></i>
                    </span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;
