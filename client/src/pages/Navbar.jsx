import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(null); // State for vote count

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Voting App</Link>
        <div className={`menu-icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          ☰
        </div>
        <ul id="1234" className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>

          {/* Live Vote Count Section */}
          <li className="nav-item">
            <Link to="/candidate/vote/count" className="nav-links">VoteCount {voteCount !== null ? voteCount : ''}</Link>
          </li>

          {isAuthenticated ? (
            <>
             
              <li className="nav-item">
                <Link to="/candidate" className="nav-links">Candidates</Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-links"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-links">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './Navbar.css';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false); // State to track if admin is logged in
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [voteCount, setVoteCount] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const adminFlag = localStorage.getItem('isAdmin'); // Check if the user is admin
//     setIsAuthenticated(!!token);
//     setIsAdmin(!!adminFlag); // Set admin status

//     // Fetch vote count
//     const fetchVoteCount = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/votes/count`);
//         setVoteCount(response.data.count);
//       } catch (error) {
//         console.error('Failed to fetch vote count', error);
//       }
//     };

//     fetchVoteCount();
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">Voting App</Link>
//         <div className={`menu-icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
//           ☰
//         </div>
//         <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
//           <li className="nav-item">
//             <Link to="/" className="nav-links">Home</Link>
//           </li>

//           {/* Live Vote Count Section */}
//           <li className="nav-item">
//             <Link to="/candidate/vote/count" className="nav-links">VoteCount {voteCount !== null ? voteCount : ''}</Link>
//           </li>

//           {isAuthenticated ? (
//             <>
//               {isAdmin && ( // Conditionally render only for admins
//                 <li className="nav-item">
//                   <Link to="/candidate" className="nav-links">Candidates</Link>
//                 </li>
//               )}
//               <li className="nav-item">
//                 <button
//                   className="nav-links"
//                   onClick={() => {
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('isAdmin'); // Remove admin flag
//                     window.location.reload();
//                   }}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="nav-item">
//                 <Link to="/login" className="nav-links">Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/signup" className="nav-links">Register</Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



