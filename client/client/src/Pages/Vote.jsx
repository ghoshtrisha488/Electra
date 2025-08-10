import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vote.css'; // Optional CSS

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [electionId, setElectionId] = useState('E001'); // Example election ID
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${'http://localhost:5000/api/vote'}/api/candidates/${electionId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCandidates(response.data);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, [electionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) {
      setError('Please select a candidate');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/vote`, {
        candidateId: selectedCandidate,
        electionId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Vote cast successfully!');
      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    }
  };

  return (
    <div className="container vote-page py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Cast Your Vote</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Candidate</label>
          <select className="form-control" value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)} required>
            <option value="">-- Choose Candidate --</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.fullName} ({candidate.party})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Vote</button>
      </form>
    </div>
  );
};

export default Vote;