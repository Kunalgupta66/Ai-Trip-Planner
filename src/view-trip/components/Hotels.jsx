import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  const fetchHotelImage = async (hotelName) => {
    if (hotelImages[hotelName]) return; // Avoid duplicate API calls

    const accessKey = "cVIrVo9Uso4P9TG_izfyQvU_fY-ouFw1PBW9zWbQ4Lk"; // Replace with your Unsplash API Key
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${accessKey}`);
      const data = await response.json();

      if (data.results.length > 0) {
        setHotelImages((prev) => ({ ...prev, [hotelName]: data.results[0].urls.small }));
      } else {
        setHotelImages((prev) => ({ ...prev, [hotelName]: "/hotel.jpg" })); // Fallback image
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
      setHotelImages((prev) => ({ ...prev, [hotelName]: "/hotel.jpg" }));
    }
  };

  useEffect(() => {
    if (trip?.tripData?.travelPlan?.hotels) {
      trip.tripData.travelPlan.hotels.forEach((hotel) => {
        if (hotel.hotelName) fetchHotelImage(hotel.hotelName);
      });
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
        {trip.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName)}`}
            target="_blank"
          >
            <div className="hover:scale-105 transition-all pt-2 cursor-pointer">
              <img
                src={hotelImages[hotel.hotelName] || "/hotel.jpg"}
                className="rounded-xl w-full h-40 object-cover"
                alt={hotel.hotelName}
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💰 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
