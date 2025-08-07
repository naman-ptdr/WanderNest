import React, { useState } from 'react';
import TripPlannerForm from '../components/TripPlannerForm';

const Dashboard = () => {
  const [location, setLocation] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tell us your travel preferences 🏕️🌴</h1>
      <p className="text-gray-600 mb-8">
        Just provide basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      {/* Trip Planner Form */}
      <TripPlannerForm onLocationChosen={setLocation} />

      {/* Show selected location details */}
      {location && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold">Location selected:</h2>
          <p>{location.name}</p>
          <p>Lat: {location.lat}, Lng: {location.lng}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
