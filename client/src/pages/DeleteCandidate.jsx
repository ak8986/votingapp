import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Track selected candidate
  const [isConfirming, setIsConfirming] = useState(false); // Track confirmation status

  // Fetch the list of candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  // Handle candidate selection for deletion
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setIsConfirming(true); // Trigger confirmation mode
  };

  // Handle candidate deletion
  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${selectedCandidate._id}`, // Assuming candidate has an 'id' field
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Candidate deleted:', response.data);

      // Remove deleted candidate from the state
      setCandidates(candidates.filter((candidate) => candidate._id !== selectedCandidate._id));
      setIsConfirming(false);
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  // Handle cancellation of deletion
  const handleCancel = () => {
    setIsConfirming(false);
    setSelectedCandidate(null);
  };

  return (
    <div>
      <h1>Delete Candidate</h1>
      {!isConfirming ? (
        <div>
          <h2>Select a candidate to delete:</h2>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                {candidate.name} {/* Assuming candidate has a 'name' field */}
                <button onClick={() => handleCandidateSelect(candidate)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Are you sure you want to delete {selectedCandidate.name}?</h2>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeleteCandidate;
