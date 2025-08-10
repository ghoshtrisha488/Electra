import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VoterRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    state: "",
    district: "",
    voterId: "",
    aadharNo:"",
    email: "",
    mobile: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  try {
    const res = await fetch("http://localhost:5000/api/voter/register", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Voter Registration Successful!");
      console.log("Saved Voter:", result.voter);
      setFormData({
        fullName: "",
        dob: "",
        gender: "",
        address: "",
        state: "",
        district: "",
        voterId: "",
        aadharNo:"",
        email: "",
        mobile: "",
        photo: null,
      });
    } else {
      alert(`❌ ${result.message || "Error registering voter"}`);
    }
  } catch (err) {
    console.error("Server error:", err);
    alert("❌ Server Error.");
  }
};



  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center text-primary mb-4">Voter Registration Form</h2>
      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Full Name */}
            <div className="col-md-6 mb-3">
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

            {/* Date of Birth */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
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

            {/* Voter ID */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Voter ID</label>
              <input
                type="text"
                className="form-control"
                name="voterId"
                value={formData.voterId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
  <label className="form-label">Aadhar Number</label>
  <input
    type="text"
    className="form-control"
    name="aadharNo"
    value={formData.aadharNo}
    onChange={handleChange}
    placeholder="Enter Aadhar Number"
    required
  />
</div>

            {/* Address */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                rows="2"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* State */}
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* District */}
            <div className="col-md-6 mb-3">
              <label className="form-label">District</label>
              <input
                type="text"
                className="form-control"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Upload Photo</label>
              <input
                type="file"
                className="form-control"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-success px-4">
                Submit Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoterRegistrationForm;
