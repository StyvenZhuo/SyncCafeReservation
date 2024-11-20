import React, { useState } from "react";
import homeBg from "../assets/Home-bg.png";
import pfp from "../assets/PFP.png";
import history from "../assets/button-history.png";
import careCafe from "../assets/Care_Home.jpg";
import forestCafe from "../assets/Forest_Home.png";
import livinCafe from "../assets/Livin_Home.png";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const reservations = [
    {
      name: "Care Cafe",
      location: "City here, block there, road here, building there",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Confirmed",
      imageSrc: careCafe,
    },
    {
      name: "Livin' Cafe",
      location: "City here, block there, road here, building there",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Pending",
      imageSrc: livinCafe,
    },
    {
      name: "Forest Cafe",
      location: "City here, block there, road here, building there",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Cancelled",
      imageSrc: forestCafe,
    },
  ];

  const handleLogin = () => {
    const userNameInput = document.getElementById("userNameInput").value; // Get the input value for username
    setUserName(userNameInput);  // Update the username state with the input value
    setIsLoggedIn(true);
    setShowLoginPopup(false);  // Close the popup on successful login
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
      <img
        src={homeBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover bg-cover"
        style={{ filter: "brightness(0.45)" }}
      />

      {/* Overlay Container */}
      <div className="relative flex flex-col md:flex-row w-full md:p-8">
        {/* Left Side (User Info and Welcome Section) */}
        <div className="flex-initial bg-opacity-90 p-6 rounded-lg shadow-ld w-full md:w-1/2">
          <div className="flex flex-row items-center">--
            <div className="bg-white flex flex-col lg:flex-row items-center p-4 rounded-lg shadow-md mr-5">
              <div className="flex items-center mb-4 lg:mb-0 lg:mr-5">
                <img
                  src={pfp}
                  alt="pfp"
                  className="w-12 h-12 lg:w-15 lg:h-15 mr-3"
                />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-semibold text-[#343434]">
                    Welcome,
                  </p>
                  <h1 className="text-2xl lg:text-3xl font-light">
                    {isLoggedIn ? userName : "Guest"}
                  </h1>
                </div>
              </div>
              <button
                onClick={isLoggedIn ? handleLogout : toggleLoginPopup}
                className="text-xs px-3 py-1 bg-[#1E1E1E] text-white rounded-full hover:bg-[#343434] transition duration-200"
              >
                {isLoggedIn ? "Log Out" : "Log In"}
              </button>
            </div>
            <a href="./popup" className="block group">
              <img
                src={history}
                alt="History"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto group-hover:brightness-50 transition duration-200"
              />
            </a>
          </div>

          {/* Reserve Section */}
          <div className="flex flex-col items-start mt-16 sm:mt-24 md:mt-40 lg:mt-80 text-left">
            <div
              className="flex flex-row text-7xl text-white mb-4"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
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
        <div className="ml-auto max-w-[500px] flex-initial p-6 rounded-lg shadow-lg overflow-auto sm:h-auto md:h-auto md:w-1/2 mt-8 sm:mt-4 md:mt-0 justify-between">
          <h3
            className="text-white text-2xl font-medium mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
          >
            Recent &nbsp; Reservations
          </h3>

          <div className="overflow-auto max-h-[573px] space-y-4">
          {isLoggedIn ? (reservations.length > 0 ? (
          <div className="space-y-4">
          {reservations.map((reservation, i) => (
            <div key={i}
            className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={reservation.imageSrc}
                alt={reservation.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h4 className="text-2xl font-light text-gray-800">{reservation.name}</h4>
                <p className="text-s font-medium text-gray-600 mb-4">{reservation.location}</p>
                {/* Card Content */}
                <div className="bg-[#E8E8E8] mx-auto px-4 py-6 rounded-lg shadow-md">
                  <div className="flex justify-between mb-2">
                    <p className="text-[#343434] font-semibold">Date/Time :</p>
                    <p className="opacity-50 font-medium">{reservation.datetime.Date} &nbsp; | &nbsp;  {reservation.datetime.Time}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-[#343434] font-semibold">Guest Info :</p> 
                    <p className="opacity-50 font-medium">{reservation.guestInfo.reserver} &nbsp; | &nbsp; {reservation.guestInfo.pax} Pax</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#343434] font-semibold">Status :</p>
                    <p className={`${
                      reservation.status === "Confirmed"
                        ? "text-green-600"
                        : reservation.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-medium`}>{reservation.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <p className="text-gray-800">You haven’t made any reservations.</p>
        </div>
      )
    ) : (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-gray-800">Please log in to view your reservation.</p>
      </div>
    )}
  </div>
        </div>
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Log In</h2>
            <input
              id="userNameInput" // Added id for name input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
            >
              Log In
            </button>
            <button
              onClick={toggleLoginPopup}
              className="w-full text-center mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
