import React, { useState } from 'react';

function Reservasi() {
  const [name, setName] = useState('');
  const [pax, setPax] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seating, setSeating] = useState('Indoor');
  const [notes, setNotes] = useState('');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Reservasi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">Please fill the form</h2>
          <form className="space-y-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <label className="flex-grow w-full">
                <span className="block text-gray-600">Guest name :</span>
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
                <span className="block text-gray-600">Pax :</span>
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
                <span className="block text-gray-600">Date :</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label className="flex-grow w-full">
                <span className="block text-gray-600">Time :</span>
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
              <span className="block text-gray-600">Seating options :</span>
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
              <span className="block text-gray-600">Additional notes :</span>
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

        {/* Detail Cafe */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pick a Cafe</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="path_to_your_image.jpg"
              alt="Cafe"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">Camba Cafe</h3>
              <p className="text-gray-600">City here, block there, road here, building 010A-26</p>
              <p className="text-gray-600 mt-2">Opening Hour</p>
              <p className="text-gray-800 font-bold">10:00 - 22:00</p>

              <div className="mt-4 space-y-1">
                <p>@cambacafe</p>
                <p>+62-8123-45678-900</p>
                <p>cambacafe@gmail.com</p>
              </div>

              <div className="mt-4">
                <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-colors">
                  Menu
                </button>
              </div>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>• Free Wifi</p>
                <p>• Pet-Friendly</p>
                <p>• Power outlets</p>
                <p>• Outdoor seating</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reservasi;
