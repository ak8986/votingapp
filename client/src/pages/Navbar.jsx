import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(null); // State for vote count
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Fetch the live vote count
    const fetchVoteCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/votes/count`); // Adjust this URL to match your backend route
        setVoteCount(response.data.count);
      } catch (error) {
        console.error('Failed to fetch vote count', error);
      }
    };

    fetchVoteCount(); // Call the function on component mount
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>iVoteIndia</Link>
        <div className={`menu-icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          ☰
        </div>
        <ul id="1234" className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLinkClick}>Home</Link>
          </li>

          {/* Live Vote Count Section */}
          <li className="nav-item">
            <Link to="/candidate/vote/count" className="nav-links" onClick={handleLinkClick}>VoteCount {voteCount !== null ? voteCount : ''}</Link>
          </li>

          {isAuthenticated ? (
            <>
             
              <li className="nav-item">
                <Link to="/candidate" className="nav-links" onClick={handleLinkClick}>Candidates</Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-links"
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                    window.location.reload();
                    handleLinkClick();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={handleLinkClick}>Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links" onClick={handleLinkClick}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;




