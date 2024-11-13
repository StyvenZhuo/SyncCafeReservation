import React, { useState } from 'react';
import homeBg from '../assets/Home-bg.png';
import pfp from '../assets/PFP.png';
import history from '../assets/button-history.png';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName("YourUsername"); // Placeholder for actual username from login
    setShowLoginPopup(false); // Close the popup on successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest");
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div className="relative font-xl min-h-screen flex justify-center bg-gray-800">
      {/* Background Image */}
      <img src={homeBg} alt="Background" className="absolute inset-0 w-full h-full object-cover bg-cover" style={{ filter: 'brightness(0.45)' }}/>

      {/* Overlay Container */}
      <div className="relative z-10 flex flex-col md:flex-row w-full p-4 md:p-8">
        
        {/* Left Side (User Info and Welcome Section) */}
        <div className="flex-initial bg-opacity-90 p-6 rounded-lg shadow-ld ">
          <div className="flex flex-row">
            <div className="bg-white flex flex-col lg:flex-row lg:max-w-[60%] items-center p-4 rounded-lg shadow-md mr-5 lg:mb-64">
              <div className="flex items-center mb-4 lg:mb-0 lg:mr-5">
                <img src={pfp} alt="pfp" className="w-12 h-12 lg:w-15 lg:h-15 mr-3" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-semibold text-[#343434]">Welcome,</p>
                  <h1 className="text-2xl lg:text-3xl font-light">
                    {isLoggedIn ? userName : "Guest"}
                  </h1>
                </div>
              </div>
              <button
                onClick={isLoggedIn ? handleLogout : toggleLoginPopup}
                className="text-xs px-3 py-1 bg-[#1E1E1E] text-white rounded-full hover:bg-[#343434] transition duration-200 lg:ml-10"
              >
                {isLoggedIn ? "Log Out" : "Log In"}
              </button>
            </div>
            <a style={{ filter: 'brightness(10)' }} href="./popup"><img src={history} alt="History" className='w-12 h-12 lg:w-24 lg:h-24 mr-3 hover:bg-black transition duration-200' />
            </a>
          </div>

          
          {/* Reserve Section */}
          <div className="flex flex-col items-start mt-8 text-left">
            <div className="flex flex-row text-7xl text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
              <p className="mr-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="font-light">Ready to </span>
                <span className="italic font-medium">book?</span>
              </p>

            </div>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLoginPopup(true);
                } else {
                  window.location.href = "./reservasi";
                }
              }}
              className="text-2xl sm:text-3xl md:text-4xl font-light mt-4 px-6 py-3 bg-white rounded-full hover:bg-[#343434] transition duration-200"
            >
              Reserve Now
            </button>
          </div>
        </div>

        {/* Right Side (Recent Reservations) */}
        <div className="flex-initial p-6 rounded-lg shadow-lg overflow-auto h-80 md:h-auto md:w-1/2 mt-8 md:mt-0">
          <h3 className="font-white text-xl font-semibold mb-4">Recent Reservations</h3>
          {isLoggedIn ? (
            <div className="space-y-4">
              {/* Placeholder reservation cards */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-gray-300 rounded-md">
                    {/* Replace src with actual image source */}
                    <img src="#" alt="Cafe" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Cafe Name</h4>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-sm text-gray-600">Date/Time: 2023-12-31 18:00</p>
                    <p className="text-sm text-gray-600">Status: Confirmed</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You haven’t made any reservations.</p>
          )}
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Log In</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLoginPopup(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
