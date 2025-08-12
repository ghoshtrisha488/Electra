import React, { useState } from 'react';
import axios from 'axios';

export default function TrackApplication() {
  const [query, setQuery] = useState({
    applicationId: '',
    voterId: '',
    mobile: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!query.applicationId && !query.voterId && !query.mobile) {
      setError('Please enter Application ID or Voter ID or Mobile number');
      return;
    }

    setLoading(true);
    try {
      // Use full backend URL or setup proxy in React to avoid hardcoding
      const response = await axios.get('http://localhost:5000/api/applications/search', {
        params: {
          applicationId: query.applicationId || undefined,
          voterId: query.voterId || undefined,
          mobile: query.mobile || undefined,
        },
      });

      if (Array.isArray(response.data) && response.data.length > 0) {
        setResult(response.data);
      } else {
        setResult([]);
        setError('No application found matching the given details.');
      }
    } catch (err) {
      console.error('Error fetching application:', err.response || err.message || err);
      setError('Failed to fetch application. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2>Track Application Status</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="applicationId" className="form-label">Application ID</label>
          <input
            type="text"
            id="applicationId"
            name="applicationId"
            value={query.applicationId}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Application ID"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="voterId" className="form-label">Voter ID</label>
          <input
            type="text"
            id="voterId"
            name="voterId"
            value={query.voterId}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Voter ID"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={query.mobile}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Mobile Number"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {result && result.length > 0 ? (
        <div className="card">
          <div className="card-header">Application Result</div>
          <div className="card-body">
            {result.map((app) => (
              <div key={app._id} className="mb-3">
                <p><strong>Application ID:</strong> {app.applicationId || 'N/A'}</p>
                <p><strong>Voter ID:</strong> {app.voterId || 'N/A'}</p>
                <p><strong>Mobile:</strong> {app.mobile || 'N/A'}</p>
                <p><strong>Status:</strong> {app.status || 'Pending'}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && !error && <p>No applications found.</p>
      )}
    </div>
  );
}