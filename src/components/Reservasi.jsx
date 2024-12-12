import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomeBg from "../assets/Home-bg.png";
import careCafe from "../assets/Care_Home.jpg";
import forestCafe from "../assets/Forest_Home.png";
import livinCafe from "../assets/Livin_Home.png";
import { UserContext } from "./AuthorizeView";
import Typewriter from "typewriter-effect";

const cafes = [
  {
    id: 1,
    name: "Camba Cafe",
    address: "City here, block there, road here, building 010A-26",
    hours: "10:00 - 22:00",
    image: HomeBg,
    contact: "@cambacafe | +62-8123-45678-900 | cambacafe@gmail.com",
    features: [
      "Free Wifi",
      "Pet-Friendly",
      "Power outlets",
      "Outdoor and Indoor seating",
    ],
  },
  {
    id: 2,
    name: "Care Cafe",
    address: "City here, block there, road here, building 21A-05",
    hours: "09:00 - 21:00",
    image: careCafe,
    contact: "@carecafe | +62-8123-45678-101 | carecafe@gmail.com",
    features: [
      "Free Wifi",
      "Cozy Seating",
      "Family-Friendly",
      "Outdoor seating",
    ],
  },
  {
    id: 3,
    name: "Livin Cafe",
    address: "City here, block there, road here, building 07E-16",
    hours: "09:00 - 23:00",
    image: livinCafe,
    contact: "@livincafe | +62-8123-98765-432 | livincafe@gmail.com",
    features: ["Pet-Friendly", "Power Outlets", "Live Music", "Indoor seating"],
  },
  {
    id: 4,
    name: "Forest Cafe",
    address: "City here, block there, road here, building 03C-12",
    hours: "09:00 - 21:00",
    image: forestCafe,
    contact: "@forestcafe | +62-8123-98765-432 | forestcafe@gmail.com",
    features: ["Pet-Friendly", "Outdoor and Indoor seating"],
  },
];

function Reservasi({ onClose, username, id }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [CafeId, setCafeId] = useState("");
  const [ReservationDate, setReservationDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [pax, setPax] = useState(1);

  const handleSubmitReservasi = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/Reservations/Reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: id,
          Username: username,
          CafeId: CafeId,
          ReservationDate: ReservationDate,
          StartTime: StartTime,
          numberOfGuests: pax,
          notes: notes,
        }),
      });

      if (response.ok) {
        setPopupMessage("Reservation Successful!");
        setIsPopupVisible(true);
        setTimeout(() => {
          onClose(true); // Fungsi ini bisa digunakan untuk kembali ke homepage
        }, 2000); // 2000 ms = 2 detik
      } else {
        setPopupMessage("Reservation Failed. Please try again.");
      }
    } catch (error) {
      setPopupMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="z-50 inset-0 min-h-screen flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm fixed">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-brown to-soft-green blur-xl opacity-80"></div>

      <div className="relative bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
            <Typewriter
              options={{
                strings: ["Please fill the form"],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          <form onSubmit={handleSubmitReservasi} className="space-y-4">
            <label className="flex-grow w-full">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <span className="block text-gray-600 font-normal">
                    Guest Id:
                  </span>
                  <input
                    type="text"
                    placeholder="Id"
                    value={id}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm disabled-input"
                    required
                  />
                </div>
                <div className="flex-1">
                  <span className="block text-gray-600 font-normal">
                    Cafe Id:
                  </span>
                  <select
                    value={CafeId}
                    onChange={(e) => setCafeId(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
                    required
                  >
                    <option value="" disabled>
                      Select CafeId
                    </option>
                    {cafes.map((cafe) => (
                      <option key={cafe.id} value={cafe.id}>
                        {cafe.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </label>

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <label className="flex-grow w-full">
                <span className="block text-gray-600 font-normal lg:text-left">
                  Guest name :
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled-input"
                  disabled
                  required
                />
              </label>
              <label>
                <span className="block text-gray-600 font-normal">Pax :</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    value={pax}
                    onClick={() => setPax((prev) => Math.max(0, prev - 1))}
                    className="text-lg font-semibold"
                  >
                    {"<"}
                  </button>
                  <span>{pax}</span>
                  <button
                    type="button"
                    value={pax}
                    onClick={() => setPax((prev) => prev + 1)}
                    className="text-lg font-semibold"
                  >
                    {">"}
                  </button>
                </div>
              </label>
                        
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <label className="flex-grow w-full">
                <span className="block text-gray-600 font-normal lg:text-left">
                  Date :
                </span>
                <input
                  type="date"
                  value={ReservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label>
                <span className="block text-gray-600 font-normal">Time :</span>
                <input
                  type="time"
                  value={StartTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
            </div>
            <label>
              <span className="block text-gray-600 font-normal mt-4">
                Additional notes :
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ex: please prepare some high chair for a child"
                className="w-full h-36 px-3 py-2 border border-gray-300 rounded-md mt-2"
              ></textarea>
            </label>

            {isPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black bg-opacity-50 fixed inset-0"></div>
                <div
                  className="bg-white rounded-lg shadow-lg px-6 py-4 text-center animate-popup"
                  style={{ minWidth: "300px" }}
                >
                  <p className="text-lg font-semibold">{popupMessage}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              Reserve
            </button>
          </form>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Pick a Cafe
          </h2>
          <div className="overflow-x-auto flex space-x-4 py-4">
            {cafes.map((cafe) => (
              <div
                key={cafe.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden min-w-[250px] max-w-[300px] flex-shrink-0"
              >
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{cafe.name}</h3>
                  <p className="text-gray-600">{cafe.address}</p>
                  <p className="text-gray-600 mt-2">Opening Hour</p>
                  <p className="text-gray-800 font-bold">{cafe.hours}</p>
                  <div className="mt-4 text-sm">
                    <p>{cafe.contact}</p>
                    {cafe.features.map((feature, index) => (
                      <p key={index}>• {feature}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservasi;
