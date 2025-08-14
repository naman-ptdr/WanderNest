import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripPlannerForm from "../components/TripPlannerForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <TripPlannerForm
        onLocationChosen={(loc) => setSelectedLocation(loc)}
        onTripGenerated={(trip) => {
          navigate("/trip-results", { state: { trip } });
        }}
      />
    </div>
  );
};

export default Dashboard;
