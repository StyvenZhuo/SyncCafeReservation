import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

// Import gambar dari folder assets
import HomeBg from '../assets/Home-bg.png';
import careCafe from "../assets/Care_Home.jpg";
import forestCafe from "../assets/Forest_Home.png";
import livinCafe from "../assets/Livin_Home.png";

// Data cafe
const cafes = [
  {
    id: 1,
    name: 'Camba Cafe',
    address: 'City here, block there, road here, building 010A-26',
    hours: '10:00 - 22:00',
    image: HomeBg,
    contact: '@cambacafe | +62-8123-45678-900 | cambacafe@gmail.com',
    features: ['Free Wifi', 'Pet-Friendly', 'Power outlets', 'Outdoor seating'],
  },
  {
    id: 2,
    name: 'Care Cafe',
    address: 'City here, block there, road here, building 21A-05',
    hours: '09:00 - 21:00',
    image: careCafe,
    contact: '@carecafe | +62-8123-45678-101 | carecafe@gmail.com',
    features: ['Free Wifi', 'Cozy Seating', 'Family-Friendly', 'Outdoor seating'],
  },
  {
    id: 3,
    name: 'Livin Cafe',
    address: 'City here, block there, road here, building 07E-16',
    hours: '09:00 - 23:00',
    image: livinCafe,
    contact: '@livincafe | +62-8123-98765-432 | livincafe@gmail.com',
    features: ['Pet-Friendly', 'Power Outlets', 'Live Music', 'Indoor seating'],
  },
  {
    id: 4,
    name: 'Forest Cafe',
    address: 'City here, block there, road here, building 03C-12',
    hours: '09:00 - 21:00',
    image: forestCafe,
    contact: '@forestcafe | +62-8123-98765-432 | forestcafe@gmail.com',
    features: ['Pet-Friendly', 'Outdoor seating'],
  },
];

function Reservasi() {
  const [name, setName] = useState('');
  const [pax, setPax] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seating, setSeating] = useState('Indoor');
  const [notes, setNotes] = useState('');

  const navigate = useNavigate(); // Inisialisasi navigate untuk navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservasiData = {
      name,
      pax,
      date,
      time,
      seating,
      notes,
    };

    console.log('Data Reservasi:', reservasiData);
    alert('Reservasi berhasil disimpan!');
    navigate('/'); // Navigasi kembali ke halaman utama setelah submit
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-soft-brown to-soft-green relative">
    {/* Background Blur */}
    <div className="absolute inset-0 bg-gradient-to-br from-soft-brown to-soft-green blur-xl opacity-80"></div>

    {/* Card Reservasi */}
    <div className="relative bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Form Reservasi */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">Please fill the form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <label className="flex-grow w-full">
                <span className="block text-gray-600 font-normal lg:text-left">Guest name :</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label className="flex flex-col items-center w-full lg:w-auto">
                <span className="block text-gray-600 font-normal">Pax :</span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setPax((prev) => Math.max(0, prev - 1))}
                    className="text-lg font-semibold"
                  >
                    {'<'}
                  </button>
                  <span>{pax}</span>
                  <button
                    type="button"
                    onClick={() => setPax((prev) => prev + 1)}
                    className="text-lg font-semibold"
                  >
                    {'>'}
                  </button>
                </div>
              </label>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <label className="flex-grow w-full">
                <span className="block text-gray-600 font-normal lg:text-left">Date :</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label className="flex-grow w-full">
                <span className="block text-gray-600 font-normal lg:text-left">Time :</span>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
            </div>

            <div>
              <span className="block text-gray-600 font-normal lg:text-left mb-2">Seating options :</span>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    seating === 'Indoor' ? 'bg-gray-800 text-white' : 'bg-gray-300'
                  }`}
                  onClick={() => setSeating('Indoor')}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    seating === 'Outdoor' ? 'bg-gray-800 text-white' : 'bg-gray-300'
                  }`}
                  onClick={() => setSeating('Outdoor')}
                >
                  Outdoor
                </button>
              </div>
            </div>

            <div>
              <span className="block text-gray-600 font-normal lg:text-left ">Additional notes :</span>
              <textarea
                placeholder="ex : please prepare some high chair for a child"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              Reserve
            </button>
          </form>

          {/* Tombol Back */}
          <button
            onClick={() => navigate('/')}
            className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Pilihan Cafe (Scrollable Horizontal) */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-center">Pick a Cafe</h2>
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
                  <p className="text-gray-600 font-normal">{cafe.address}</p>
                  <p className="text-gray-600 mt-2 font-normal">Opening Hour</p>
                  <p className="text-gray-800 font-bold">{cafe.hours}</p>
                  <div className="mt-4 space-y-1 text-sm font-normal">
                    <p>{cafe.contact}</p>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-gray-600 font-normal">
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
