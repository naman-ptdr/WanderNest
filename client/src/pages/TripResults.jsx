import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TripResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tripData = state?.trip;

  if (!tripData) {
    return <p className="p-6">No trip data found. Please generate a trip first.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ⬅ Replan Trip
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Trip Plan for {tripData.location?.name}
      </h1>

      {/* Hotels Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Recommended Hotels</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tripData.hotelOptions?.map((hotel, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden shadow bg-white">
              {hotel.hotelImageUrl && (
                <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg">{hotel.hotelName}</h3>
                <p className="text-sm text-gray-600">{hotel.hotelAddress}</p>
                <p className="text-sm">💲 {hotel.price}</p>
                <p className="text-sm">⭐ {hotel.rating}</p>
                <p className="text-sm mt-2">{hotel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Itinerary Section */}
      {tripData.itinerary?.map((day) => (
        <div key={day.day} className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Day {day.day} — {day.bestTimeVisit}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {day.plan.map((place, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden shadow bg-white">
                {place.placeImageUrl && (
                  <img src={place.placeImageUrl} alt={place.placeName} className="w-full h-48 object-cover" />
                )}
                <div className="p-4">
                  <h4 className="font-bold text-lg">{place.placeName}</h4>
                  <p className="text-gray-600 text-sm mb-2">{place.placeDetails}</p>
                  <p className="text-sm">🕒 {place.startTime} - {place.endTime}</p>
                  <p className="text-sm">💰 {place.ticketPricing}</p>
                  <p className="text-sm">🌅 Best Time: {place.bestTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Estimated Cost */}
      {tripData.estimatedCost && (
        <div className="mt-10 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">Estimated Cost</h2>
          <p>Total: {tripData.estimatedCost.total} {tripData.estimatedCost.currency}</p>
          <ul className="text-sm mt-2">
            <li>🏨 Hotels: {tripData.estimatedCost.breakdown.hotels} {tripData.estimatedCost.currency}</li>
            <li>🎟 Tickets: {tripData.estimatedCost.breakdown.tickets} {tripData.estimatedCost.currency}</li>
            <li>🍽 Food: {tripData.estimatedCost.breakdown.food} {tripData.estimatedCost.currency}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TripResults;
