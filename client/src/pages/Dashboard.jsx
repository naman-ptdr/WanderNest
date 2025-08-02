import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <p className="text-gray-700">This is a protected route. Only logged-in users can access this page.</p>
    </div>
  );
};

export default Dashboard;