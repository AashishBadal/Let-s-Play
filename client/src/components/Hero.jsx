import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 opacity-90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Let's Play
            </span>
            <span className="block text-gray-300 mt-4">Browse. Join. Conquer.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300">
            Join thousands of players in epic tournaments. Show your skills and win amazing prizes.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate('/tournaments')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Join Tournaments
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Sign Up Now
                </button>
                <button
                  onClick={() => navigate('/tournaments')}
                  className="px-8 py-3 border border-indigo-400 text-base font-medium rounded-md text-indigo-100 bg-transparent hover:bg-indigo-900/50 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Browse Tournaments
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;