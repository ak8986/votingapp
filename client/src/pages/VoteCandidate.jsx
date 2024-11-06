import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css'; // Import the same styling used for Register and Login forms

const VoteCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

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

  const handleVote = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/vote/${selectedCandidate}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Your vote has been counted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error('Error voting:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Vote for a Candidate</h2>

        <form className="form">
          <div className="form-group">
            <label>Select a Candidate:</label>
            <select
              value={selectedCandidate} 
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="form-input"
            >
              <option value="" disabled>Select a Candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name} - {candidate.party}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="button"
            onClick={handleVote} 
            className="btn"
          >
            Vote
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoteCandidate;
