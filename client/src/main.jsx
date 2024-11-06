import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './pages/Navbar'; // Import the Navbar component
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddCandidate from './pages/AddCandidate';
import VoteCandidate from './pages/VoteCandidate';
import VoteCount from './pages/VoteCount';
import CandidateList from './pages/CandidateList';
import LandingPage from './pages/LandingPage';
import Register from './pages/Signup';
import ManageCandidates from './pages/ManageCandidate'; // Import DeleteCandidate page
import AdminLogin from'./pages/AdminLogin';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/Notfound';


import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/candidate/add" element={<AddCandidate />} />
        <Route path="/candidate/vote" element={<VoteCandidate />} />
        <Route path="/candidate/vote/count" element={<VoteCount />} />
        <Route path="/candidate" element={<CandidateList />} />
        <Route path='/candidate/manage' element={<ManageCandidates/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  </React.StrictMode>
);



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './index.css';
// import Navbar from './pages/Navbar'; // Import the Navbar component
// import Login from './pages/Login';
// import Profile from './pages/Profile';
// import AddCandidate from './pages/AddCandidate';
// import VoteCandidate from './pages/VoteCandidate';
// import VoteCount from './pages/VoteCount';
// import CandidateList from './pages/CandidateList';
// import LandingPage from './pages/LandingPage';
// import Register from './pages/Signup';
// import DeleteCandidate from './pages/DeleteCandidate';
// import UpdateCandidate from './pages/UpdateCandidate'; // Import UpdateCandidate
// import { ToastContainer } from 'react-toastify';
// import AdminLogin from './pages/AdminLogin';
// import 'react-toastify/dist/ReactToastify.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/candidate/add" element={<AddCandidate />} />
//         <Route path="/candidate/vote" element={<VoteCandidate />} />
//         <Route path="/candidate/vote/count" element={<VoteCount />} />
//         <Route path="/candidate" element={<CandidateList />} />
//         <Route path="/candidate/update/" element={<UpdateCandidate />} /> {/* New Route for Update */}
//         <Route path="/candidate/delete/" element={<DeleteCandidate />} />
        
        
      
//       </Routes>
//       <ToastContainer />
//     </Router>
//   </React.StrictMode>
// );

