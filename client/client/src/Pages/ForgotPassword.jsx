import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your backend API to send reset link
    console.log('Reset link sent to:', email);
    setSubmitted(true);
  };

  return (
    <div className="container forgot-page py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h3 className="mb-4 text-center text-primary fw-bold">Forgot Password</h3>

              {submitted ? (
                <div className="alert alert-success text-center">
                  If this email is registered, a password reset link has been sent.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Enter Your Registered Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Send Reset Link
                  </button>
                </form>
              )}

              <div className="text-center mt-3">
                <small><a href="/login">Back to Login</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
