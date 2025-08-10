import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Candidates.css';

const Candidates = () => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    constituency: '',
    candidateId: '',
  });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting formData:', formData);

    // Validation check
    if (
      !formData.name.trim() ||
      !formData.party.trim() ||
      !formData.constituency.trim() ||
      !formData.candidateId.trim()
    ) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/candidates',
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Candidate registered successfully');
      setFormData({ name: '', party: '', constituency: '', candidateId: '' });
      fetchCandidates();
    } catch (err) {
      console.error('Error creating candidate:', err.response || err);
      alert(err.response?.data?.message || 'Failed to register candidate');
    }
  };

  const fetchCandidates = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/candidates`, {
        headers: { Authorization: `Bearer ${token}` },
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
                <th>Name</th>
                <th>Party</th>
                <th>Constituency</th>
                <th>Candidate ID</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <tr key={candidate._id || candidate.candidateId}>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>{candidate.constituency}</td>
                    <td>{candidate.candidateId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Candidates;    