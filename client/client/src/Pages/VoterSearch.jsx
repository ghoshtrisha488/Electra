// VoterSearch.jsx
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const VoterSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    voterId: "",
    mobile: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/voter/search", {
        params: searchParams,
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching search results");
    }
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg p-4">
        <h3 className="text-center text-primary mb-4">🔍 Voter Search</h3>
        <form onSubmit={handleSearch} className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Voter ID</label>
            <input
              type="text"
              className="form-control"
              name="voterId"
              value={searchParams.voterId}
              onChange={handleChange}
              placeholder="Enter voter ID"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={searchParams.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>
          <div className="col-12 text-center mt-3">
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      {results.length > 0 && (
        <div className="card mt-4 shadow-lg p-4">
          <h4 className="mb-3 text-success">Search Results</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Full Name</th>
                  <th>Voter ID</th>
                  <th>Aadhar No</th>
                  <th>Mobile</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {results.map((voter) => (
                  <tr key={voter._id}>
                    <td>{voter.fullName}</td>
                    <td>{voter.voterId}</td>
                    <td>{voter.aadharNo}</td>
                    <td>{voter.mobile}</td>
                    <td>{new Date(voter.dob).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {results.length === 0 && !loading && (
        <p className="text-center text-muted mt-3">No results found</p>
      )}
    </div>
  );
};

export default VoterSearch;

