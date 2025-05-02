// src/Footer.js  
import React from 'react';  
import './Footer.css';  

const Footer = () => {  
  return (  
    <footer className="footer">  
      <div className="footer-container">  
        <div className="footer-section">  
          <h3>Zotono</h3>  
        <p>A business is</p><p> an individual or</p><p>group engaged in financial transactions.</p>
        </div>  
        <div className="footer-section">  
          <h3>Popular Categories</h3>  
          <div className="footer-links">  
          <div className="footer-links">  
            <button>Events & Weddings</button>  
            <button>Transportation & Shipping</button>  
            <button>Education</button>  
            <button>Others</button>  
          </div>  
            {/* Add more cities as needed */}  
          </div>  
        </div>  
        <div className="footer-section">  
          <h3>About</h3>  
          <div className="footer-links">  
            <span>About Us</span>  
            <span>Careers</span>  
            <span>Press Releases</span>  
          </div>  
        </div>  
        <div className="footer-section">  
          <h3>Support</h3>  
          <div className="footer-links">  
            <span>Help Center</span>  
            <span>FAQs</span>  
            <span>Contact Us</span>  
            <span>Feedback</span>  
          </div>  
        </div>  
      </div>  
      <div className="footer-bottom">  
        <p>© 2025 Your Company. All Rights Reserved.</p>  
      </div>  
    </footer>  
  );  
};  

export default Footer;  