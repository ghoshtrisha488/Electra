import React, { useContext } from 'react';


const AdminDashboard = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Your role is: {userRole}</p>
      {/* Add admin-specific features here */}
    </div>
  );
};

export default AdminDashboard;