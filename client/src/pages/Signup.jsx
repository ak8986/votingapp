import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie for storing cookies
import "./Register.css"; // Import some styles to make it look good
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from "mdb-react-ui-kit";

const Register = () => {
  // Set up state for each form input
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    aadharCardNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccessMessage("");

  //   try {
  //     // Send a POST request to your backend to register the user
  //     console.log("mai aaya");
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/user/signup`,
  //       formData
  //     );

  //     if (response.status === 200) {
  //       setSuccessMessage("Registration successful! You can now log in.");

  //       // Store the token in a cookie using js-cookie
  //       const { token } = response.data;
  //       localStorage.setItem("token", response.data.token);

  //       // Clear the form after successful registration
  //       setFormData({
  //         name: "",
  //         age: "",
  //         email: "",
  //         mobile: "",
  //         address: "",
  //         aadharCardNumber: "",
  //         password: "",
  //       });

  //       navigate("/candidate/vote");
  //     } else {
  //       console.log("i am error[[[[[[[");
  //       toast.error("Bad credentials");
  //     }
  //   } catch (err) {
  //     setError("Registration failed. Please try again.");
  //     console.error("Error during registration:", err);
  //     toast.error("Bad credentials");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    // Check if the age is less than 18
    if (formData.age < 18) {
      toast.error("Not eligible to cast vote. Must be 18 or older.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Stop form submission if age is less than 18
    }
  
    try {
      // Send a POST request to your backend to register the user
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/user/signup`,
        formData
      );
  
      if (response.status === 200) {
        setSuccessMessage("Registration successful! You can now log in.");
  
        // Store the token in a cookie using js-cookie
        const { token } = response.data;
        localStorage.setItem("token", response.data.token);
  
        // Clear the form after successful registration
        setFormData({
          name: "",
          age: "",
          email: "",
          mobile: "",
          address: "",
          aadharCardNumber: "",
          password: "",
        });
  
        navigate("/candidate/vote");
      } else {
        toast.error("Bad credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Error during registration:", err);
      toast.error("Bad credentials", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  

  return (
    <div className="register-page">
  <div className="left-image">
    <img src="" alt="Left Image" />
  </div>

  <div className="register">
    <h1>Register</h1>
    {error && <p className="error">{error}</p>}
    {successMessage && <p className="success">{successMessage}</p>}

    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Aadhar Card Number:</label>
        <input
          type="text"
          name="aadharCardNumber"
          value={formData.aadharCardNumber}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Register
      </button>
    </form>
  </div>

  <div className="right-image">
    <img src="path_to_right_image.jpg" alt="Right Image" />
  </div>
</div>

  );
};

export default Register;
