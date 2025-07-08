import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUser(data[0]));
  }, []);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>User ID:</strong> {user.id}</li>
        <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
        <li className="list-group-item"><strong>Address:</strong> {user.address.street}, {user.address.city}</li>
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;
