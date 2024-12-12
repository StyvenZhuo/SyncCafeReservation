import React from "react";
import CareCafe from "../assets/Care Cafe.png";
import LivinCafe from "../assets/Livin Cafe.png";
import ForestCafe from "../assets/Forest Cafe.png";
import CambaCafe from "../assets/Home-bg.png";
import { FaXmark } from "react-icons/fa6";

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
    name: "Livin' Cafe",
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

function Reservasi({ username }) {}

const ReservationRecord = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-2/3   md:max-w-2xl  lg:max-w-4xl">
        {/* Header */}
        <div className="flex justify-center items-center relative mb-4">
          <h2 className="text-xl font-bold text-center">Reservation Record</h2>
          <button
            onClick={onClose}
            className="absolute right-0 text-gray-500 hover:text-gray-700"
          >
            <FaXmark />
          </button>
        </div>

        {/* Reservation List with Scroll */}
        <div className="text-left p-4 overflow-auto max-h-[50vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex bg-gray-300 p-4 rounded-lg items-center mb-4"
            >
              {/* Image Section */}
              <div className="w-1/3 flex justify-center">
                <div className="md:w-full sm:w-24 h-24 rounded-lg overflow-hidden">
                  <img
                    src={reservation.image}
                    alt={reservation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="md:w-1/3 sm:w-40% px-4">
                <h4 className="font-bold text-lg mb-2">{reservation.name}</h4>
                <div className="grid grid-cols-2 gap-y-1 gap-x-2  justify-between text-sm text-gray-700">
                  {/* Guest Info */}
                  <div className="flex flex-col">
                    <p className="font-semibold">Guest</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold">Date / Time </p>
                  </div>

                  {/* Date/Time Info */}
                  <div className="flex flex-col">
                    <p>
                      {reservation.guest} | {reservation.pax}{" "}
                    </p>
                  </div>
                  <div className="flex-flex-col">
                    <p>
                      {reservation.date} | {reservation.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="w-1/3 text-center font-semibold md:text-lg sm:text-xs">
                <span
                  className={`${
                    reservation.status === "Confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {reservation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationRecord;
