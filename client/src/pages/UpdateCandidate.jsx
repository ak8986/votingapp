import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCandidate = () => {
  const [candidates, setCandidates] = useState([]); // Store the list of candidates
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Track the candidate being edited
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    manifesto: ''
  });

  // Fetch the list of candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  // Fetch the candidate's data and populate the form for editing
  const handleEdit = async (candidateID) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${candidateID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedCandidate(candidateID);
      setFormData(response.data); // Auto-fill the form with the candidate's data
    } catch (error) {
      console.error('Error fetching candidate details:', error);
    }
  };

  // Handle form submission for updating the candidate
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${selectedCandidate}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Candidate updated:', response.data);

      // Update the candidates list with the updated data
      setCandidates(candidates.map((candidate) =>
        candidate._id === selectedCandidate ? response.data : candidate
      ));

      // Clear the form after submission
      setSelectedCandidate(null);
      setFormData({
        name: '',
        party: '',
        manifesto: ''
      });
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <div>
      <h1>Update Candidate</h1>

      {/* Display the list of candidates with an "Edit" button */}
      <div>
        <h2>Select a candidate to edit:</h2>
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate._id}>
              {candidate.name} {/* Display candidate's name */}
              <button onClick={() => handleEdit(candidate._id)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Show the update form only when a candidate is selected for editing */}
      {selectedCandidate && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Candidate</h2>
          <input
            type="text"
            placeholder="Candidate Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Party Name"
            value={formData.party}
            onChange={(e) => setFormData({ ...formData, party: e.target.value })}
          />
          <textarea
            placeholder="Manifesto"
            value={formData.manifesto}
            onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
          />
          <button type="submit">Update Candidate</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCandidate;
