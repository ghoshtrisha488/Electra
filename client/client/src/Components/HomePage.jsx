import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const services = [
  { title: 'Voter Registration Forms', color: 'border-pink', icon: '📝', path: '/voter-registration' },
  { title: 'Track Your Application', color: 'border-warning', icon: '📍', path: '/track-application' },
  { title: 'Voter Card Complaints', color: 'border-info', icon: '📣', path: '/complaints' },
  { title: 'Search Your Name in Voter List', color: 'border-success', icon: '🔍', path: '/search' },
  { title: 'Download e-Voter Card (E-EPIC)', color: 'border-pink', icon: '💳', path: '/epic' },
  { title: 'Book a Call With BLO', color: 'border-warning', icon: '📞', path: '/blo' },
  { title: 'Divyang (Saksham)', color: 'border-info', icon: '♿', path: '/divyang' },
  { title: 'Learning Material', color: 'border-success', icon: '📚', path: '/learn' },
  { title: 'Know Your BLO', color: 'border-warning', icon: '🧑‍💼', path: '/know-blo' },
  { title: 'Election Schedule', color: 'border-success', icon: '🗓️', path: '/schedule' },
  { title: 'Booth Information', color: 'border-pink', icon: '🏛️', path: '/booth-info' },
  { title: 'Helpline Numbers', color: 'border-info', icon: '☎️', path: '/helpline' },
];

const HomePage = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5 text-dark border-bottom pb-2">
        Voter Services
      </h2>
      <div className="row g-4">
        {services.map((service, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
            <Link to={service.path} className="text-decoration-none">
              <div className={`card voter-card text-center p-4 ${service.color}`}>
                <div className="icon fs-1">{service.icon}</div>
                <h6 className="title mt-3 text-dark fw-semibold">{service.title}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;


