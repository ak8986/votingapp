import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import './Register.css'; // Import styles from Register.css
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit'; // Import necessary MDB components

const Login = () => {
  const [formData, setFormData] = useState({
    aadharCardNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/user/login`, formData);
      localStorage.setItem('token', response.data.token);
      toast.success("Logged in successfully");

      // Redirect to the VoteCandidate route
      navigate('/candidate/vote');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Bad credentials");
    }
  };

  return (
    <div className="register-page">
      <div className="register">
        <h1>Login</h1>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Aadhar Card Number:</label>
            <MDBInput
              type="text"
              value={formData.aadharCardNumber}
              onChange={(e) => setFormData({ ...formData, aadharCardNumber: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <MDBInput
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <MDBBtn type="submit" className="submit-btn">Login</MDBBtn>
        </form>
      </div>
    </div>
  );
};

export default Login;
