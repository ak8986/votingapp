import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Assuming you will style this page

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <div className="admin-actions">
        <h2>Manage Candidates</h2>
        <div className="actions-container">
          <Link to="/admin/candidate/update" className="action-button">
            Update Candidate
          </Link>
          <Link to="/admin/candidate/delete" className="action-button">
            Delete Candidate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
