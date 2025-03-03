import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
  const [placeImages, setPlaceImages] = useState({});

  const fetchImage = async (placeName) => {
    if (placeImages[placeName]) return; 

    const accessKey = "cVIrVo9Uso4P9TG_izfyQvU_fY-ouFw1PBW9zWbQ4Lk"; 
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${placeName}&client_id=${accessKey}`);
    const data = await response.json();
    
    if (data.results.length > 0) {
      setPlaceImages(prev => ({ ...prev, [placeName]: data.results[0].urls.small }));
    } else {
      setPlaceImages(prev => ({ ...prev, [placeName]: "/days.jpg" })); 
    }
  };

  useEffect(() => {
    if (trip?.tripData?.travelPlan?.itinerary) {
      Object.values(trip.tripData.travelPlan.itinerary).forEach(dayData => {
        Object.values(dayData).forEach(plan => {
          if (plan.placeName) fetchImage(plan.placeName);
        });
      });
    }
  }, [trip]);

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl mb-4 text-center">Places to Visit</h2>

      {Object.entries(trip.tripData?.travelPlan?.itinerary || {}).map(([dayKey, dayData], index) => (
        <div key={index} className="mb-6">
          <h3 className="font-bold text-lg capitalize pt-2 pb-2">{dayKey}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(dayData).map(([timeOfDayKey, plan], planIndex) =>
              plan.placeName && (
                <div key={planIndex} className="border rounded-lg shadow-md overflow-hidden hover:scale-105 transition-all cursor-pointer">
                  <img src={placeImages[plan.placeName] || '/default.jpg'} alt={plan.placeName} className="w-full h-40 object-cover" />

                  <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plan.placeName)}`} target="_blank">
                    <div className="p-5">
                      <h4 className="font-bold text-lg text-gray-800">{plan.placeName}</h4>
                      {plan.time && <p className="text-sm text-gray-500 mb-1">⏰ <strong>{plan.time}</strong> | {timeOfDayKey}</p>}
                      {plan.placeDetails && <p className="text-gray-600 mb-2">{plan.placeDetails}</p>}
                      {plan.ticketPrice && <p className="text-sm text-gray-700">🎟️ Ticket: {plan.ticketPrice}</p>}
                      {plan.travelTime && <p className="text-sm text-gray-700">🗺️ Travel: {plan.travelTime}</p>}
                      {plan.bestTimeToVisit && <p className="text-sm text-gray-700">🌤️ Best Time: {plan.bestTimeToVisit}</p>}
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
