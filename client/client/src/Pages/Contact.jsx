import React, { useState } from 'react';
import './Contact.css'; // Ensure this file exists

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }

    try {
      // Simulate sending the form data to the backend (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      setSuccess('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="container contact-page py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">Contact Us</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <p className="lead">
            We’re here to assist you with any questions or concerns regarding the election process. Feel free to reach out to us using the form below or through our contact details.
          </p>
          <h3 className="mt-4">Contact Information</h3>
          <p>
            <strong>Email:</strong> <a href="mailto:support@electioncommission.org">support@electioncommission.org</a><br />
            <strong>Phone:</strong> +1-800-ELECTION (800-353-8246)<br />
            <strong>Address:</strong> 123 Democracy Lane, Election City, EC 12345
          </p>
          <h3 className="mt-4">Send Us a Message</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;