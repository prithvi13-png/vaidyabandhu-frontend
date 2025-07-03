import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register phone:', phone);
    // Add API call here
  };

  return (
    <section className="sigma_section pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit} className="white-form shadow p-4 rounded">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-block mt-3">
                Register
              </button>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
