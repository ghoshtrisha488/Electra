import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VoterProfile.css'; // Ensure this file exists

const VoterProfile = () => {
  const { voterId } = useParams(); // Get voter ID from URL
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVoter = async () => {
      setError('');
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/voter/${voterId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setVoter(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch voter details');
      } finally {
        setLoading(false);
      }
    };
    fetchVoter();
  }, [voterId]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/voter/${voterId}/e-voter-card`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob', // Important for file downloads
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'e-voter-card.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to download e-Voter Card');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!voter) return <p>Voter not found</p>;

  return (
    <div className="container voter-profile-page py-5">
      <h2 className="text-center mb-4 text-primary fw-bold">Voter Profile</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <p><strong>Name:</strong> {voter.name}</p>
              <p><strong>Voter ID:</strong> {voter.voterId}</p>
              <p><strong>Age:</strong> {voter.age}</p>
              <p><strong>Gender:</strong> {voter.gender}</p>
              {voter.image && <img src={`${import.meta.env.VITE_API_URL}/uploads/${voter.image}`} alt="Voter Photo" style={{ width: '100%', marginBottom: '15px' }} />}
              <button onClick={handleDownload} className="btn btn-primary w-100">
                Download e-Voter Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterProfile;