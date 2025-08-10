import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Candidates.css'; // Ensure this file exists

const Candidates = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    party: '',
    constituency: '',
    candidateId: '',
  });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.party || !formData.constituency || !formData.candidateId) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post(`${'http://localhost:5000/api/candidates'}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Candidate registered successfully');
      setFormData({ fullName: '', party: '', constituency: '', candidateId: '' }); // Reset form
      fetchCandidates(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register candidate');
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/candidates`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCandidates(response.data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      alert('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container candidates-page py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Manage Candidates</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="mb-3">Add New Candidate</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Party</label>
                  <input
                    type="text"
                    className="form-control"
                    name="party"
                    value={formData.party}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Constituency</label>
                  <input
                    type="text"
                    className="form-control"
                    name="constituency"
                    value={formData.constituency}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Candidate ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="candidateId"
                    value={formData.candidateId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add Candidate
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h4 className="mb-3">Candidate List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Party</th>
                <th>Constituency</th>
                <th>Candidate ID</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Candidates;