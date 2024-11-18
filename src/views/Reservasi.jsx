import React, { useState } from 'react';

// Import gambar dari folder assets
import HomeBg from '../assets/Home-bg.png';
import Care from '../assets/Care Cafe.png';
import Livin from '../assets/Livin Cafe.png';

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
    name: 'Another Cafe',
    address: 'Another address',
    hours: '09:00 - 20:00',
    image: Care, 
    contact: '@anothercafe | +62-8123-98765-432 | anothercafe@gmail.com',
    features: ['Pet-Friendly', 'Outdoor seating'],
  },

  {
    id: 3,
    name: 'Another Cafe',
    address: 'Another address',
    hours: '09:00 - 20:00',
    image: Livin,
    contact: '@anothercafe | +62-8123-98765-432 | anothercafe@gmail.com',
    features: ['Pet-Friendly', 'Outdoor seating'],
  },

  {
    id: 4,
    name: 'Another Cafe',
    address: 'Another address',
    hours: '09:00 - 20:00',
    image: Livin,
    contact: '@anothercafe | +62-8123-98765-432 | anothercafe@gmail.com',
    features: ['Pet-Friendly', 'Outdoor seating'],
  },
  // Tambahkan data cafe lainnya
];

function Reservasi() {
  const [name, setName] = useState('');
  const [pax, setPax] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seating, setSeating] = useState('Indoor');
  const [notes, setNotes] = useState('');

  return (
    <div className="font-poppins flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
         {/* Form Reservasi */}
         <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">Please fill the form</h2>
          <form className="space-y-4">
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
              <span className="block text-gray-600 font-normal lg:text-left">Seating options :</span>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${seating === 'Indoor' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
                  onClick={() => setSeating('Indoor')}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${seating === 'Outdoor' ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
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
