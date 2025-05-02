import React from "react";
import offerIcon from "../../../assets/profile/images/giftbox2.gif";
import Profilenav from "../profilenav/Profilenav";
import { Link } from "react-router-dom";

const OfferSection = () => {
  return (
    <>
    <Profilenav />
    <section className="offer-section py-5">
      <div className="container text-center">
        {/* Background Card */}
        <div className="offer-card">
          {/* Offer Icon */}
          <div className="offer-icon mb-4">
            <img src={offerIcon} alt="Offer Icon" />
          </div>

          <p className="save-text">save up to</p>

          <div className="save-percentage">30%</div>

          {/* Steps Message */}
          <p className="mb-5">
            You’re just a few steps away from creating your first offer.
          </p>

          {/* Add New Offer Button */}
          <div className="text-center">
            <Link to="/Offers" className="btn-save">
              Add New Offer
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default OfferSection;
