// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// const AddCandidate = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     party: '',
//     manifesto: ''
//   });
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
    
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       // Show success toast
//       toast.success('Candidate added successfully!', {
//         position: toast.POSITION.TOP_CENTER
//       });

//       // Clear form fields
//       setFormData({
//         name: '',
//         party: '',
//         manifesto: ''
//       });

//       console.log(response.data);
//     } catch (error) {
//       console.error('Error adding candidate:', error);
//       // Show error toast
//       toast.error('Failed to add candidate. Please try again.', {
//         position: toast.POSITION.TOP_CENTER
//       });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Candidate Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Party Name"
//           value={formData.party}
//           onChange={(e) => setFormData({ ...formData, party: e.target.value })}
//         />
//         <textarea
//           placeholder="Manifesto"
//           value={formData.manifesto}
//           onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
//         />
//         <button type="submit">Add Candidate</button>
//       </form>

//       {/* Toast Container to show notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCandidate;





import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './Register.css'; // Import Register.css for styling

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    manifesto: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/candidate`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      // Show success toast with the candidate's name
      toast.success(`Candidate ${formData.name} added successfully!`, {
        position: toast.POSITION.TOP_CENTER,
      });
    
      // Clear form fields after successful submission
      setFormData({
        name: '',
        party: '',
        manifesto: ''
      });
    
      console.log(response.data);
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    
  };

  return (
    <div className="container"> {/* Center the form container */}
      <div className="form-container"> {/* Use form container styling */}
        <h2 className="form-title">Add Candidate</h2> {/* Styled form title */}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Candidate Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Candidate Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="party">Party Name</label>
            <input
              type="text"
              id="party"
              className="form-input"
              placeholder="Party Name"
              value={formData.party}
              onChange={(e) => setFormData({ ...formData, party: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="manifesto">Manifesto</label>
            <textarea
              id="manifesto"
              className="form-input"
              placeholder="Manifesto"
              value={formData.manifesto}
              onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
            />
          </div>

          <button type="submit" className="btn">Add Candidate</button>
        </form>

        {/* Toast Container to show notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddCandidate;
