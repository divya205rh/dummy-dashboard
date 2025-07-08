import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import CommentsDashboard from './components/CommentsDashboard';

function App() {
  return (
    <Router>
      <div className="d-flex flex-row justify-content-between align-items-center bg-dark text-white p-3 d-flex justify-content-between align-items-center">
        <h4 className="m-2 p-2">SWIFT</h4>
        <h4 className="m-2 p-2">Ervin Howell</h4>
      </div>
      <Routes>
        <Route path="/" element={<CommentsDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
