import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Import Register.css for form styling

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState([]); // Store the list of candidates
  const [selectedCandidate, setSelectedCandidate] = useState(null); // Track selected candidate for both delete and edit
  const [isConfirming, setIsConfirming] = useState(false); // Track confirmation status for deletion
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    manifesto: ''
  }); // Track form data for updating candidate
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch the list of candidates on component mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  // Handle candidate selection for deletion
  const handleCandidateSelectForDelete = (candidate) => {
    setSelectedCandidate(candidate);
    setIsConfirming(true); // Trigger confirmation mode
  };

  // Handle candidate deletion
  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${selectedCandidate._id}`,
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

  // Handle candidate selection for updating
  const handleCandidateSelectForEdit = (candidate) => {
    setSelectedCandidate(candidate); // Set the selected candidate for updating
    setFormData(candidate); // Populate the form with the candidate's current data
  };

  // Handle form submission for updating the candidate
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate/${selectedCandidate._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Candidate updated:', response.data);

      // Update the candidates list with the updated data
      setCandidates(candidates.map((candidate) =>
        candidate._id === selectedCandidate._id ? response.data : candidate
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

  // Handle the "Add Candidate" button click
  const handleAddCandidateClick = () => {
    navigate('/candidate/add'); // Navigate to the AddCandidate route
  };

  return (
    <div className="container">
      <div className="form-container"> {/* Center container */}
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">Manage Candidates</h1>

        {/* Add Candidate Button */}
        <div className="text-center mb-6">
          <button onClick={handleAddCandidateClick} className="bg-green-500 text-white p-2 rounded-lg">
            Add Candidate
          </button>
        </div>

        {/* Display the list of candidates with both "Delete" and "Edit" buttons */}
        <div className="candidate-list mb-6">
          <h2 className="text-xl font-semibold mb-4">Select a candidate to manage:</h2>
          <ul className="space-y-4">
            {candidates.map((candidate) => (
              <li key={candidate._id} className="flex justify-between items-center bg-slate-100 p-4 rounded-lg shadow-sm">
                <span className="text-lg font-medium text-slate-700">{candidate.name}</span> {/* Display candidate's name */}
                <div>
                  <button onClick={() => handleCandidateSelectForDelete(candidate)} className="text-red-500 mr-4">Delete</button>
                  <button onClick={() => handleCandidateSelectForEdit(candidate)} className="text-blue-500">Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Confirm Deletion */}
        {isConfirming && (
          <div className="p-4 bg-red-100 text-center rounded-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete {selectedCandidate.name}?</h2>
            <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-lg mr-4">Yes, Delete</button>
            <button onClick={handleCancel} className="bg-gray-300 p-2 rounded-lg">Cancel</button>
          </div>
        )}

        {/* Update Form */}
        {selectedCandidate && !isConfirming && (
          <form onSubmit={handleUpdateSubmit} className="form-content space-y-6"> {/* Center the form */}
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Edit Candidate</h2>
            <div className="form-group">
              <label className="block text-slate-700 font-semibold mb-2">Candidate Name:</label>
              <input
                type="text"
                placeholder="Candidate Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="block text-slate-700 font-semibold mb-2">Party Name:</label>
              <input
                type="text"
                placeholder="Party Name"
                value={formData.party}
                onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="block text-slate-700 font-semibold mb-2">Manifesto:</label>
              <textarea
                placeholder="Manifesto"
                value={formData.manifesto}
                onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn">
              Update Candidate
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageCandidates;
