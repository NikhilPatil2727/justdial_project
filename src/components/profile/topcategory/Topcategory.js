import React from "react";
import "./Topcategory.css";
import banquetImg from '../../../assets/profile/images/hall.jpg';
import bridalRequisiteImg from '../../../assets/profile/images/bride.jpg';
import caterersImg from '../../../assets/profile/images/Caterers.jpg';
import parlourImg from '../../../assets/profile/images/parlour1.jpg';
import spaImg from '../../../assets/profile/images/spa1.jpg';
import salonsImg from '../../../assets/profile/images/salons.jpg';
import acImg from '../../../assets/profile/images/ac1.jpg';
import carImg from '../../../assets/profile/images/car1.jpg';
import bikeImg from '../../../assets/profile/images/bike1.jpg';
import movieImg from '../../../assets/profile/images/movie.jpg';
import groceryImg from '../../../assets/profile/images/grocery.jpg';
import electronicsImg from '../../../assets/profile/images/electronics.jpg';
import gymImg from '../../../assets/profile/images/pl6.jpg';
import yogaImg from '../../../assets/profile/images/pl5.jpg';
import trainerImg from '../../../assets/profile/images/pl4.jpg';
import plumbingImg from '../../../assets/profile/images/pl1.jpg';
import carpentImg from '../../../assets/profile/images/pl3.jpg';
import pestImg from '../../../assets/profile/images/pl2.jpg';


import '../../../assets/website/css/bootstrap.min.css';

const services = [
  {
    title: "Wedding Requisites",
    items: [
      { label: "Banquet Halls", img: banquetImg },
      { label: "Bridal Requisite", img: bridalRequisiteImg },
      { label: "Caterers", img: caterersImg },
     
    ],
  },
  {
    title: "Beauty & Spa",
    items: [
      { label: "Beauty Parlours", img: parlourImg },
      { label: "Spa & Massages", img: spaImg },
      { label: "Salons", img: salonsImg },
    ],
  },
  {
    title: "Repairs & Services",
    items: [
      { label: "AC Service", img: acImg },
      { label: "Car Service", img: carImg },
      { label: "Bike Service", img: bikeImg },
    ],
  },
  {
    title: "Daily Needs",
    items: [
      { label: "Movies", img: movieImg },
      { label: "Grocery", img: groceryImg },
      { label: "Electricians", img: electronicsImg },
    ],
  },
  {
    title: "Home Services",
    items: [
      { label: "Plumbing", img: plumbingImg },
      { label: "Carpentry", img: carpentImg },
      { label: "Pest Control", img: pestImg },
    ],
  },
  {
    title: "Fitness & Health",
    items: [
      { label: "Gyms & Fitness Centers", img: gymImg },
      { label: "Yoga Classes", img: yogaImg },
      { label: "Personal Trainers", img: trainerImg },
    ],
  },
];

function Topcategory() {
  return (
    <div className="container py-4">
      <div className="row">
        {services.map((card, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="card custom-card h-100">
              <h2 className="card-title">{card.title}</h2>
              <div className="row">
                {card.items.map((item, i) => (
                  <div className="col-4 text-center mb-3" key={i}>
                    <img src={item.img} alt={item.label} className="img-fluid category-img" />
                    <p className="mb-0 category-label">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topcategory;
