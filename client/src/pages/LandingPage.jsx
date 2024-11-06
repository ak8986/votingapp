import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Import the styles

const LandingPage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show the title after a delay to allow for feature animations
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 1500); // Adjust this delay as necessary

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // If the admin is already logged in, redirect to the dashboard
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div className="landing">
      <header className="landing-header">
        {showTitle && <h1 className="voting-title">Voting Application</h1>}
      </header>

      <section className="features">
       
        <div className="feature-grid">
          <div className="feature-item left">
            <img src="./public/pic1.png" alt="Feature 1" className="feature-image" />
          </div>
          <div className="feature-item bottom">
            <img src="./public/pic2.jpg" alt="Feature 2" className="feature-image" />
          </div>
          <div className="feature-item right">
            <img src="./public/pic3.jpg" alt="Feature 3" className="feature-image" />
          </div>
        </div>
      </section>

      <section className="cta-section">
      <div className="cta-buttons">
        <a href="/signup" className="cta-button">Sign Up as Candidate</a>
        <a href="/login" className="cta-button">Login as Candidate</a>
    
        {/* Hide "Login as Administrator" if admin is already logged in */}
        {!localStorage.getItem('isAdmin') && (
          <a href="/admin/login" className="cta-button admin-button">Login as Administrator</a>
        )}
      </div>
    </section>
    

      <footer className="footer">
        <p>&copy; 2024 [Powered by Election Commission]. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
