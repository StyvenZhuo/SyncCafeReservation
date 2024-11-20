import React from 'react';
import CareCafe from '../assets/Care Cafe.png';
import LivinCafe from '../assets/Livin Cafe.png';
import ForestCafe from '../assets/Forest Cafe.png';
import CambaCafe from '../assets/Home-bg.png';

const reservations = [
  {
    id: 1,
    name: "Care Cafe",
    guest: "Halsin",
    pax: 3,
    date: "13.07.24",
    time: "17:00",
    status: "Confirmed",
    image: CareCafe,
  },
  {
    id: 2,
    name: "Livin’ Cafe",
    guest: "Halsin",
    pax: 6,
    date: "20.11.24",
    time: "14:00",
    status: "Pending",
    image: LivinCafe,
  },
  {
    id: 3,
    name: "Forest Cafe",
    guest: "Halsin",
    pax: 2,
    date: "04.08.24",
    time: "11:00",
    status: "Pending",
    image: ForestCafe,
  },
  {
    id: 4,
    name: "Camba Cafe",
    guest: "Halsin",
    pax: 4,
    date: "27.10.24",
    time: "09:00",
    status: "Confirmed",
    image: CambaCafe,
  },
  
];

const ReservationRecord = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-center items-center relative mb-4">
          <h2 className="text-xl font-bold text-center">Reservation Record</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>


        {/* Reservation List with Scroll */}
        <div className="space-y-4 overflow-y-scroll max-h-[60vh]">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center bg-gray-100 p-4 rounded-lg">
              <img
                src={reservation.image}
                alt={reservation.name}
                className="w-60 h-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg text-left font-bold">{reservation.name}</h3>
                <p className="text-sm text-left text-gray-600 font-bold">Guest <span className="ml-20">Date / Time</span></p>
                <p className="text-sm text-left text-gray-600">{reservation.guest} | {reservation.pax} pax <span className="ml-10">{reservation.date} | {reservation.time}</span></p>
                
              </div>
              <span
                className={`font-semibold ${
                  reservation.status === "Confirmed" ? "text-green-500" : "text-red-500"
                }`}
              >
                {reservation.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationRecord;
