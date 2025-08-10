import React from 'react';
import './About.css'; // Ensure this file exists

const About = () => {
  return (
    <div className="container about-page py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">About the Election Commission</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p className="lead">
            The Election Commission is a dedicated organization committed to ensuring free, fair, and transparent elections across the nation. Established with the vision of upholding democratic values, we strive to provide a platform where every citizen’s voice is heard.
          </p>
          <h3 className="mt-4">Our Mission</h3>
          <p>
            Our mission is to conduct elections with integrity, ensuring that all eligible voters can participate securely and confidently. We aim to maintain the highest standards of electoral processes through technology, education, and inclusivity.
          </p>
          <h3 className="mt-4">Key Features</h3>
          <ul className="list-group">
            <li className="list-group-item">Secure voter registration and authentication.</li>
            <li className="list-group-item">Real-time candidate management for transparent elections.</li>
            <li className="list-group-item">Efficient vote casting and result tracking.</li>
          </ul>
          <h3 className="mt-4">Contact Us</h3>
          <p>
            For more information, reach out to us at <a href="mailto:support@electioncommission.org">support@electioncommission.org</a> or visit our office at 123 Democracy Lane, Election City.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;