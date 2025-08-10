import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import logo from '../assets/logo.jpg'; // adjust the path as needed

import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
 const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const hlogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-primary sticky-top py-1">
      <div className="container-fluid px-5 mr-3 ml-3">
        {/* Brand logo and title */}
        <Link to="/home" className="navbar-brand d-flex align-items-center gap-2 text-white ">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <div>
            <strong className="d-block fs-6">Election Commission</strong>
            <small className="text-white-50 fs-6">Democratic Elections Portal</small>
          </div>
        </Link>

        {/* Toggle for mobile */}
        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
           <li className="nav-item">
              <Link to="/" className="nav-link text-white fw-semibold">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white fw-semibold">Login</Link>
            </li>

            {
              token && (
                <>
                          <li className="nav-item">
              <Link to="/home" className="nav-link text-white fw-semibold">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/voter-services" className="nav-link text-white fw-semibold">Voter Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/candidates" className="nav-link text-white fw-semibold">Candidates</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white fw-semibold">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white fw-semibold">Contact</Link>
            </li>
            <li className="nav-item">
                <Link to="/vote" className="nav-link text-white fw-semibold">Vote</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                Elections & Results
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/results/general" className="dropdown-item">General Results</Link></li>
                <li><Link to="/results/state" className="dropdown-item">State Elections</Link></li>
              </ul>
            </li>
             <li className="nav-item">
               <button onClick={hlogout}>Logout</button>
            </li>

                </>
              )
            }
  
          </ul>

          {/* Search and login */}
         
        </div>
      </div>
    </nav>
  );
};

export default Header;