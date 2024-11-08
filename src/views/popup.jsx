import React from 'react';

const reservations = [
  {
    id: 1,
    name: "Care Cafe",
    guest: "Halsin",
    pax: 3,
    date: "13.07.24",
    time: "17:00",
    status: "Confirmed",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Livin’ Cafe",
    guest: "Halsin",
    pax: 6,
    date: "20.11.24",
    time: "14:00",
    status: "Pending",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 3,
    name: "Forest Cafe",
    guest: "Halsin",
    pax: 2,
    date: "04.08.24",
    time: "11:00",
    status: "Pending",
    image: "https://via.placeholder.com/80",
  },
  {
    id: 4,
    name: "Camba Cafe",
    guest: "Halsin",
    pax: 4,
    date: "27.10.24",
    time: "09:00",
    status: "Confirmed",
    image: "https://via.placeholder.com/80",
  },
  // Tambahkan data lebih banyak jika perlu untuk menguji scroll
];

const ReservationRecord = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Reservation Record</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{reservation.name}</h3>
                <p className="text-sm text-gray-600">Guest: {reservation.guest} | {reservation.pax} pax</p>
                <p className="text-sm text-gray-600">Date / Time: {reservation.date} | {reservation.time}</p>
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
