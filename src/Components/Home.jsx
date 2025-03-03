import React from 'react';
import video from '../assets/video.mp4';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full text-center px-6">

      {/* Video Background */}
      <video 
        src={video} 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></video>

      {/* Gradient Overlay for Smooth Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 -z-5"></div>

      
      <h1 className="text-5xl font-bold leading-tight text-white max-w-4xl">
        <span className="text-blue-400">Search Your Destination With AI:</span><br />
        <span className="text-white">Personalized Itineraries at Your Fingertips</span>
      </h1>

      {/* Subtext with High Readability */}
      <p className="text-lg text-gray-200 mt-3 max-w-2xl">
        Your personal trip and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      {/* Call-to-Action Button */}
      <Link to="/create-trip">
        <button 
          type="button" 
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Get Started, It’s Free
        </button>
      </Link>

    </div>
  );
}

export default Home;
