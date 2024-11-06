import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css'; // Importing the same Register.css for consistent styling

const VoteCount = () => {
  const [voteCounts, setVoteCounts] = useState([]);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/vote/count`);
        setVoteCounts(response.data);
      } catch (error) {
        console.error('Error fetching vote counts:', error);
      }
    };
    fetchVoteCounts();
  }, []);

  return (
    <div className="vote-count-container">
      <h2 className="vote-count-heading">Vote Counts</h2>
      <ul className="vote-count-list">
        {voteCounts.map((candidate, index) => (
          <li key={index} className="vote-count-item">
            <div className="vote-count-party">{candidate.party}</div>
            <div className="vote-count-votes">{candidate.count} votes</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteCount;
