import React, { useRef, useEffect } from 'react';
import '../../../assets/website/css/bootstrap.min.css';

import './Nearbybusiness.css';
import interiorImg from '../../../assets/profile/images/int12.jpg';
import electricianImg from '../../../assets/profile/images/ele12.jpg';
import hallImg from '../../../assets/profile/images/hall12.jpg';
import plumberImg from '../../../assets/profile/images/plu12.jpg';
import serviceoneImg from '../../../assets/profile/images/ser12.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Nearbybusiness = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 250, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    { title: 'Interior Designers', img: interiorImg },
    { title: 'Electricians', img: electricianImg },
    { title: 'Banquet Halls', img: hallImg },
    { title: 'Plumbers', img: plumberImg },
    { title: 'AC Repair & Services', img: serviceoneImg }
  ];

  return (
    <div className="nearby-section container-fluid">
      <h2 className="nearby-title text-center">Nearby Business</h2>

      <div className="nearby-slider-wrapper position-relative">
        <button className="scroll-btn left d-none d-md-block" onClick={() => scroll(-300)}>
          <FaArrowLeft />
        </button>

        <div
          className="nearby-card-container d-flex overflow-auto gap-3 pb-2"
          ref={scrollRef}
        >
          {services.map((service, index) => (
            <div className="nearby-card bg-primary text-white rounded shadow-sm" key={index}>
              <img src={service.img} alt={service.title} className="nearby-image w-100" />
              <div className="nearby-card-content text-center p-3">
                <h3 className="nearby-title-text h6 mb-3">{service.title}</h3>
                <button className="btn btn-light text-primary fw-bold nearby-button">
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right d-none d-md-block" onClick={() => scroll(300)}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Nearbybusiness;
