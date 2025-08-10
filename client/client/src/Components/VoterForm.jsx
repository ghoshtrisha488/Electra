import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VoterForm.css';

const VoterForm = () => {
  const { token } = useContext(AuthContext);
  const [voter, setVoter] = useState({
    voterId: '',
    name: '',
    age: '',
    city: '',
    gender: 'Male',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setVoter((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('voterId', voter.voterId);
    formData.append('name', voter.name);
    formData.append('age', voter.age);
    formData.append('city', voter.city);
    formData.append('gender', voter.gender);
    if (voter.image) formData.append('image', voter.image);

    try {
      await axios.post('http://localhost:5000/api/voter', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Voter added successfully!');
      setVoter({ voterId: '', name: '', age: '', city: '', gender: 'Male', image: null }); // Reset form
      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add voter');
    }
  };

  return (
    <div className="voter-form-container">
      <h2>Add New Voter</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Voter ID:</label>
          <input type="text" name="voterId" value={voter.voterId} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={voter.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={voter.age} onChange={handleChange} required min="18" />
        </div>
        <div>
          <label>City:</label>
          <input type="text" name="city" value={voter.city} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={voter.gender} onChange={handleChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="image" onChange={handleChange} accept="image/*" />
        </div>
        <button type="submit">Add Voter</button>
      </form>
    </div>
  );
};

export default VoterForm;