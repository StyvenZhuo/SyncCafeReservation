import React, { useEffect, useState } from "react";
import homeBg from "../assets/Home-bg.png";
import pfp from "../assets/PFP.png";
import history from "../assets/button-history.png";
import careCafe from "../assets/Care_Home.jpg";
import forestCafe from "../assets/Forest_Home.png";
import livinCafe from "../assets/Livin_Home.png";
import ReservationRecord from "./popup";
import Reservasi from "../components/Reservasi";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Username, setUsername] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Id, setId] = useState();
  const [Email, setEmail] = useState();
  const [PasswordHash, setPasswordHash] = useState();
  const [user, setUser] = useState(null);
  const [RememberMe, setRememberMe] = useState();
  const navigate = useNavigate();

  const reservations = [
    {
      name: "Camba Cafe",
      location: "City here, block there, road here, building 010A-26",
      datetime: {
        Date: "2024-12-24",
        Time: "10:00 - 22:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Available",
      imageSrc: homeBg,
    },
    {
      name: "Care Cafe",
      location: "City here, block there, road here, building 21A-05",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Available",
      imageSrc: careCafe,
    },
    {
      name: "Livin' Cafe",
      location: "City here, block there, road here, building 07E-16",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Available",
      imageSrc: livinCafe,
    },
    {
      name: "Forest Cafe",
      location: "City here, block there, road here, building 03C-12",
      datetime: {
        Date: "2023-12-31",
        Time: "17:00",
      },
      guestInfo: {
        reserver: "Halsin",
        pax: 3,
      },
      status: "Not Available",
      imageSrc: forestCafe,
    },
  ];

  function handleFetchWithRetry() {
    let retryCount = 0;
    const maxRetries = 3;
    const delay = 1000;

    function wait(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function fetchWithRetry(url, options) {
      try {
        const response = await fetch(url, options);

        if (response.status === 200) {
          console.log("Authorized");
          const j = await response.json();
          setUser({ email: j.email, username: j.username, id: j.id });
          setIsLoggedIn(true);
          return response;
        } else if (response.Result === false) {
          console.log("Unauthorized");
          return response;
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        } else {
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }

    fetchWithRetry("/api/Login/test", {
      method: "GET",
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
        // Recalling the function after completion
        handleFetchWithRetry();
      });
  }

  useEffect(() => {
    handleFetchWithRetry();
  }, []);

  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleShowReservationModal = () => {
    setShowReservationModal(true);
  };

  const handleCloseReservationModal = () => {
    setShowReservationModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    fetch("/api/Login/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    })
      .then((data) => {
        if (data.ok) {
          setIsLoggedIn(false);
          setUser(null);
          navigate("/");
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setUsername("Guest");
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
    setIsSignUp(false); // Reset sign-up form when opening the login popup
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // post data to the /register api
    fetch("/api/Login/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: Username,
        PasswordHash: PasswordHash,
        RememberMe: RememberMe,
      }),
    })
      .then((data) => {
        console.log(data);
        if (data.ok)
          setIsLoggedIn(true), toggleLoginPopup(), handleFetchWithRetry();
      })
      .catch((error) => {
        // handle network error
        console.error(error);
      });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // post data to the /register api
    fetch("/api/Register/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: Id,
        Username: Username,
        Email: Email,
        PasswordHash: PasswordHash,
      }),
    })
      .then((data) => {
        console.log(data);
        if (data.ok) setIsLoggedIn(true), toggleLoginPopup();
      })
      .catch((error) => {
        // handle network error
        console.error(error);
      });
  };

  return (
    <div className="relative font-xl min-h-screen flex justify-center bg-gray-800 ">
      {/* Background Image */}
      <img
        src={homeBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover bg-cover bg-fade-in"
        style={{ filter: "brightness(0.45)" }}
      />
      {/* Overlay Container */}
      <div className="relative flex flex-col md:flex-row w-full md:p-8">
        {/* Left Side (User Info and Welcome Section) */}
        <div className="flex-initial bg-opacity-90 p-6 rounded-lg shadow-ld w-full md:w-1/2 user-info">
          <div className="flex flex-row items-center">
            <div className="bg-white flex flex-col lg:flex-row items-center p-4 rounded-lg shadow-md mr-5">
              <div className="flex items-center mb-4 lg:mb-0 lg:mr-5">
                <img
                  src={pfp}
                  alt="pfp"
                  className="w-12 h-12 lg:w-15 lg:h-15 mr-3"
                />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-semibold ">
                    Welcome,
                  </p>
                  <h1 className="text-2xl lg:text-3xl font-light">
                    {user?.username}
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
            <a onClick={handleShowReservationModal} className="block group">
              <img
                src={history}
                alt="History"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto group-hover:brightness-50 transition duration-200"
              />
            </a>
            {/* Modal Reservasi History*/}
            {showReservationModal && (
              <ReservationRecord onClose={handleCloseReservationModal} />
            )}
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
                <Typewriter
                  options={{
                    strings: ["Ready To Book ?"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </p>
            </div>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  window.location.href = "./reservasi";
                } else {
                  setShowModal(true);
                }
              }}
              className="text-2xl sm:text-3xl md:text-4xl font-light mt-4 px-6 py-3 bg-white rounded-full hover:bg-[#343434] reserve-btn transition duration-200"
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

          <div className="overflow-auto pr-3 max-h-[573px] space-y-4 smooth-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
            {isLoggedIn ? (
              reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reservation, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg shadow-lg overflow-hidden card-animate"
                    >
                      <img
                        src={reservation.imageSrc}
                        alt={reservation.name}
                        className="w-full h-52 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-2xl font-light text-gray-800">
                          {reservation.name}
                        </h4>
                        <p className="text-s font-medium text-gray-600 mb-4">
                          {reservation.location}
                        </p>
                        {/* Card Content */}
                        <div className="bg-[#E8E8E8] mx-auto px-4 py-6 rounded-lg shadow-md">
                          <div className="flex justify-between mb-2">
                            <p className="text-[#343434] font-semibold">
                              Date/Time :
                            </p>
                            <p className="opacity-50 font-medium">
                              {reservation.datetime.Date} &nbsp; | &nbsp;{" "}
                              {reservation.datetime.Time}
                            </p>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="text-[#343434] font-semibold">
                              Guest Info :
                            </p>
                            <p className="opacity-50 font-medium">
                              {reservation.guestInfo.reserver} &nbsp; | &nbsp;{" "}
                              {reservation.guestInfo.pax} Pax
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-[#343434] font-semibold">
                              Status :
                            </p>
                            <p
                              className={`${
                                reservation.status === "Available"
                                  ? "text-green-600"
                                  : reservation.status === "Pending"
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              } font-medium`}
                            >
                              {reservation.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <p className="text-gray-800">
                    You haven't made any reservations.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <p className="text-gray-800 font-bold animate-shake">
                  Please log in to view your reservation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Login/Sign-Up Popup */} {/* Registrasi */}
      {showLoginPopup && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 modal-fade-in"
          onClick={(e) => {
            // Close the modal only if the user clicks outside the modal content
            if (e.target === e.currentTarget) {
              setShowLoginPopup(false);
            }
          }}
        >
          <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 md:w-[500px]">
            <h2 className="text-2xl font-semibold mb-4">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>
            {isSignUp ? (
              <div>
                <h6 className="ml-3  text-left font-bold">Username</h6>
                <input
                  id="Username" // Added id for name input
                  name="Username"
                  type="text"
                  required
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 pl-4 mb-3 bg-gray-200 rounded-full"
                />
                <h6 className="ml-3  text-left font-bold">Email</h6>
                <input
                  id="Email"
                  name="Email"
                  type="text"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 pl-4 mb-3 bg-gray-200 rounded-full"
                />
                <h6 className="ml-3  text-left font-bold">Password</h6>
                <input
                  id="PasswordHash"
                  name="PasswordHash"
                  type="password"
                  required
                  value={PasswordHash}
                  onChange={(e) => setPasswordHash(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 pl-4 mb-3 bg-gray-200 rounded-full"
                />
                <button
                  onClick={handleSubmitRegister}
                  className="w-full p-2 mt-3 bg-gray-600 text-white rounded-full"
                >
                  Sign Up
                </button>
                <div className="mt-4 text-center">
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={toggleSignUp}
                      className="text-gray-600 cursor-pointer"
                    >
                      Log In
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              /* Login */
              <div>
                <h6 className="ml-3  text-left font-bold">Username</h6>
                <input
                  id="Username" // Added id for name input
                  name="Username"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 pl-4 mb-3 bg-gray-200 rounded-full"
                />
                <h6 className="ml-3  text-left font-bold">Password</h6>
                <input
                  id="PasswordHash"
                  name="PasswordHash"
                  type="password"
                  required
                  onChange={(e) => setPasswordHash(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 pl-4 mb-3 bg-gray-200 rounded-full"
                />
                <div className="flex">
                  <input
                    type="checkbox"
                    id="checkbox"
                    required
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="ml-2"
                  />
                  <p className="p-2 text-sm">Remember Me</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full p-2 mt-3 bg-gray-600 text-white rounded-full"
                >
                  Log In
                </button>
                <div className="mt-4 text-center">
                  <p>
                    Don't have an account?{" "}
                    <span
                      onClick={toggleSignUp}
                      className="text-gray-600 cursor-pointer"
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {showModal && (
        <Reservasi
          onClose={handleCloseModal}
          username={user?.username}
          id={user.id}
        />
      )}
    </div>
  );
}

export default Home;
