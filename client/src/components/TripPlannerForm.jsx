import React, { useState } from 'react';
import { searchLocation } from '../services/api';

const TripPlannerForm = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await searchLocation(value);
        setSuggestions(res.data);
      } catch (err) {
        console.error('Location search failed:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (location) => {
    setSelectedLocation(location);
    setQuery(location.name);
    setSuggestions([]);
    onLocationSelect(location); // optional, for parent component
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">🌍 What is your destination of choice?</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a location"
        className="w-full p-3 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded mt-2 bg-white shadow max-h-48 overflow-y-auto">
          {suggestions.map((loc, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(loc)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {loc.name}
            </li>
          ))}
        </ul>
      )}

      {selectedLocation && (
        <div className="mt-4 bg-blue-50 p-4 rounded shadow">
          <p><strong>Selected:</strong> {selectedLocation.name}</p>
          <p><strong>Lat:</strong> {selectedLocation.lat}</p>
          <p><strong>Lng:</strong> {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default TripPlannerForm;
