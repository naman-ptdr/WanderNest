import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const budgetOptions = [
  { icon: '💸', title: 'Cheap', desc: 'Stay conscious of costs' },
  { icon: '💵', title: 'Moderate', desc: 'Keep cost on the average side' },
  { icon: '💎', title: 'Luxury', desc: 'Don’t worry about cost' },
];

const travelGroups = [
  { icon: '✈️', title: 'Just Me', value: 'solo', desc: 'A sole traveler in exploration' },
  { icon: '👫', title: 'Couple', value: 'couple', desc: 'Two travelers in tandem' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family', value: 'family', desc: 'A group of fun-loving adventurers' },
  { icon: '👫👬👭', title: 'Friends', value: 'friends', desc: 'A bunch of thrill-seekers' },
];

const TripPreferences = ({ selectedLocation, onGenerate }) => {
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelGroup, setTravelGroup] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!selectedLocation || !days || !budget || !travelGroup) {
      alert('Please fill out all fields!');
      return;
    }

    const preferences = {
      location: selectedLocation.name,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      days: parseInt(days),
      budget,
      travelGroup,
    };

    setLoading(true);
    await onGenerate(preferences); // trigger Gemini call in parent
    setLoading(false);
  };

  return (
    <div className="mt-10 space-y-8">
      {/* Days Input */}
      <div>
        <h2 className="text-xl font-medium mb-2">How many days are you planning your trip?</h2>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Ex. 3"
          className="w-full max-w-md p-3 border border-gray-300 rounded"
        />
      </div>

      {/* Budget Options */}
      <div>
        <h2 className="text-xl font-medium mb-2">What is your budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {budgetOptions.map((item) => (
            <div
              key={item.title}
              onClick={() => setBudget(item.title)}
              className={`p-4 border rounded-lg cursor-pointer transition-all
                ${budget === item.title
                  ? 'border-black shadow-lg'
                  : 'border-gray-300 hover:shadow-md'}`}
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Group */}
      <div>
        <h2 className="text-xl font-medium mb-2">Who do you plan on traveling with?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {travelGroups.map((item) => (
            <div
              key={item.value}
              onClick={() => setTravelGroup(item.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-all
                ${travelGroup === item.value
                  ? 'border-black shadow-lg'
                  : 'border-gray-300 hover:shadow-md'}`}
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-bold mt-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300 flex items-center gap-2"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              Generating...
            </>
          ) : (
            'Generate Trip'
          )}
        </button>
      </div>
    </div>
  );
};

export default TripPreferences;
