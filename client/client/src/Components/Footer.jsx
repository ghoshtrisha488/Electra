// Footer.jsx
import React from 'react';
import logo from '../assets/logo.jpg'; // replace with actual path
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row">

          {/* Logo and Name */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="Election Logo" width="50" height="50" className="me-2 rounded-circle" />
              <div>
                <h5 className="mb-0 fw-bold">Election Commission</h5>
                <small>Democratic Elections Portal</small>
              </div>
            </div>
            <p>Your trusted source for democratic election information and services in India.</p>
          </div>

          {/* Important Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/voter-services" className="text-white text-decoration-none">Voter Services</a></li>
              <li><a href="/candidates" className="text-white text-decoration-none">Candidates</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
           
            <p><FaEnvelope className="me-2" /> info@electioncommission.in</p>
            <div className="mt-3">
              <a href="#" className="text-white me-3"><FaFacebookF /></a>
              <a href="#" className="text-white me-3"><FaTwitter /></a>
              <a href="#" className="text-white"><FaInstagram /></a>
            </div>
          </div>

        </div>

        <hr className="border-light" />
        <div className="text-center">
          <p className="mb-0 small">&copy; {new Date().getFullYear()} Election Commission of India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
