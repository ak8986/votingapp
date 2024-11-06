import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css'; // Reuse the Register.css for consistent styling

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`);
      setCandidates(response.data);
    };
    fetchCandidates();
  }, []);

  return (
    <div className="container"> {/* Center the content */}
      <div className="form-container"> {/* Use the form container style */}
        <h2 className="form-title">All Candidates</h2> {/* Styled title */}
        <ul className="candidate-list"> {/* Styled candidate list */}
          {candidates.map((candidate) => (
            <li key={candidate._id} className="vote-count-item"> {/* Use the same styling as list items */}
              <span className="candidate-name vote-count-party">{candidate.name}</span> {/* Candidate name */}
              <span className="candidate-party vote-count-party">{candidate.party}</span> {/* Candidate party */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidateList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CandidateList.css'; // Import CSS for styling

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);

//   // Fetch the list of candidates on component mount
//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`);
//         setCandidates(response.data);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       }
//     };
//     fetchCandidates();
//   }, []);

//   // Handle deleting a candidate
//   const handleDelete = async (candidateID) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${candidateID}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // Remove the deleted candidate from the state
//       setCandidates(candidates.filter(candidate => candidate._id !== candidateID));
//     } catch (error) {
//       console.error('Error deleting candidate:', error);
//     }
//   };

//   return (
//     <div className="candidate-list">
//       <h2>All Candidates</h2>
//       <ul>
//         {candidates.map((candidate) => (
//           <li key={candidate._id} className="candidate-item">
//             <span className="candidate-name">{candidate.name} - {candidate.party}</span>
//             <button className="delete-button" onClick={() => handleDelete(candidate._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CandidateList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CandidateList.css'; // Import CSS for styling

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`);
//       setCandidates(response.data);
//     };
//     fetchCandidates();
//   }, []);

//   return (
//     <div className="candidate-list-container">
//       <div className="candidate-list">
//         <h2>All Candidates</h2>
//         <ul>
//           {candidates.map((candidate) => (
//             <li key={candidate._id}>
//               {candidate.name} - {candidate.party}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CandidateList;


