// src/pages/Vote.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vote.css';

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/candidates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCandidates(res.data);
      } catch {
        setError('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, [API_BASE]);

  // Submit vote
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) {
      setError('Please select a candidate');
      return;
    }
    try {
      setError('');
      await axios.post(
        `${API_BASE}/api/vote`,
        { candidateId: selectedCandidate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('✅ Vote cast successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    }
  };

  return (
    <div className="container vote-page py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Cast Your Vote</h2>

      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Candidate</label>
          <select
            className="form-control"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
          >
            <option value="">-- Choose Candidate --</option>
            {candidates.map((candidate) => (
              <option key={candidate._id} value={candidate._id}>
                {candidate.fullName} ({candidate.party})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Vote
        </button>
      </form>
    </div>
  );
};

export default Vote;