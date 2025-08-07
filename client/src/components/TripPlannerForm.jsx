import React, { useState } from "react";
import { searchLocation } from "../services/api.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const budgetOptions = [
  { title: "Cheap", icon: "💸", desc: "Stay conscious of costs" },
  { title: "Moderate", icon: "💵", desc: "Keep costs average" },
  { title: "Luxury", icon: "💎", desc: "Don’t worry about cost" },
];

const travelOptions = [
  { title: "Just Me", icon: "✈️", value: "solo" },
  { title: "A Couple", icon: "👫", value: "couple" },
  { title: "Family", icon: "👨‍👩‍👧‍👦", value: "family" },
  { title: "Friends", icon: "👫👬👭👩‍👩‍👦", value: "friends" },
];

const TripPlannerForm = ({ onLocationChosen }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [days, setDays] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const res = await searchLocation(value);
        console.log("Suggestions from API:", res.data); // ⬅️ Add this
        setSuggestions(res.data);
      } catch (err) {
        console.error("Location search failed:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (sugg) => {
    const loc = {
      name: sugg.name || "Unknown",
      lat: sugg.lat,
      lng: sugg.lng,
    };

    setSelectedLocation(loc);
    onLocationChosen(loc);
    setQuery(loc.name);
    setSuggestions([]);
  };

  const handleGenerate = async () => {
    if (!selectedLocation || !days || !selectedBudget || !selectedGroup) {
      alert("Please fill all fields before generating trip.");
      return;
    }

    const input = {
      location: selectedLocation,
      days,
      budget: selectedBudget,
      group: selectedGroup,
    };

    console.log("Sending to Gemini:", input);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Trip plan generated! (Fake for now)");
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Destination Input */}
      <div>
        <label className="block mb-2 text-lg font-semibold">
          What is your destination of choice?
        </label>
        <input
          type="text"
          value={query || ""}
          onChange={handleInputChange}
          placeholder="Enter a location"
          className="w-full p-2 border border-gray-300 rounded"
        />

        {suggestions.length > 0 && (
          <ul className="absolute border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto bg-white z-50 w-full shadow-lg">
            {suggestions.map((sugg, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(sugg)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {sugg.name || "Unknown"}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Days */}
      <div>
        <label className="block mb-2 text-lg font-semibold">
          How many days?
        </label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Ex. 3"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block mb-3 text-lg font-semibold">
          What is your budget?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetOptions.map((item) => (
            <div
              key={item.title}
              onClick={() => setSelectedBudget(item.title)}
              className={`p-4 border rounded-lg cursor-pointer text-center 
              ${
                selectedBudget === item.title
                  ? "bg-black text-white border-black"
                  : "hover:shadow"
              } `}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="font-bold mt-1">{item.title}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Group */}
      <div>
        <label className="block mb-3 text-lg font-semibold">
          Who are you traveling with?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {travelOptions.map((item) => (
            <div
              key={item.value}
              onClick={() => setSelectedGroup(item.value)}
              className={`p-4 border rounded-lg cursor-pointer text-center 
              ${
                selectedGroup === item.value
                  ? "bg-black text-white border-black"
                  : "hover:shadow"
              } `}
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="font-bold mt-1">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded hover:bg-blue-700 transition-all"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>
    </div>
  );
};

export default TripPlannerForm;
